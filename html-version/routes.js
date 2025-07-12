export const routes = [
  // index or home
  {
    path: 'index',
    view: 'src/views/students/index.html',
    script: ['src/js/Home.js'],
  },

  {
    path: 'home',
    view: 'src/views/students/index.html',
    script: ['src/js/Home.js'],
  },

  // course browsing
  {
    path: 'courses',
    view: 'src/views/students/courses.html',
    script: ['src/js/Courses.js'],
    middleware: () => {
      console.log(' middleware ran');
      return true;
    },
  },
  {
    path: 'course_detail/:id',
    view: 'src/views/students/course_detail.html',
    script: ['src/js/CourseDetail.js'],
    // middleware: () => confirm('see details'),
  },
  {
    path: 'cart',
    view: 'src/views/students/cart.html',
    script: ['src/js/Cart.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'my_courses',
    view: 'src/views/students/my_courses.html',
    script: ['src/js/MyCourses.js'],
    // middleware: () => confirm('see details'),
  },

  // auth routes students

  {
    path: 'login',
    view: 'src/views/students/login.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'signup',
    view: 'src/views/students/signup.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'forgot_password',
    view: 'src/views/students/forgot_password.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'reset_password',
    view: 'src/views/students/reset_password.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  // dynamic mthd1
  {
    path: /^profile\/(\d+)$/ || 'profile/:id',
    view: 'src/views/students/profile.html',
    script: ['src/js/Profile.js'],
    middleware: (match, params) => {
      if (!match || !match[1]) return false;
      params.id = match[1];
      return true;
    },
  },

  /** **************************************** */
  /** * Instructors sections */
  // auth routes instructor

  {
    path: 'instructors/login',
    view: 'src/views/students/login.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/signup',
    view: 'src/views/students/signup.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/forgot_password',
    view: 'src/views/students/forgot_password.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/reset_password',
    view: 'src/views/students/reset_password.html',
    script: ['src/js/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/:id/my_courses',
    view: 'src/views/instructors/my_courses.html',
    script: ['src/js/instructors/MyCourses.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors',
    view: 'src/views/students/dashboard.html',
    script: ['src/js/instructors/Dashbaord.js'],
    // middleware: () => confirm('see details'),
  },

  /** *************   ADMIN  *********** */

  // // admin
  {
    path: 'admin/login',
    view: 'views/admin/login.html',
    script: ['src/js/admin/Login.js'],
  },

  // // last
  // {
  //   path: '*',
  //   view: 'views/404.html',
  //   script: ['src/js/sample.js'],
  // },
];
