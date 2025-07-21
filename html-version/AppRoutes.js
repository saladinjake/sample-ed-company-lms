export const routes = [
  // index or home
  {
    path: 'index',
    view: 'Views/Students/index.html',
    script: ['HomeManagement.js'],
  },

  {
    path: 'home',
    view: 'Views/Students/index.html',
    script: ['HomeManagement.js'],
  },

  // course browsing
  {
    path: 'courses',
    view: 'Views/Students/courses.html',
    script: ['CourseManagement/CoursesManagement.js'],
    middleware: () => {
      console.log(' middleware ran');
      return true;
    },
  },
  {
    path: 'course_detail/:id',
    view: 'Views/Students/course_detail.html',
    script: ['CourseManagement/CourseDetailManagement.js'],
    // middleware: () => confirm('see details'),
  },
  {
    path: 'cart',
    view: 'Views/Students/cart.html',
    script: ['CourseManagement/CartManagement.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'my_courses',
    view: 'Views/Students/my_courses.html',
    script: ['CourseManagement/MyStudentCoursesManagement.js'],
    // middleware: () => confirm('see details'),
  },

  // auth routes students

  {
    path: 'login',
    view: 'Views/Students/login.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'signup',
    view: 'Views/Students/signup.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'forgot_password',
    view: 'Views/Students/forgot_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'reset_password',
    view: 'Views/Students/reset_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  // dynamic mthd1
  {
    path: /^profile\/(\d+)$/ || 'profile/:id',
    view: 'Views/Students/profile.html',
    script: ['Profile.js'],
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
    view: 'Views/Students/login.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/signup',
    view: 'Views/Students/signup.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/forgot_password',
    view: 'Views/Students/forgot_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/reset_password',
    view: 'Views/Students/reset_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/:id/my_courses',
    view: 'Views/Instructors/my_courses.html',
    script: ['InstructorsManagement/MyCourses.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors',
    view: 'Views/Instructors/dashboard.html',
    script: ['InstructorsManagement/Dashbaord.js'],
    // middleware: () => confirm('see details'),
  },

  /** *************   ADMIN  *********** */

  // // admin
  {
    path: 'admin/login',
    view: 'Views/Admin/login.html',
    script: ['AdminManagement/Login.js'],
  },

  {
    path: 'admin/my_courses',
    view: 'Views/Admin/my_courses.html',
    script: ['AdminManagement/MyCoursesManagement.js'],
  },

  {
    path: 'admin/courses_pending_reviews',
    view: 'Views/Admin/pending_courses.html',
    script: ['AdminManagement/MyCoursesManagement.js'],
  },

  // // last
  // {
  //   path: '*',
  //   view: 'Views/404.html',
  //   script: ['Modules/sample.js'],
  // },
];
