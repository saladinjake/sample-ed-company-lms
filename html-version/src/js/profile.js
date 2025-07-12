
  const user = getCurrentUser();
  const users = getUsers();
  const current = users.find(u => u.email === user.email);

  document.querySelector('[name="name"]').value = current.name;
  document.querySelector('[name="email"]').value = current.email;
  document.querySelector('[name="preference"]').value = current.preference || "video";

  // Update profile
  document.getElementById("profile-form").addEventListener("submit", e => {
    e.preventDefault();
    current.name = e.target.name.value;
    current.preference = e.target.preference.value;
    saveUsers(users);
    //update preference
    alert("Profile updated!");
  });

  // Change password
  document.getElementById("password-form").addEventListener("submit", async e => {
    e.preventDefault();
    const currentHash = await hashPassword(e.target.current.value);
    const newHash = await hashPassword(e.target.newpass.value);

    if (currentHash !== current.password) {
      alert("Current password is incorrect");
      return;
    }

    current.password = newHash;
    saveUsers(users);
    alert("Password changed successfully!");
  });




  const categories = Array.from({ length: 100 }, (_, i) => `Category ${i + 1}`);

  function toggleMegaMenu() {
    const menu = document.getElementById("megaMenu");
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    if (!isOpen) populateCategories();
  }

  function populateCategories() {
    const grid = document.getElementById("categoryGrid");
    if (grid.children.length > 0) return; // Only populate once

    const html = categories.map(cat => `
    <div class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer whitespace-nowrap">${cat}</div>
  `).join("");

    grid.innerHTML = html;
  }