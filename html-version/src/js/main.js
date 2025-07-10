import '../css/index.css';
import { routes } from './routes';
import { globalMiddleware } from './middlewares';

const app = document.getElementById('app');

const loadedScriptSrcs = new Set();

function bindActions(handlers = {}) {
  const elements = app.querySelectorAll('[data-action]');
  elements.forEach((el) => {
    const { action } = el.dataset;
    const fn = handlers[action];
    if (typeof fn !== 'function') return;

    el.addEventListener('click', (event) => {
      fn({ event, element: el, dataset: { ...el.dataset } });
    });
  });
}

function matchRoute(path) {
  for (const route of routes) {
    // 🔹 Exact static match
    if (typeof route.path === 'string' && !route.path.includes(':')) {
      if (route.path === path) return { route, match: null, params: {} };
    }

    // 🔹 Dynamic string match like 'user/:id'
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
      const match = path.match(regex);

      if (match) {
        const params = Object.fromEntries(
          paramNames.map((key, i) => [key, match[i + 1]]),
        );
        return { route, match, params };
      }
    }

    // 🔹 RegExp fallback
    if (route.path instanceof RegExp) {
      const match = path.match(route.path);
      if (match) {
        return { route, match, params: {} };
      }
    }
  }

  // Final fallback: wildcard "*"
  const fallback = routes.find((r) => r.path === '*');
  if (fallback) return { route: fallback, match: null, params: {} };

  return null;
}

function getRouteAndParams() {
  // eslint-disable-next-line no-restricted-globals
  const hash = decodeURIComponent(location.hash.slice(1));
  const [path = 'home', qs = ''] = hash.split('?');
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

async function loadPage(route, params = {}, match = null) {
  if (!(await globalMiddleware(route, params))) {
    app.innerHTML = `<p>Blocked by global middleware.</p>`;
    return;
  }

  if (route.middleware && !(await route.middleware(match, params))) {
    app.innerHTML = `<p>Blocked by route middleware.</p>`;
    return;
  }

  try {
    app.classList.remove('fade-in');
    const res = await fetch(route.view);
    const htmlText = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const content = doc.body;

    app.innerHTML = '';
    for (const child of content.children) {
      app.appendChild(child.cloneNode(true));
    }

    const scripts = content.querySelectorAll('script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');

      if (script.src) {
        if (loadedScriptSrcs.has(script.src)) {
          console.log('');
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
    requestAnimationFrame(() => app.classList.add('fade-in'));
  } catch (err) {
    console.error(err);
    app.innerHTML = `<h2>Error loading ${route.view}</h2>`;
  }
}

function handleHashChange() {
  const { path, params: queryParams } = getRouteAndParams();
  const matched = matchRoute(path);

  if (matched) {
    const { route, match, params: pathParams } = matched;
    const combinedParams = { ...queryParams, ...pathParams };
    loadPage(route, combinedParams, match);
  } else {
    app.innerHTML = `<h2>404 - Not Found</h2>`;
  }
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);
