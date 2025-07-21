import { getCourseById } from '../../Plugins/db/init';

function renderMyCourses() {
  const user = JSON.parse(localStorage.getItem('current_user'));
  const all = JSON.parse(localStorage.getItem('created_courses') || '[]');
  const myCourses = all.filter((c) => c.ownerId === user.id);

  document.getElementById('myCoursesGrid').innerHTML = myCourses
    .map(
      (c) => `
    <div class="border rounded p-4 bg-white space-y-2 shadow">
      <img src="${c.thumbnail}" class="w-full h-40 object-cover rounded" />
      <h3 class="font-semibold text-lg">${c.title}</h3>
      <p class="text-sm text-gray-500 line-clamp-3">${c.description}</p>

      <div class="flex justify-between items-center text-sm mt-2">
        <span class="px-2 py-1 rounded-full ${c.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
          ${c.published ? 'Published' : 'Draft'}
        </span>
        <button class="text-blue-600 hover:underline" onclick="editCourse('${c.id}')">Edit</button>
      </div>

      <div class="flex gap-2 justify-between text-xs">
        <button onclick="togglePublish('${c.id}')" class="btn-sm">${c.published ? 'Unpublish' : 'Publish'}</button>
        <button onclick="expireCourse('${c.id}')" class="btn-sm bg-red-100 text-red-700">Expire</button>
      </div>
    </div>
  `,
    )
    .join('');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
}

function renderCourseAnalytics(courseId) {
  const course = getCourseById(courseId);

  document.getElementById('courseMetrics').innerHTML = `
    <div class="card">👁 Views<p>${course.views || 0}</p></div>
    <div class="card">Enrollments<p>${(course.enrollments || []).length}</p></div>
    <div class="card">Revenue<p>₦${course.revenue || 0}</p></div>
  `;
}

// todo should only be for admin

function togglePublish(id) {
  const all = JSON.parse(localStorage.getItem('created_courses') || '[]');
  const course = all.find((c) => c.id === id);
  if (!course) return;

  course.published = !course.published;
  localStorage.setItem('created_courses', JSON.stringify(all));
  renderMyCourses();
}

function expireCourse(id) {
  const all = JSON.parse(localStorage.getItem('created_courses') || '[]');
  const course = all.find((c) => c.id === id);
  if (!course) return;

  course.expired = true;
  localStorage.setItem('created_courses', JSON.stringify(all));
  renderMyCourses();
}

export function init(params) {
  requestAnimationFrame(() => {
    renderMyCourses();
    renderCourseAnalytics();
  });

  //  action in html string will work like this
  return {
    expireCourse: ({ dataset }) => expireCourse(dataset.id),
    togglePublish,
    toggleSidebar,
  };
}
