export const routes = [
  // index or home
  {
    path: 'index',
    view: 'src/Views/Students/index.html',
    script: ['HomeManagement.js'],
  },

  {
    path: 'home',
    view: 'src/Views/Students/index.html',
    script: ['HomeManagement.js'],
  },

  // course browsing
  {
    path: 'courses',
    view: 'src/Views/Students/courses.html',
    script: ['CourseManagement/CoursesManagement.js'],
    middleware: () => {
      console.log(' middleware ran');
      return true;
    },
  },
  {
    path: 'course_detail/:id',
    view: 'src/Views/Students/course_detail.html',
    script: ['CourseManagement/CourseDetailManagement.js'],
    // middleware: () => confirm('see details'),
  },
  {
    path: 'cart',
    view: 'src/Views/Students/cart.html',
    script: ['CourseManagement/CartManagement.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'my_courses',
    view: 'src/Views/Students/my_courses.html',
    script: ['CourseManagement/MyStudentCoursesManagement.js'],
    // middleware: () => confirm('see details'),
  },

  // auth routes students

  {
    path: 'login',
    view: 'src/Views/Students/login.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'signup',
    view: 'src/Views/Students/signup.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'forgot_password',
    view: 'src/Views/Students/forgot_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'reset_password',
    view: 'src/Views/Students/reset_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  // dynamic mthd1
  {
    path: /^profile\/(\d+)$/ || 'profile/:id',
    view: 'src/Views/Students/profile.html',
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
    view: 'src/Views/Students/login.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/signup',
    view: 'src/Views/Students/signup.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/forgot_password',
    view: 'src/Views/Students/forgot_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/reset_password',
    view: 'src/Views/Students/reset_password.html',
    script: ['AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/:id/my_courses',
    view: 'src/Views/Instructors/my_courses.html',
    script: ['InstructorsManagement/MyCourses.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors',
    view: 'src/Views/Instructors/dashboard.html',
    script: ['InstructorsManagement/Dashbaord.js'],
    // middleware: () => confirm('see details'),
  },

  /** *************   ADMIN  *********** */

  // // admin
  {
    path: 'admin/login',
    view: 'src/Views/Admin/login.html',
    script: ['AdminManagement/Login.js'],
  },

  {
    path: 'admin/my_courses',
    view: 'src/Views/Admin/my_courses.html',
    script: ['AdminManagement/MyCoursesManagement.js'],
  },

  {
    path: 'admin/courses_pending_reviews',
    view: 'src/Views/Admin/pending_courses.html',
    script: ['AdminManagement/MyCoursesManagement.js'],
  },

  // // last
  // {
  //   path: '*',
  //   view: 'Views/404.html',
  //   script: ['Modules/sample.js'],
  // },
];
