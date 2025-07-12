import {
  getCurrentUser,
  login,
  setCurrentUser,
  enrollCourse,
  hasEnrolled,
} from './Auth';

import {
  seedMockDatabase,
  pickRandomSubset,
  getMockDatabaseCourses,
} from './utils/init';

const currentCourse = localStorage.getItem('selected_course')
  ? JSON.parse(localStorage.getItem('selected_course'))
  : pickRandomSubset(getMockDatabaseCourses(), 450)[0]; // You can replace with real data
if (!currentCourse) {
  alert('cant find course');
  window.location.href = './#courses';
}
const isEnrolled = localStorage.getItem('is_enrolled') === 'true';

const modules = currentCourse?.curriculum;

const course = JSON.parse(localStorage.getItem('selected_course'));
const enrollBtn = document.getElementById('enrollBtn');
const enrollBtn2 = document.getElementById('enrollBtn2');

function markWatched(sectionIndex, childIndex) {
  const key = `watched_${sectionIndex}_${childIndex}`;
  localStorage.setItem(key, 'true');
}

function buildModuleSection(section, sectionIndex) {
  const sectionId = `section-${sectionIndex}`;
  //                 //track percentage watched
  const total = section.children.length;
  const watchedCount = section.children.filter(
    (_, i) => localStorage.getItem(`watched_${sectionIndex}_${i}`) === 'true',
  ).length;

  const percent = Math.floor((watchedCount / total) * 100);
  const childrenHTML = section.children
    .map((child, childIndex) => {
      const locked = !child.unlocked && !isEnrolled;
      const watched =
        localStorage.getItem(`watched_${sectionIndex}_${childIndex}`) ===
        'true';
      const watchedBadge = watched
        ? '<span class="ml-auto text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Watched</span>'
        : '';
      const lockedBadge = locked
        ? '<span class="ml-auto text-xs px-2 py-0.5 bg-gray-200 rounded">Locked</span>'
        : '';

      return `
      <li class="flex w-full  gap-2 text-md ${locked ? 'text-muted cursor-not-allowed' : 'hover:text-primary cursor-pointer'}"
          onclick="playVideo(${sectionIndex}, ${childIndex})">
        <i class="fa ${locked ? 'fa-lock' : 'fa-play-circle'} text-md"></i>
        ${child.title}
        ${locked ? lockedBadge : watchedBadge}
      </li>
    `;
    })
    .join('');

  return `
    <div>
      <div class="flex  justify-between mb-2 text-left bg-gray-100 p-2 " onclick="toggleSection(${sectionIndex})">
        <h3 class="text-lg text-muted font-bold">${section.title}</h3>
        <i class="fa fa-chevron-${section.collapsed ? 'down' : 'up'} text-xs text-muted"></i>
      </div> 
      
     <div class="w-full h-1 bg-gray-200 rounded bg-gray-200">
        
           <div class="bg-green-500 h-1 rounded" style="width: ${percent}%;"></div>
         </div>
      <ul class="ml-4 space-y-2 transition-all duration-300 ${section.collapsed ? 'hidden' : ''}" id="${sectionId}">
         <span class="text-xs ${percent > 45 ? 'text-green' : 'text-red'}  mb-1 flex justify-end">Progress: ${percent}%</span>
        ${childrenHTML}
      </ul>
    </div>
  `;
}

function renderModules() {
  const container = document.getElementById('course-modules');
  const drawerContainer = document.getElementById('drawer-course-modules');

  if (container) container.innerHTML = '';
  if (drawerContainer) drawerContainer.innerHTML = '';

  modules.forEach((section, sectionIndex) => {
    const html = buildModuleSection(section, sectionIndex);
    if (container) container.innerHTML += html;
    if (drawerContainer) drawerContainer.innerHTML += html;
  });
}

function closeAuthPromptModal() {
  document.getElementById('authPrompt').classList.toggle('show');
  document.getElementById('authPrompt').classList.add('hidden');
}

function openAuthPromptModal() {
  document.getElementById('authPrompt').classList.toggle('show');
  document.getElementById('authPrompt').classList.remove('hidden');
}

// function toggleSection(index) {
//     modules[index].collapsed = !modules[index].collapsed;
//     renderModules();
// }

function playVideo(sectionIndex, childIndex) {
  const child = modules[sectionIndex].children[childIndex];
  const locked = !child.unlocked && !isEnrolled;

  console.log(child, locked, '>>>');

  if (locked) {
    alert('This video is locked. Please enroll to access it.');
    return;
  }

  const url = child.video;
  const wrapper = document.getElementById('video-wrapper');

  const description = document.getElementById('course_info');
  description.innerHTML = `${course.description.substring(0, 100)}...`;

  wrapper.innerHTML = renderVideoByType(url);

  localStorage.setItem(
    'last_watched_video',
    JSON.stringify({ sectionIndex, childIndex }),
  );
  markWatched(sectionIndex, childIndex);
}

function renderVideoByType(url) {
  if (!url) return '<p>No video available</p>';
  console.log(url, '<<<<<>>>');

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = getYouTubeID(url);
    return `
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full h-full"
      ></iframe>
    `;
  }

  if (url.includes('vimeo.com')) {
    const videoId = getVimeoID(url);
    return `
      <iframe
        src="https://player.vimeo.com/video/${videoId}"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        class="w-full h-full"
      ></iframe>
    `;
  }

  if (url.endsWith('.mp4')) {
    return `
      <video controls class="w-full h-full object-cover rounded-xl">
        <source src="${url}" type="video/mp4" />
        Your browser does not support video playback.
      </video>
    `;
  }

  return '<p>Unsupported video format.</p>';
}

function getYouTubeID(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    return urlObj.searchParams.get('v');
  } catch {
    return '';
  }
}

function getVimeoID(url) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : '';
}

// collapsible state tracker
function toggleSection(index) {
  modules[index].collapsed = !modules[index].collapsed;
  saveCollapseState();
  renderModules();
}

function saveCollapseState() {
  const state = modules.map((m) => m.collapsed);
  localStorage.setItem('collapsed_sections', JSON.stringify(state));
}

// toggle smallscreen drawer
function toggleDrawer(open) {
  const drawer = document.getElementById('modules-drawer');
  drawer.classList.toggle('hidden', !open);
}

const categories = Array.from({ length: 100 }, (_, i) => `Category ${i + 1}`);

function toggleMegaMenu() {
  const menu = document.getElementById('megaMenu');
  const isOpen = !menu.classList.contains('hidden');
  menu.classList.toggle('hidden', isOpen);
  if (!isOpen) populateCategories();
}

function populateCategories() {
  const grid = document.getElementById('categoryGrid');
  if (grid.children.length > 0) return; // Only populate once

  const html = categories
    .map(
      (cat) => `
    <div class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer whitespace-nowrap">${cat}</div>
  `,
    )
    .join('');

  grid.innerHTML = html;
}

// HOME PAGE COMPONENT
export function init(params) {
  requestAnimationFrame(() => {
    renderModules();

    if (hasEnrolled(course.id)) {
      enrollBtn.textContent = 'You are already enrolled';
      enrollBtn.disabled = true;

      enrollBtn2.textContent = 'You are already enrolled';
      enrollBtn2.disabled = true;
    } else {
      enrollBtn.addEventListener('click', () => {
        const result = enrollCourse(course.id);
        if (result.error) {
          openAuthPromptModal();
          return alert(result.error);
        }

        alert('Enrollment successful!');
        enrollBtn.textContent = 'You are now enrolled';
        enrollBtn.disabled = true;

        enrollBtn2.textContent = 'You are now enrolled';
        enrollBtn2.disabled = true;
        // renderCurriculum(course.curriculum, true); // reload as enrolled
      });

      enrollBtn2.addEventListener('click', () => {
        const result = enrollCourse(course.id);
        if (result.error) {
          openAuthPromptModal();
          return alert(result.error);
        }

        alert('Enrollment successful!');
        enrollBtn.textContent = 'You are now enrolled';
        enrollBtn.disabled = true;

        enrollBtn2.textContent = 'You are now enrolled';
        enrollBtn2.disabled = true;
        // renderCurriculum(course.curriculum, true); // reload as enrolled
      });
    }

    const saved = JSON.parse(localStorage.getItem('collapsed_sections'));
    if (Array.isArray(saved)) {
      modules.forEach((m, i) => (m.collapsed = saved[i]));
    }

    // auto play
    const last = JSON.parse(localStorage.getItem('last_watched_video'));
    if (last) playVideo(last.sectionIndex, last.childIndex);

    renderModules();
    // auth login via modal if user is not login and clicks enroll btn
    document
      .getElementById('login-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const result = await login(email, password);
        if (result.error) {
          alert(result.error);
        } else {
          alert('Login successful!');
          const user = getCurrentUser();
          user.enrolledCourses.push(currentCourse);
          setCurrentUser({
            ...user,
            enrolledCourses: [...user.enrolledCourses],
          });
          closeAuthPromptModal();

          // redirectAfterLogin()
        }
      });
  });
  //  action in html string will work like this
  return {};
}
