import './public/css/index.css';
import { routes } from './AppRoutes';
import { globalMiddleware } from './src/js/utils/middlewares/middlewares';

const DEFAULT_ROUTE = 'index';
const app = document.getElementById('app');

const loadedScriptSrcs = new Set();

function bindActions(handlers = {}) {
  const elements = app.querySelectorAll('[data-action]');
  elements.forEach((el) => {
    const { action, eventType = null } = el.dataset;
    const fn = handlers[action];
    if (typeof fn !== 'function') return;

    el.addEventListener(eventType != null ? eventType : 'click', (event) => {
      event.preventDefault();
      fn({ event, element: el, dataset: { ...el.dataset } });
    });
  });
}

function matchRoute(path) {
  const tryMatch = (tryPath) => {
    for (const route of routes) {
      // Static exact match
      if (typeof route.path === 'string' && route.path === tryPath) {
        return { route, match: null, params: {} };
      }

      // Dynamic pattern match: /user/:id
      if (typeof route.path === 'string' && route.path.includes(':')) {
        const paramNames = [];
        const regexStr = route.path
          .split('/')
          .map((part) => {
            if (part.startsWith(':')) {
              paramNames.push(part.slice(1));
              return '([^/]+)';
            }
            return part;
          })
          .join('/');
        const regex = new RegExp(`^${regexStr}$`);
        const match = tryPath.match(regex);
        if (match) {
          const params = Object.fromEntries(
            paramNames.map((key, i) => [key, match[i + 1]]),
          );
          return { route, match, params };
        }
      }

      // RegExp route
      if (route.path instanceof RegExp) {
        const match = tryPath.match(route.path);
        if (match) return { route, match, params: {} };
      }
    }

    return null;
  };

  // Try the direct path first
  let result = tryMatch(path);
  if (result) return result;

  // Handle fallback to index/home if ends with slash
  if (path.endsWith('/')) {
    const fallbackPaths = [`${path}index`, `${path}home`];
    for (const fallbackPath of fallbackPaths) {
      result = tryMatch(fallbackPath);
      if (result) return result;
    }
  }

  // Fallback route `*`
  const fallback = routes.find((r) => r.path === '*');
  if (fallback) return { route: fallback, match: null, params: {} };

  return null;
}

function getRouteAndParams() {
  // eslint-disable-next-line no-restricted-globals
  const hash = decodeURIComponent(location.hash.slice(1));
  const [path = 'index', qs = ''] = hash.split('?');
  const params = Object.fromEntries(new URLSearchParams(qs));
  return { path, params };
}

const runScriptModule = async (scriptPath, params) => {
  const module = await import(`./${scriptPath}?t=${Date.now()}`);
  if (typeof module.init === 'function') {
    const actions = module.init(params);
    if (typeof actions === 'object') bindActions(actions);
  }
};

function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'flex';
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}

async function loadPage(route, params = {}, match = null) {
  showLoader();
  if (!(await globalMiddleware(route, params))) {
    app.innerHTML = `<p>Blocked by global middleware.</p>`;
    return;
  }

  if (route.middleware && !(await route.middleware(match, params))) {
    app.innerHTML = `<p>Blocked by route middleware.</p>`;
    return;
  }

  try {
    // app.classList.remove('fade-in');
    const res = await fetch(route.view);
    console.log(route.view, '>>>');
    const htmlText = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const content = doc.body;

    console.log(content);

    app.innerHTML = '';
    for (const child of content.children) {
      app.appendChild(child.cloneNode(true));
    }

    const scripts = content.querySelectorAll('script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');

      if (script.src) {
        if (loadedScriptSrcs.has(script.src)) {
          return;
        }
        newScript.src = script.src;
        loadedScriptSrcs.add(script.src);
      } else {
        newScript.textContent = script.textContent;
      }

      if (script.type) {
        newScript.type = script.type;
      }

      document.body.appendChild(newScript);
    });

    if (route.scripts) {
      for (const scriptPath of route.scripts) {
        await runScriptModule(scriptPath, params);
      }
    } else if (route.script) {
      await runScriptModule(route.script, params);
    }

    // Add transition
    // requestAnimationFrame(() => app.classList.add('fade-in'));
    // app.classList.remove('fade-in');
    hideLoader();
  } catch (err) {
    console.error(err);
    app.innerHTML = `<h2>Error loading ${route.view}</h2>`;
  }
}

function handleHashChange() {
  const { path, params: queryParams } = getRouteAndParams();

  console.log(path, queryParams, '<<<');

  if (!path || path.trim() === '') {
    location.hash = `#${DEFAULT_ROUTE}`;
    return;
  }

  const matched = matchRoute(path);

  console.log(matched, '<<<>>>');

  if (matched) {
    const { route, match, params: pathParams } = matched;
    const combinedParams = { ...queryParams, ...pathParams };
    loadPage(route, combinedParams, match);
  } else {
    app.innerHTML = `<h2 class="contianer mx-auto">404 - Not Found</h2>`;
  }
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);
