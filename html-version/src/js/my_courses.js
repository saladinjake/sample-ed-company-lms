
    const courseList = document.getElementById("my-course-list");
    const user = getCurrentUser();
    const allCourses = getMockDatabaseCourses(); // You can replace with real data

    const users = getUsers();
    const current = users.find(u => u.email == user?.email);
    const enrolledIds = user?.enrolledCourses.map(id => id)


    console.log(user)

    const enrolledCourses = user?.enrolledCourses
    console.log(enrolledCourses, "<<<")

    if (enrolledCourses.length === 0) {
      courseList.innerHTML = `<p class="text-gray-500 text-xl w-full">You haven't enrolled in any courses yet.</p>`;
    } else {
      courseList.innerHTML = enrolledCourses.map(course => `
    <div class="bg-white p-4 shadow rounded-xl">
  <img src="${course.image}" class="rounded-t-xl w-full" />
      <div class="p-4">
        <h3 class="text-md font-semibold mb-2 text-black">${course.title}</h3>
        <span class="text-md  mb-3 text-black">${course.description.substring(0, 140) + "..."}</span>
        <p class="text-xs text-muted">By ${course.instructor}</p>
         <div class="text-sm mt-2">
         • ${course.level} • ${course.category}
      </div>
      <div class="flex justify-between">
   <button class="p-4 mt-3 border-2" onclick="viewCourse('${course.id}')">View Course</button>
       
    </div>
  `).join("");
    }

    function viewCourse(courseId) {
      const course = allCourses.find(c => c.id == courseId);
      localStorage.setItem("study_course_lms", JSON.stringify(course));
      window.location.href = "lms.html?lms="+ course?.id;
    }





    const categories = Array.from({ length: 100 }, (_, i) => `Category ${i + 1}`);

    function toggleMegaMenu() {
      const menu = document.getElementById("megaMenu");
      const isOpen = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden", isOpen);
      if (!isOpen) populateCategories();
    }

    function populateCategories() {
      const grid = document.getElementById("categoryGroupsContainer");
      if (grid.children.length > 0) return; // Only populate once

      const html = categories.map(cat => `
    <div class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer whitespace-nowrap">${cat}</div>
  `).join("");

      grid.innerHTML = html;
    }