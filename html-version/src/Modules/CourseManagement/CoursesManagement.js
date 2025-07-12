import {
  seedMockDatabase,
  pickRandomSubset,
  getMockDatabaseCourses,
} from '../../Plugins/db/init';

const allCourses = pickRandomSubset(getMockDatabaseCourses(), 450); // You can replace with real data
const searchInput = document.getElementById('search-input');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const loadMoreBtn = document.getElementById('load-more-btn');
const paginationDiv = document.getElementById('pagination');
const sentinel = document.getElementById('scroll-sentinel');
// cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

let filteredCourses = [];
let page = 1;
const perPage = 10;
const infiniteLimit = 300;

function applyFilters() {
  const q = searchInput.value.toLowerCase();
  const maxPrice = parseInt(priceRange.value);
  const selectedStyles = Array.from(
    document.querySelectorAll('.learning-filter:checked'),
  ).map((i) => i.value);
  const selectedCats = Array.from(
    document.querySelectorAll('.category-filter:checked'),
  ).map((i) => i.value);

  return allCourses.filter((course) => {
    const matchesSearch = (course.title + course.description + course.category)
      .toLowerCase()
      .includes(q);
    const matchesPrice = course.price <= maxPrice;
    const matchesStyle = selectedStyles.length
      ? selectedStyles.includes(course.style)
      : true;
    const matchesCategory = selectedCats.length
      ? selectedCats.includes(course.category)
      : true;
    return matchesSearch && matchesPrice && matchesStyle && matchesCategory;
  });
}

function renderCourses(reset = false) {
  try {
    const grid = document.getElementById('course-grid');

    if (reset) {
      grid.innerHTML = '';
      page = 1;
    }

    const start = (page - 1) * perPage;
    const end = page * perPage;
    const slice = filteredCourses.slice(start, end);

    slice.forEach((course) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.className = 'bg-white rounded-xl shadow-sm w-full';
      card.innerHTML = `
      <img src="${course.image}" class="rounded-t-xl w-full" />
      <div class="p-4">
        <h3 class="text-md font-semibold mb-2 text-black">${course.title}</h3>
        <span class="text-md  mb-3 text-black">${`${course.description.substring(0, 140)}...`}</span>
        <p class="text-xs text-muted">By ${course.instructor}</p>
         <div class="text-sm mt-2">
         • ${course.level} • ${course.category}
      </div>
      <div class="flex justify-between">
        <button class="p-4 mt-3 border-2" data-action="viewCourse"
            data-id="${course.id}">View Course</button>
         <button data-action="addToCart" data-id="${course.id}"  class=" mt-4 border-2" style="background:blue;padding:10px; color:#fff">
  <i class="fas fa-shopping-cart"></i> Add to cart ₦${course.price}
</button>
</div>
   

      </div>`;
      grid.appendChild(card);
    });

    page++;
    handleLoadControls();
  } catch (err) {
    console.log(err);
  }
}

function handleLoadControls() {
  const shown = (page - 1) * perPage;
  const total = filteredCourses.length;

  if (shown < 200 && total > shown) {
    // still in infinite scroll range
    sentinel.style.display = 'block';
    loadMoreBtn.style.display = 'none';
    paginationDiv.classList.add('hidden');
  } else if (shown >= 200 && shown < 400) {
    // between 200–400 → show "Load More"
    sentinel.style.display = 'none';
    loadMoreBtn.style.display = 'inline-block';
    paginationDiv.classList.add('hidden');
  } else {
    // 400+ → pagination
    sentinel.style.display = 'none';
    loadMoreBtn.style.display = 'none';
    showPagination();
  }
}

function showPagination() {
  const grid = document.getElementById('course-grid');

  paginationDiv.classList.remove('hidden');
  paginationDiv.innerHTML = '';
  const totalPages = Math.ceil(filteredCourses.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = `btn ${i === page - 1 ? 'btn-primary' : 'btn-light'} mx-1`;
    btn.onclick = () => {
      page = i;
      grid.innerHTML = '';
      renderCourses();
    };
    paginationDiv.appendChild(btn);
  }
}

const toggleCartModal = (show) => {
  let cartItems = [];
  if (localStorage.getItem('cart')) {
    cartItems = JSON.parse(localStorage.getItem('cart'));
  }

  console.log(cartItems, '>>>>');
  if (show) {
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
};

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
           <button 
           class="text-red-500 text-sm" style="background:red; width:150px;color:#fff; height:40px;margin-top:10px"
         data-action="removeFromCart"
            data-id="${course.title}">Remove</button>
      </div>
   
    `;
    container.appendChild(item);
  });

  document.getElementById('cart-subtotal').textContent =
    cart.length > 0 ? `Total: ₦${subtotal}` : '';
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cart_saved_at', Date.now());
  document.getElementById('cart-count').textContent = cart.length;
}

function resetAndRender() {
  filteredCourses = applyFilters();
  renderCourses(true);
}

export function init(params) {
  // similar to react use effect lifecycle when dom is loaded
  requestAnimationFrame(() => {
    setTimeout(() => {
      // Handlers
      searchInput.addEventListener('input', resetAndRender);
      priceRange.addEventListener('input', () => {
        priceValue.textContent = priceRange.value;
        resetAndRender();
      });
      document
        .querySelectorAll('.learning-filter, .category-filter')
        .forEach((el) => el.addEventListener('change', resetAndRender));
      loadMoreBtn.addEventListener('click', renderCourses);
      // Infinite Scroll
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            (entries[0].isIntersecting && page * perPage <= infiniteLimit) ||
            (entries[0].isIntersecting &&
              page * perPage <= filteredCourses.length)
          ) {
            renderCourses();
          }
        },
        { rootMargin: '100px' },
      );
      observer.observe(sentinel);
      // init cart
      const savedTime = parseInt(localStorage.getItem('cart_saved_at') || '0');
      const now = Date.now();
      if (now - savedTime > 86400000) {
        localStorage.removeItem('cart');
        localStorage.removeItem('cart_saved_at');
        cart = [];
      }
      renderCartItems();
      saveCart();
    }, 2000);
  });

  // Init
  filteredCourses = applyFilters();
  renderCourses(true);

  //  action in html string will work like this
  return {
    // similar to vue methods called in html
    viewCourse: ({ event, dataset }) => {
      const courseId = dataset.id;
      // Navigate to course
      alert(courseId);

      const course = allCourses.find(
        (c) => parseInt(c.id) == parseInt(courseId),
      );
      if (!course) return alert('Course not found!');

      localStorage.setItem('selected_course', JSON.stringify(course));
      return (location.hash = `#course_detail/${courseId}`);
    },

    addToCart: ({ event, dataset }) => {
      try {
        const courseId = dataset.id;
        // Navigate to course
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
    },
    payWithPaystack: () => {
      // const myCart = JSON.parse(localStorage.getItem('cart')) || [];
      // console.log(myCart, '<<<<');
      // const user = getCurrentUser();
      // const total = myCart.reduce((item, acc) => item.price + acc, 0);
      // const handler = PaystackPop.setup({
      //   publicKey: 'pk_test_5dca9a796da0a59391c7f15c6cdc0275db4c8093',
      //   reference: new Date().getTime(),
      //   email: user?.email || 'guest@gmail.com',
      //   amount: total * 100, // in kobo
      //   currency: 'NGN',
      //   ref: `COURSE_${new Date().getTime()}`,
      //   metadata: {
      //     custom_fields: [
      //       {
      //         display_name:
      //           myCart.length > 1
      //             ? 'Multiple Course Enrolement'
      //             : myCart.length == 1
      //               ? myCart[0].title
      //               : 'Course Enrollment',
      //         variable_name: 'course_id',
      //         value:
      //           myCart.length > 1
      //             ? 'Multiple Course Enrolement'
      //             : myCart.length == 1
      //               ? myCart[0].title
      //               : 'Course Enrollment',
      //       },
      //     ],
      //   },
      //   callback(response) {
      //     alert(`Payment successful! Ref: ${response.reference}`);
      //     // You can call your backend API here to mark as enrolled
      //   },
      //   onClose() {
      //     alert('Transaction cancelled');
      //   },
      // });
      // handler.openIframe();
    },

    removeFromCart: ({ event, dataset }) => {
      const title = dataset.id;
      cart = cart.filter((c) => c.title !== title);
      saveCart();
      renderCartItems();
      // toggleCartModal(true);
    },
    clearCart: () => {
      cart = [];
      localStorage.removeItem('cart');
      localStorage.removeItem('cart_saved_at');
      renderCartItems();
      toggleCartModal(true);
    },
    toggleCartModal,
    saveCart,
  };
}
