
const mockUpMongoDatabase = {
  // mocks user db table in real life
  "users": [
    {
      "email": "user123@example.com",
      "password": "e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446", // user123
      "name": "John Doe",
      "resetToken": "abc123", // optional
      "token": "uuid-session-token",
      role: "student"
    },

    {
      "email": "victor@kuda.com",
      "password": "hashedpassword", // We'll just store raw for now
      "name": "John Doe",
      "resetToken": "abc123", // optional
      "token": "uuid-session-token",
      role: "employee"
    },

    // hr admin or any company using our saas 
    {
      "email": "company123@kuda.com",
      "password": "54e48cbd75ad8c2d3237b35a151ca891de8ebd4ec6d2a958a51121e074c1ba51", // We'll just store raw for now
      "name": "John Doe",
      "resetToken": "abc123", // optional
      "token": "uuid-session-token",
      role: "employee"
    },


    // the saas admin
    {
      "email": "admin123@lms.com",
      "password": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", // We'll just store raw for now
      "name": "John Doe",
      "resetToken": "abc123", // optional
      "token": "uuid-session-token",
      role: "admin"
    },

    {
      "email": "instructor123@example.com",
      "password": "auth.js:12 c1437a55f6e93b7049c4064af1b0920974e383a435283f5d0b0496ee4a8a47b5", // instructor123
      "name": "John Doe",
      "resetToken": "abc123", // optional
      "token": "uuid-session-token",
      role: "instructor"
    },


  ],
  "currentUser": {
    // get user info from user db table
    "email": "Guest 1001",
    "token": "uuid-session-token",
    role: 'student',
    companyId: 'Free Individual',
    //mocks get user prefrences from prefrence table or profile table
    preference: {
      cardPreference: { paymentMethod: "Master Card" },
      onboardingCategories: ["React", "Frontend Development", "Data Structures"],
      displayName: "***",
      displayEmail: "Guest 1001",
      screenReaderEnabled: true
    },
    //progress
    // users not assigneed by companies are called students while those assigned courses by employess are  employee by role
    //mocks  get courses and analytics from enrolled course api 
    enrolledCourses: [],
    progress: {
      courseId1: ["mod-1.1", "mod-1.2"],
      courseId2: []
    }

  },

  profile: {
    role: 'student',
    companyId: 'Free Individual',
    //mocks get user prefrences from prefrence table or profile table
    preference: {
      cardPreference: { paymentMethod: "Master Card" },
      onboardingCategories: ["React", "Frontend Development", "Data Structures"],
      displayName: "***",
      displayEmail: "Guest 1001",
      screenReaderEnabled: true
    },
    //progress
    // users not assigneed by companies are called students while those assigned courses by employess are  employee by role
    //mocks  get courses and analytics from enrolled course api 
    enrolledCourses: [],
    progress: {
      courseId1: ["mod-1.1", "mod-1.2"],
      courseId2: []
    }
  },

  courses: generateMockCourses(270) //dont flood local storage
}


export function seedMockDatabase() {
  // users
  if (!localStorage.getItem("users")) {
    localStorage.setItem('üsers', JSON.stringify(mockUpMongoDatabase.users))
  }
  // current sessions

  // courses
  if (!localStorage.getItem("created_courses")) {
    localStorage.setItem("created_courses", JSON.stringify(mockUpMongoDatabase.courses))
  }

}


export function getMockDatabaseCourses() {
  //load data from admin course work bench or instructors work bench
  // courses
  if (!localStorage.getItem("created_courses")) {
    localStorage.setItem("created_courses", JSON.stringify(mockUpMongoDatabase.courses))
  }
  return JSON.parse(localStorage.getItem("created_courses"))
}


export function pickRandomSubset(arr, count) {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function getSampleVideo() {
  const videos = [
    "https://www.youtube.com/watch?v=OK_JCtrrv-c",
    "https://vimeo.com/76979871",
    "https://www.youtube.com/watch?v=w7ejDZ8SWv8"
  ];
  return videos[Math.floor(Math.random() * videos.length)];
}



export function generateCourse(count) {

  const list = [];
  for (let i = 1; i <= count; i++) {
    const id = i || `course-${i}`;
    const course = generateSingleMockCourse(id)
    list.push(course);
  }
  return list;
}


export function generateMockCourses(count) {
  const categories = ['Design', 'Development', 'Marketing', 'Business'];
  const styles = ['video', 'text', 'interactive'];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const random_videoS = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.youtube.com/embed/zJSY8tbf_ys",
    "https://vimeo.com/76979871",

  ]

  const loremIpsum = `<h3>HTML stands for HyperText Markup Language</h3>

                                <p>freestar
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultrices ac orci sed mollis. Duis pellentesque lacus id erat euismod, in porttitor massa blandit. In non sapien eget nunc interdum luctus nec et tortor. Pellentesque id nibh eget ligula volutpat hendrerit ac quis mauris.
 Mauris tellus arcu, ultricies mollis arcu eu, pretium facilisis mauris. Proin tortor lectus, tincidunt at arcu eget, dapibus luctus nibh. Sed fringilla, ex quis interdum dapibus, est purus commodo massa, quis commodo neque metus quis nisi. Maecenas a urna ut ipsum pulvinar interdum. Suspendisse dui turpis, euismod id sodales elementum, laoreet vitae metus. Sed sodales facilisis leo. Cras nec interdum lorem, eget iaculis magna. Ut facilisis, turpis a rhoncus bibendum, libero eros pulvinar eros, non euismod tortor sem vel felis. Curabitur eu cursus tellus, id hendrerit nulla. Phasellus venenatis enim a eleifend lobortis. Mauris consectetur, turpis hendrerit sollicitudin bibendum, turpis sapien laoreet sem, sit amet maximus orci nibh sit amet neque.
</p>

<p>Nulla fermentum lorem eu finibus imperdiet. Nullam malesuada sit amet sapien non elementum. In hac habitasse platea dictumst. Curabitur semper nibh id erat ultricies, eu molestie nulla varius. Sed porttitor metus ac ante ultrices, sed pretium tortor tincidunt. Cras pulvinar suscipit fringilla. Praesent lectus est, consectetur sed gravida non, convallis ut ligula. Vivamus sed facilisis risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris dapibus, quam convallis elementum egestas, ligula felis congue neque, non rhoncus tortor velit sed diam. Curabitur rutrum faucibus nulla quis sagittis. Donec quis fermentum sem, non pellentesque lorem. Vestibulum blandit nisi lobortis mauris bibendum luctus. Vestibulum justo justo, sodales nec orci sit amet, aliquet sagittis odio. Pellentesque rutrum, ex nec dapibus ornare, ex enim molestie nisl, ac placerat ex dolor eu magna.
</p>

<p>Praesent scelerisque lobortis diam a sagittis. Aenean porttitor dolor non magna luctus laoreet. Mauris nec ante efficitur, laoreet magna et, tempor urna. Ut feugiat iaculis dolor, at faucibus eros blandit non. Nulla vel diam fringilla, ultricies tortor eu, congue leo. Sed est arcu, tristique et felis sed, porttitor cursus nisi. Cras fringilla ut nunc in ultrices. Proin elementum porttitor enim in aliquet. Mauris nec sapien aliquet, pulvinar ligula sed, eleifend dolor. Nunc sagittis risus et orci scelerisque, id facilisis neque aliquam. Maecenas id leo odio. Quisque felis ex, tincidunt sit amet enim congue, laoreet ultricies elit. Maecenas et libero nec eros vulputate faucibus.
</p>

<p>Sed cursus venenatis urna maximus dapibus. Maecenas felis magna, porttitor sit amet velit in, semper interdum sem. Etiam varius, lacus et tempor sodales, mi lacus finibus leo, vitae vehicula nisi lectus in eros. Aenean accumsan arcu id placerat maximus. Quisque vitae ornare purus, at malesuada risus. Quisque et interdum lectus. Cras vel tincidunt velit, ac aliquam tellus. Nam metus nisi, feugiat eget commodo eget, semper a nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat magna in ornare dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
</p>

<p>Nunc placerat, magna sit amet rhoncus luctus, nisi nibh bibendum turpis, et ullamcorper elit lectus eu libero. Integer feugiat ex eget congue aliquam. Cras lectus lorem, laoreet quis felis sit amet, ultricies tempor dui. Etiam imperdiet tempus tortor ac consequat. In hac habitasse platea dictumst. Nulla facilisi. Cras nec eros est.
   </p>                             
                                `;

  const list = [];
  for (let i = 1; i <= count; i++) {
    const id = `course-${i}`;
    const category = categories[i % categories.length];
    const level = levels[i % levels.length];
    const curriculum = generateCurriculum(i);

    list.push({
      id: i,
      title: `Course ${i}`,
      description: loremIpsum,
      category: categories[i % 4],
      style: styles[i % 3],
      level,
      price: Math.floor(Math.random() * 500),
      image: `https://img-c.udemycdn.com/course/480x270/382300_f75b_3.jpg?text=Course+${i}`,
      instructor: `Instructor ${i}`,
      introVideo: random_videoS[i % random_videoS.length],
      tags: [category, level],
      curriculum,
      approved: true,
      approvalNote: "", // optional
      //analytics
      views: 132,
      enrollments: ['1', '3'], // user ids that enrolled
      revenue: 6400,

    });
  }
  return list;

}
export function generateCurriculum(seed = 1) {
  const random_videoS = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.youtube.com/embed/zJSY8tbf_ys",
    //  "https://vimeo.com/76979871",
    "https://www.youtube.com/embed/dD2EISBDjWM"

  ]

  const sectionCount = 2 + (seed % 3); // 2–4 sections
  return Array.from({ length: sectionCount }, (_, s) => ({
    title: `Section ${s + 1}`,
    collapsed: true,
    children: Array.from({ length: 3 + (seed % 2) }, (_, c) => ({
      title: `Lesson ${s + 1}.${c + 1}`,
      unlocked: c === 0, // unlock only first lesson
      video: random_videoS[c % random_videoS.length],

      htmlSlides: [], // too large with local storage
    }))
  }));
}


//load default users
document.addEventListener("DOMContentLoaded", () => seedMockDatabase())