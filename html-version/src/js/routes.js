export const routes = [
  {
    path: 'home',
    view: 'home.html',
    script: ['pages/home.js']
  },
  {
    path: 'courses',
    view: 'courses.html',
    script: ['src/js/courses.js'],
    middleware: () => {
      console.log(" middleware ran");
      return true;
    }
  },
  {
    path: 'course_detail/:id',
    view: 'course_detail.html',
    script: ['src/js/course_detail.js'],
    middleware: () => confirm("see details")
  },

  //dynamic mthd1
  {
  path: /^user\/(\d+)$/,
  view: 'views/user.html',
  script: 'pages/user.js',
  middleware: (match, params) => {
    if (!match || !match[1]) return false;
    params.id = match[1];
    return true;
  }
},
//methd 2
{
  path: 'user/:id',
  view: 'views/user.html',
  script: 'pages/user.js'
},




  // admin
  {
  path: 'admin/dashboard',
  view: 'views/admin/dashboard.html',
  script: 'pages/admin/dashboard.js'
},








//last
{
  path: '*',
  view: 'views/404.html',
  script: 'pages/404.js'
}

];
