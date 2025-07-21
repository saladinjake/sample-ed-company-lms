## MVP Frontend-Only E-Learning Platform

- A minimal, responsive frontend-only learning platform built with pure HTML, CSS (utility-first), and JavaScript.

- Designed to simulate a real LMS, this MVP includes course browsing, learning modules, progress tracking, and offline resume functionality — all powered by localStorage + Custom build Javascript Mini Framework.

### 🎯 Goals
- ✅ Mobile-first, responsive layout
- ✅ Course Enrollment
- ✅ Course Search + Detail
- ✅ Cart + payment Paystack functionality
- ✅ Video + HTML content per lesson
- ✅ Progress tracking (video + slide completion)
- ✅ Resume where you left off
- ✅ Local-only: no backend, authentication via localstorage + data persistence
- ✅ Readiness for expansion (Vue/Backend ready)


### 🚀 Features
📚 Course Viewer
Accordion-based curriculum with sections + lessons
Lessons support:
- ✅ Video (YouTube, Vimeo, MP4)
- ✅ Slides (HTML content rendered as a slideshow)
- 📈 Progress Tracking

### localStorage tracks:
- Video watched ✅

- Slides read ✅
- Resumes user at last-viewed lesson
- Section progress bars

###🔓 Quiz Unlock Logic
- Quiz available only when all lessons are complete
- Tracks user lesson-by-lesson progress
- Slide & video completion both required to unlock

- ✅ HTML5, CSS3 (custom utility-first style)

- ✅ Vanilla JavaScript (modular, reusable)

- ✅ No extra frameworks just  -- vanilla js frameless util lib

- ✅ Fully offline-ready (all data in browser)

- 📘 Data Structure Example And Framework

## Routing

- A developer friendly routing configuration

````
export const routes = [
  // index or home
  {
    path: 'index',
    view: 'src/Views/Students/index.html',
    script: ['Modules/HomeManagement.js'],
  },

  {
    path: 'home',
    view: 'src/Views/Students/index.html',
    script: ['Modules/HomeManagement.js'],
  },

  // course browsing
  {
    path: 'courses',
    view: 'src/Views/Students/courses.html',
    script: ['Modules/CourseManagement/CoursesManagement.js'],
    middleware: () => {
      console.log(' middleware ran');
      return true;
    },
  },
  {
    path: 'course_detail/:id',
    view: 'src/Views/Students/course_detail.html',
    script: ['Modules/CourseManagement/CourseDetailManagement.js'],
    // middleware: () => confirm('see details'),
  },
  {
    path: 'cart',
    view: 'src/Views/Students/cart.html',
    script: ['Modules/CourseManagement/CartManagement.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'my_courses',
    view: 'src/Views/Students/my_courses.html',
    script: ['Modules/CourseManagement/MyStudentCoursesManagement.js'],
    // middleware: () => confirm('see details'),
  },

  // auth routes students

  {
    path: 'login',
    view: 'src/Views/Students/login.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'signup',
    view: 'src/Views/Students/signup.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'forgot_password',
    view: 'src/Views/Students/forgot_password.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'reset_password',
    view: 'src/Views/Students/reset_password.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  // dynamic mthd1
  {
    path: /^profile\/(\d+)$/ || 'profile/:id',
    view: 'src/Views/Students/profile.html',
    script: ['Modules/Profile.js'],
    middleware: (match, params) => {
      if (!match || !match[1]) return false;
      params.id = match[1];
      return true;
    },
  },

 
  // auth routes instructor

  {
    path: 'instructors/login',
    view: 'src/Views/Students/login.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/signup',
    view: 'src/Views/Students/signup.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/forgot_password',
    view: 'src/Views/Students/forgot_password.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/reset_password',
    view: 'src/Views/Students/reset_password.html',
    script: ['Modules/AuthManager/Auth.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors/:id/my_courses',
    view: 'src/Views/Instructors/my_courses.html',
    script: ['Modules/InstructorsManagement/MyCourses.js'],
    // middleware: () => confirm('see details'),
  },

  {
    path: 'instructors',
    view: 'src/Views/Instructors/dashboard.html',
    script: ['Modules/InstructorsManagement/Dashbaord.js'],
    // middleware: () => confirm('see details'),
  },

 

  {
    path: 'admin/login',
    view: 'src/Views/Admin/login.html',
    script: ['Modules/AdminManagement/Login.js'],
  },

  {
    path: 'admin/my_courses',
    view: 'src/Views/Admin/my_courses.html',
    script: ['Modules/AdminManagement/MyCoursesManagement.js'],
  },

  {
    path: 'admin/courses_pending_reviews',
    view: 'src/Views/Admin/pending_courses.html',
    script: ['Modules/AdminManagement/MyCoursesManagement.js'],
  },

  // // last
  // {
  //   path: '*',
  //   view: 'Views/404.html',
  //   script: ['Modules/sample.js'],
  // },
];

  
const course = {
  title: "Frontend Bootcamp",
  curriculum: [
    {
      title: "Section 1",
      subsections: [
        {
          title: "Intro to HTML",
          video: "https://youtube.com/embed/xyz",
          htmlContent: [
            "<p>Welcome to HTML</p>",
            "<p>HTML uses tags like &lt;div&gt;</p>"
          ]
        },
        ...
      ]
    },
    ...
  ]
}
🧠 How Tracking Works
Progress is stored in localStorage:


{
  "lastViewed": { "sectionIndex": 1, "subIndex": 2 },
  "modules": {
    "0.0": {
      "videoWatched": true,
      "slidesRead": [0, 1],
      "completed": true
    },
    ...
  }
}






### Framwork bootsrapper
- In the main.js bootrap the mini framework
  
import './public/css/index.css';
import { routes } from './AppRoutes';
import { bootstrapContainers } from './src/bootstrap';

const app = document.getElementById('app');

bootstrapContainers(routes).runFramework(app);


````
###📱 Responsive Behavior
- Sidebar collapses into dropdown on mobile

- Slideshow navigation is touch-friendly

- Accordion curriculum adapts to screen size

- Full-height layout for immersive learning

📌 How to Use
1. clone the repo
2.  npm install --legacy-peer-deps  or npm install

Click on a module to begin.

Watch the video + read all slides.

Your progress is saved automatically.

On next visit, you resume where you stopped.

### 🧪 Limitations (MVP)
Not Included	Reason
Backend database	Uses localStorage only focus is on frontend logic and data manipulation
Certificate gen	Will follow post-quiz
Content upload	Static mock data only

###🔮 Future Roadmap
 Vue-powered version (or React/Alpine alternative)
 Admin course builder
 Quiz system + grader
 Certificate generator (PDF)
 User dashboard with stats
 Public course catalog
 Paystack + wallet system
