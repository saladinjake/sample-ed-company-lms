import { getCurrentUser, getUsers,saveUsers } from "./Auth/Auth";
import { hashPassword } from "./Auth/Auth";
const user = getCurrentUser();
const users = getUsers();
const current = users.find(u => u.email === user.email);

document.querySelector('[name="name"]').value = current.name;
document.querySelector('[name="email"]').value = current.email;
document.querySelector('[name="preference"]').value = current.preference || "video";





export function init(params) {

  requestAnimationFrame(() => {

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



  });

  //  action in html string will work like this
  return {
    companyHasRoom,
    checkCompanySeatLimit
  };
}
