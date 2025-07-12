import { login, redirectAfterLogin } from "./Auth";
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
        document.getElementById("forgot-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const result = requestReset(email);

            if (result.error) {
                alert(result.error);
            } else {
                alert(`Reset code: ${result.token}`); // simulate email
                localStorage.setItem("reset_email", email);
                window.location.href = "reset.html";
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
