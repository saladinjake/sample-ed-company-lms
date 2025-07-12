import { login,redirectAfterLogin } from "./auth";
export function init(params) {
    // load default db for demo from local storage
    const categories = Array.from({ length: 100 }, (_, i) => `Category ${i + 1}`);



    function populateCategories() {
        const grid = document.getElementById("categoryGrid");
        if (grid.children.length > 0) return; // Only populate once

        const html = categories.map(cat => `
    <div class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer whitespace-nowrap">${cat}</div>
  `).join("");

        grid.innerHTML = html;
    }


    requestAnimationFrame(() => {
          document.getElementById("reset-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = localStorage.getItem("reset_email");
            const token = e.target.token.value;
            const password = e.target.password.value;
            const confirm = e.target.confirm.value;

            if (password !== confirm) {
                alert("Passwords do not match.");
                return;
            }

            const result = await resetPassword(email, token, password);
            if (result.error) {
                alert(result.error);
            } else {
                alert("Password reset successfully.");
                localStorage.removeItem("reset_email");
                window.location.href = "login.html";
            }
        });
    });


    //  action in html string will work like this
    return {
        toggleMegaMenu() {
            const menu = document.getElementById("megaMenu");
            const isOpen = !menu.classList.contains("hidden");
            menu.classList.toggle("hidden", isOpen);
            if (!isOpen) populateCategories();
        }

    };
}
