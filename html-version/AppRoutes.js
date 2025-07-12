export const routes = [
  // index or home
  {
    path: 'index',
    view: 'src/Views/Students/index.html',
    script: ['src/js/HomeManagement.js'],
  },

  {
    path: 'home',
    view: 'src/Views/Students/index.html',
    script: ['src/js/HomeManagement.js'],
  },

  // course browsing
  {
    path: 'courses',
    view: 'src/Views/Students/courses.html',
    script: ['src/js/CourseManagement/Courses.js'],
    middleware: () => {
      console.log(' middleware ran');
      return true;
    },
  },
  {
    path: 'course_detail/:id',
    view: 'src/Views/Students/course_detail.html',
    script: ['src/js/CourseManagement/CourseDetail.js'],
    // middleware: () => confirm('see details'),
  },
  {
    path: 'cart',
    view: 'src/Views/Students/cart.html',
    script: ['src/js/CourseManagement/Cart.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'my_courses',
    view: 'src/Views/Students/my_courses.html',
    script: ['src/js/CourseManagement/MyCourses.js'],
    // middleware: () => confirm('see details'),
  },

  // auth routes students

  {
    path: 'login',
    view: 'src/Views/Students/login.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'signup',
    view: 'src/Views/Students/signup.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'forgot_password',
    view: 'src/Views/Students/forgot_password.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'reset_password',
    view: 'src/Views/Students/reset_password.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  // dynamic mthd1
  {
    path: /^profile\/(\d+)$/ || 'profile/:id',
    view: 'src/Views/Students/profile.html',
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
    view: 'src/Views/Students/login.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/signup',
    view: 'src/Views/Students/signup.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/forgot_password',
    view: 'src/Views/Students/forgot_password.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/reset_password',
    view: 'src/Views/Students/reset_password.html',
    script: ['src/js/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/:id/my_courses',
    view: 'src/Views/Instructors/my_courses.html',
    script: ['src/js/InstructorsManagement/MyCourses.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors',
    view: 'src/Views/Instructors/dashboard.html',
    script: ['src/js/InstructorsManagement/Dashbaord.js'],
    // middleware: () => confirm('see details'),
  },

  /** *************   ADMIN  *********** */

  // // admin
  {
    path: 'admin/login',
    view: 'src/Views/Admin/login.html',
    script: ['src/js/AdminManagement/Login.js'],
  },

  // // last
  // {
  //   path: '*',
  //   view: 'Views/404.html',
  //   script: ['src/js/sample.js'],
  // },
];
