export const routes = [
  // index or home
  {
    path: 'index',
    view: 'src/views/students/index.html',
    script: ['src/js/home.js'],
  },

  {
    path: 'index',
    view: 'src/views/students/index.html',
    script: ['src/js/home.js'],
  },

  // course browsing
  {
    path: 'courses',
    view: 'src/views/students/courses.html',
    script: ['src/js/courses.js'],
    middleware: () => {
      console.log(' middleware ran');
      return true;
    },
  },
  {
    path: 'course_detail/:id',
    view: 'course_detail.html',
    script: ['src/js/sample.js'],
    middleware: () => confirm('see details'),
  },

  // dynamic mthd1
  {
    path: /^user\/(\d+)$/,
    view: 'views/user.html',
    script: ['src/js/sample.js'],
    middleware: (match, params) => {
      if (!match || !match[1]) return false;
      params.id = match[1];
      return true;
    },
  },
  // methd 2
  {
    path: 'user/:id',
    view: 'views/user.html',
    script: ['src/js/sample.js'],
  },

  // admin
  {
    path: 'admin/dashboard',
    view: 'views/admin/dashboard.html',
    script: ['src/js/sample.js'],
  },

  // last
  {
    path: '*',
    view: 'views/404.html',
    script: ['src/js/sample.js'],
  },
];
