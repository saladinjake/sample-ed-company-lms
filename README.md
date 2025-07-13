#🧪 MVP Frontend-Only E-Learning Platform

- A minimal, responsive frontend-only learning platform built with pure HTML, CSS (utility-first), and JavaScript.

- Designed to simulate a real LMS, this MVP includes course browsing, learning modules, progress tracking, and offline resume functionality — all powered by localStorage.

### 🎯 Goals
✅ Mobile-first, responsive layout
✅ Course Enrollment
✅ Course Search + Detail
✅ Cart + payment Paystack functionality
✅ Video + HTML content per lesson
✅ Progress tracking (video + slide completion)
✅ Resume where you left off
✅ Local-only: no backend, authentication via localstorage + data persistence
✅ Readiness for expansion (Vue/Backend ready)


### 🚀 Features
📚 Course Viewer
Accordion-based curriculum with sections + lessons
Lessons support:
✅ Video (YouTube, Vimeo, MP4)
✅ Slides (HTML content rendered as a slideshow)
📈 Progress Tracking

### localStorage tracks:
Video watched ✅

Slides read ✅
Resumes user at last-viewed lesson
Section progress bars

###🔓 Quiz Unlock Logic
Quiz available only when all lessons are complete

Tracks user lesson-by-lesson progress

Slide & video completion both required to unlock

✅ HTML5, CSS3 (custom utility-first style)

✅ Vanilla JavaScript (modular, reusable)

✅ No extra frameworks just  -- vanilla js frameless util lib

✅ Fully offline-ready (all data in browser)

📘 Data Structure Example
````
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

json
Copy
Edit
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
````
###📱 Responsive Behavior
Sidebar collapses into dropdown on mobile

Slideshow navigation is touch-friendly

Accordion curriculum adapts to screen size

Full-height layout for immersive learning

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
