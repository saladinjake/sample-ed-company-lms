let cart = JSON.parse(localStorage.getItem('cart')) || [];
const allCourses = JSON.parse(localStorage.getItem('created_courses')) || [];
function addToCart(courseId) {
  try {
    const course = allCourses.find((c) => c.id == courseId);
    if (!course) return alert('Course not found!');

    const exists = cart.find((c) => c.id == course.id);
    if (!exists) {
      cart.push(course);
      saveCart();
      renderCartItems();
      toggleCartModal(true);
    }
  } catch (err) {
    console.log(err);
  }
}

function toggleCartModal(show) {
  let cartItems = [];
  if (localStorage.getItem('cart')) {
    cartItems = JSON.parse(localStorage.getItem('cart'));
  }

  console.log(cartItems, '>>>>');
  if (show.toString() == 'true') {
    document.getElementById('cart-modal').classList.remove('hidden');
  } else {
    document.getElementById('cart-modal').classList.add('hidden');
  }
  document.getElementById('cart-modal').classList.toggle('show');
  // document.getElementById("cart-modal").classList.toggle("hidden", !show);
  document.getElementById('cart-count').textContent = cart.length;

  if (cartItems.length > 0) {
    document
      .querySelectorAll('.cart-modal .hasCart')
      .forEach((el) => el.classList.remove('hidden'));
  } else {
    document
      .querySelectorAll('.cart-modal .hasCart')
      .forEach((el) => el.classList.add('hidden'));
  }
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const subtotal = cart.reduce((sum, c) => sum + c.price, 0);
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-muted'>Your cart is empty.</p>";
  }

  cart.forEach((course) => {
    const item = document.createElement('div');
    item.className = 'flex  border-b pb-2';
    item.innerHTML = `
      <div class="flex flex-rows justify-start">
        <div>
            <img src="${course.image}" class="rounded-t-xl w-full p-4" style="width:200px; height:200px" />
          </div>
          <div class="flex flex-cols  p-8">
             <h3 class="text-md font-semibold mb-2 text-black">${course.title}</h3>
        <span class="text-md  mb-3 text-black">${`${course.description.substring(0, 140)}...`}</span>
        <p class="text-xs text-muted">By ${course.instructor}</p>
         <div class="text-sm mt-2">
         • ${course.level} • ${course.category}
        </div>
           <button class="text-red-500 text-sm" style="background:red; width:150px;color:#fff; height:40px;margin-top:10px" onclick="removeFromCart('${course.title}')">Remove</button>
      </div>
   
    `;
    container.appendChild(item);
  });

  document.getElementById('cart-subtotal').textContent =
    cart.length > 0 ? `Total: ₦${subtotal}` : '';
}

function removeFromCart(title) {
  cart = cart.filter((c) => c.title !== title);
  saveCart();
  renderCartItems();
  // toggleCartModal(true);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cart_saved_at', Date.now());
  document.getElementById('cart-count').textContent = cart.length;
}

function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  localStorage.removeItem('cart_saved_at');
  renderCartItems();
  toggleCartModal(true);
}

export function init(params) {
  // load default db for demo from local storage
  const categories = Array.from({ length: 100 }, (_, i) => `Category ${i + 1}`);

  function populateCategories() {
    const grid = document.getElementById('categoryGrid');
    if (grid.children.length > 0) return; // Only populate once

    const html = categories
      .map(
        (cat) => `
    <div class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer whitespace-nowrap">${cat}</div>
  `,
      )
      .join('');

    grid.innerHTML = html;
  }

  requestAnimationFrame(() => {
    const savedTime = parseInt(localStorage.getItem('cart_saved_at') || '0');
    const now = Date.now();
    if (now - savedTime > 86400000) {
      localStorage.removeItem('cart');
      localStorage.removeItem('cart_saved_at');
      cart = [];
    }
    renderCartItems();
    saveCart();
  });

  //  action in html string will work like this
  return {
    clearCart,
    saveCart,
    populateCategories,
    addToCart: ({ dataset }) => addToCart(dataset.id),
    toggleCartModal: ({ dataset }) => addToCart(dataset.show),
    removeFromCart: ({ dataset }) => removeFromCart(dataset.title),
  };
}
