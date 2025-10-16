// --- Настройки

const TELEGRAM_TOKEN = "8060002374:AAGZ1B6fQutNTMMS22wOkgCH_defGVS8KVE";
const TELEGRAM_CHAT_ID = "-4885330608";

// --- Состояния
let cart = [];
let favorites = [];

// === 👤 АККАУНТЫ ===
let users = JSON.parse(localStorage.getItem("users") || "[]");
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

// === Восстанавливаем вход при перезагрузке страницы ===
document.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  renderAccount(); // обновляем интерфейс после восстановления
});


let currentPage = 1;
const perPage = 6;
let sortMode = "default";

let query = "";

let activeCategory = "all";

// --- Данные (по умолчанию)
let products = [
  {
  "name": "AirPods Pro 2 (LUX)",
  "category": "airpods",
  "price": 600,
  "img": "img/airpods-pro2-lux.png.png",
  "specs": [
    "Активное шумоподавление (ANC)",
    "Прозрачный режим",
    "Bluetooth 5.3",
    "До 6 часов автономной работы",
    "Беспроводной кейс"
  ],
  "memory": [
    { "size": "Базовая комплектация", "price": 600 }
  ],
  "colors": [
    { "name": "Белый", "color": "#ffffff", "img": "img/airpods-pro2-lux.png.png" },
  ]
},
{
  "name": "AirPods Pro 2 (Premium)",
  "category": "airpods",
  "price": 700,
  "img": "img/airpods-pro2-lux.png.png",
  "specs": [
    "Активное шумоподавление (ANC)",
    "Динамический звук",
    "Кейс с динамиком и креплением",
    "Поддержка Find My",
    "До 6 часов прослушивания"
  ],
  "memory": [
    { "size": "Базовая комплектация", "price": 700 }
  ],
  "colors": [
    { "name": "Белый", "color": "#ffffff", "img": "img/airpods-pro2-lux.png.png" },
  ]
},
{
  "name": "AirPods 3",
  "category": "airpods",
  "price": 650,
  "img": "img/airpods-pro3.png.png",
  "specs": [
    "Динамический драйвер Apple",
    "Поддержка пространственного звука",
    "До 6 часов прослушивания",
    "Влагозащита IPX4",
    "Беспроводной кейс MagSafe"
  ],
  "memory": [
    { "size": "Базовая комплектация", "price": 650 }
  ],
  "colors": [
    { "name": "Белый", "color": "#ffffff", "img": "img/airpods-pro3.png.png" }
  ]
}
];



// --- Утилиты
const fmt = n => n.toLocaleString("ru-RU") ;

const $ = id => document.getElementById(id);

// --- Фильтрация/сортировка
function getFiltered() {
  let list = products.slice();

  // фильтр по категории
  if (activeCategory !== "all") {
    list = list.filter(p => p.category === activeCategory);
  }

  // фильтр по поиску
  if (query) {
    list = list.filter(p => p.name.toLowerCase().includes(query));
  }

  // сортировка
  if (sortMode === "priceAsc") list.sort((a, b) => a.price - b.price);
  if (sortMode === "priceDesc") list.sort((a, b) => b.price - a.price);
  if (sortMode === "name") list.sort((a, b) => a.name.localeCompare(b.name, "ru"));

  return list;
}

// --- Рендер товаров
function render() {
  const list = $("productList");

  list.classList.add("page-exit");
  setTimeout(() => {
    list.classList.remove("page-exit");
    list.innerHTML = "";

    const items = getFiltered();
    const totalPages = Math.max(1, Math.ceil(items.length / perPage));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * perPage;
    const pageItems = items.slice(start, start + perPage);

    pageItems.forEach(p => {
      const idx = products.indexOf(p);
      const card = document.createElement("div");
      card.className = "card";
      const favActive = favorites.find(f => f.name === p.name) ? "active" : "";
card.innerHTML = `
  <img src="${p.img}" alt="${p.name}" onclick="openProduct(${idx})">
  <h3>${p.name}</h3>
  <p class="price">${fmt(p.price)} MDL</p>
  <div style="display:flex;justify-content:center;gap:10px;">
    <button class="btn btn-primary" onclick="addToCart(${idx})">🧺 В корзину</button>
    <button class="btn-fav ${favActive}" onclick="addToFavorites(${idx})">⭐</button>
  </div>
`;

      list.appendChild(card);
    });

    list.classList.add("page-enter");
    requestAnimationFrame(() => {
      list.classList.add("page-enter-active");
      list.classList.remove("page-enter");
      setTimeout(() => list.classList.remove("page-enter-active"), 500);
    });

    renderPagination(totalPages);
  }, 200);
}

// === Избранное ===
function toggleFavorites() {
  const overlay = document.getElementById("favOverlay");
  overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
  renderFavorites();
}

function addToFavorites(i) {
  const p = products[i];
  const existing = favorites.find(f => f.name === p.name);

  if (!existing) {
    favorites.push(p);
    showToast("💚 Товар добавлен в избранное!", "success");
  } else {
    favorites = favorites.filter(f => f.name !== p.name);
    showToast("💔 Удалён из избранного", "info");
  }

  document.getElementById("favCount").textContent = favorites.length;
  render(); // 🔥 обновляем карточки, чтобы цвет кнопки поменялся
  saveState();
}


function renderFavorites() {
  const box = document.getElementById("favItems");
  box.innerHTML = "";

  if (!favorites.length) {
    box.innerHTML = "<p>⭐ Пока нет избранных товаров.</p>";
    return;
  }

  favorites.forEach((p, i) => {
    const productIndex = products.findIndex(item => item.name === p.name);
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <img src="${p.img}" alt="${p.name}" onclick="openProduct(${productIndex})" style="cursor:pointer">
      <div style="flex:1;cursor:pointer" onclick="openProduct(${productIndex})">
        <div style="font-weight:600">${p.name}</div>
        <div>${fmt(p.price)} MDL</div>
      </div>
      <button class="btn btn-danger" onclick="removeFavorite(${i})">✖</button>
    `;

    box.appendChild(row);
  });
}


function removeFavorite(i) {
  favorites.splice(i, 1);
  document.getElementById("favCount").textContent = favorites.length;
  renderFavorites();
  render();
  saveState();
}


// --- Пагинация
function renderPagination(total) {
  const box = $("pagination");
  box.innerHTML = "";
  for (let i = 1; i <= total; i++) {
    const b = document.createElement("button");
    b.className = "page-btn" + (i === currentPage ? " active" : "");
    b.textContent = i;
    b.onclick = () => { currentPage = i; render(); };
    box.appendChild(b);
  }
}

// --- Поиск
function filterProducts() {
  query = $("searchInput").value.trim().toLowerCase();
  currentPage = 1;
  render();
}

// --- Сортировка
(function initSort() {
  const dd = $("sortDropdown");
  const btn = $("sortBtn");
  const menu = $("sortMenu");
  btn.addEventListener("click", e => {
    e.stopPropagation();
    dd.classList.toggle("open");
  });
  menu.querySelectorAll("button").forEach(b => {
    b.addEventListener("click", () => {
      sortMode = b.dataset.sort;
      btn.textContent =
        sortMode === "priceAsc" ? "Цена ↑" :
        sortMode === "priceDesc" ? "Цена ↓" :
        sortMode === "name" ? "По названию" :
        "Сортировка ▾";
      dd.classList.remove("open");
      render();
    });
  });
  document.addEventListener("click", () => dd.classList.remove("open"));
})();

// --- Корзина
function toggleCart() {
  const o = $("cartOverlay");
  o.style.display = o.style.display === "flex" ? "none" : "flex";
  renderCart();
}

function addToCart(i) {
  const p = products[i];
  cart.push({ ...p });
  $("cartCount").textContent = cart.length;
  renderCart();

  const cartBtn = document.getElementById("cartBtn");
  cartBtn.classList.add("pulse");
  setTimeout(() => cartBtn.classList.remove("pulse"), 400);
  saveState();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  $("cartCount").textContent = cart.length;
  renderCart();
  saveState();
}

function clearCart() {
  cart = [];
  $("cartCount").textContent = 0;
  renderCart();
  saveState(); 
}

function renderCart() {
  const box = $("cartItems");
  box.innerHTML = "";
  let total = 0;
  cart.forEach((p, i) => {
    total += p.price;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${p.img}" alt="">
      <div style="flex:1">
        <div style="font-weight:600">${p.displayName || p.name}</div>
        <div>${fmt(p.price)} MDL</div>
      </div>
      <button class="btn btn-danger" onclick="removeFromCart(${i})">✖</button>
    `;
    box.appendChild(row);
  });
  $("totalPrice").textContent = fmt(total);
}

// --- Модалка товара
let modalState = { index: null, colorIdx: 0, memIdx: 0 };

function openProduct(i) {
  modalState = { index: i, colorIdx: 0, memIdx: 0 };
  const p = products[i];

  $("modalTitle").textContent = p.name;
  $("modalSpecs").innerHTML = p.specs.map(s => `<li>• ${s}</li>`).join("");
  $("modalPrice").textContent = fmt(p.price) + " MDL";
  $("modalImg").src = p.img;

  const colorBox = $("colorOptions");
  colorBox.innerHTML = "";
  if (p.colors?.length) {
    p.colors.forEach((c, ci) => {
      const chip = document.createElement("div");
      chip.className = "color-chip" + (ci === 0 ? " active" : "");
      chip.style.backgroundColor = c.color;
      chip.title = c.name;
      chip.onclick = () => {
        colorBox.querySelectorAll(".color-chip").forEach(x => x.classList.remove("active"));
        chip.classList.add("active");
        modalState.colorIdx = ci;
        $("modalImg").src = c.img || p.img;
      };
      colorBox.appendChild(chip);
    });
  }

  const memBox = $("memoryOptions");
  memBox.innerHTML = "";
  const memory = p.memory?.length ? p.memory : [{ size: "Базовый", price: p.price }];
  memory.forEach((m, mi) => {
    const b = document.createElement("button");
    b.className = "mem-btn" + (mi === 0 ? " active" : "");
    b.textContent = m.size;
    b.onclick = () => {
      memBox.querySelectorAll(".mem-btn").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      modalState.memIdx = mi;
      $("modalPrice").textContent = fmt(memory[mi].price) + " MDL";
    };
    memBox.appendChild(b);
  });

  $("modalAddToCart").onclick = () => {
    const c = p.colors?.[modalState.colorIdx];
    const m = memory[modalState.memIdx];
    const price = m.price ?? p.price;
    const name = `${p.name}${c ? ` (${c.name}` : ""}${m ? `${c ? ", " : " ("}${m.size}` : ""}${(c || m) ? ")" : ""}`;
    cart.push({ ...p, price, displayName: name, img: c?.img || p.img });
    $("cartCount").textContent = cart.length;
    renderCart();
    closeModal();
    showToast("✅ Товар добавлен в корзину!", "success");
  };
const favBtn = document.getElementById("modalAddToFav");
const isFav = favorites.find(f => f.name === p.name);
if (isFav) {
  favBtn.classList.add("active");
  favBtn.textContent = "⭐ В избранном";
} else {
  favBtn.classList.remove("active");
  favBtn.textContent = "⭐ В избранное";
}

  $("productModal").style.display = "flex";
}


function toggleModalFavorite() {
  const i = modalState.index;
  const p = products[i];
  const favBtn = document.getElementById("modalAddToFav");
  const existing = favorites.find(f => f.name === p.name);

  if (!existing) {
    favorites.push(p);
    favBtn.classList.add("active");
    favBtn.textContent = "⭐ В избранном";
    showToast("💚 Добавлено в избранное!", "success");
  } else {
    favorites = favorites.filter(f => f.name !== p.name);
    favBtn.classList.remove("active");
    favBtn.textContent = "⭐ В избранное";
    showToast("💔 Удалено из избранного", "info");
  }

  document.getElementById("favCount").textContent = favorites.length;
  render();
}


function closeModal() { $("productModal").style.display = "none"; }

// --- Оформление заказа
function placeOrder() {
  if (!cart.length) return showToast("🛒 Корзина пуста!", "info");
  $("orderOverlay").style.display = "flex";
}
function closeOrder() { $("orderOverlay").style.display = "none"; }
function overlayClick(e) { if (e.target.classList.contains("overlay")) e.target.style.display = "none"; }

// --- Уведомления
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut 0.4s ease forwards";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// === Категории ===
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    currentPage = 1;
    render();
  });
});

// === Домой ===
function goHome() {
  document.querySelectorAll('.overlay').forEach(el => el.style.display = 'none');
  query = "";
  sortMode = "default";
  activeCategory = "all"; 
  $("searchInput").value = "";
  currentPage = 1;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("🏠 Возврат на главную страницу", "info");
}

// === Переключение страниц (исправлено) ===
function showPage(page) {
  const main = document.querySelector("main");
  const catalog = document.querySelector(".catalog");
  const headerBottom = document.querySelector(".header-bottom");
  const searchWrap = document.querySelector(".search-wrap");

  // Скрываем все страницы
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");

  if (page === "shop") {
    if (main) main.style.display = "block";
    if (catalog) catalog.style.display = "flex";
    if (headerBottom) headerBottom.style.display = "flex";
    if (searchWrap) searchWrap.style.display = "flex";
  } else {
    if (main) main.style.display = "none";
    if (catalog) catalog.style.display = "none";
    if (headerBottom) headerBottom.style.display = "none";
    if (searchWrap) searchWrap.style.display = "none";
  }

  // 🔹 Показываем нужную страницу
  const currentPage = document.getElementById(`page-${page}`);
  if (currentPage) currentPage.style.display = "block";

  // 🔹 Специальные случаи
  if (page === "orders") renderOrders();
  if (page === "profile") renderProfile();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// === Бургер-меню ===
function toggleMenu() {
  const nav = document.querySelector('.top-nav');
  nav.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
  // 🔹 Загружаем сохранённые данные
  const savedCart = localStorage.getItem("cart");
  const savedFav = localStorage.getItem("favorites");

  if (savedCart) cart = JSON.parse(savedCart);
  if (savedFav) favorites = JSON.parse(savedFav);

  $("cartCount").textContent = cart.length;
  $("favCount").textContent = favorites.length;
  render();
  showPage("shop");

  const nav = document.querySelector('.top-nav');
  const burger = document.querySelector('.burger');

  document.querySelectorAll('.top-nav .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => nav.classList.remove('active'));
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('active');
    }
  });

  // Центрируем сортировку и корзину
  const headerBottom = document.querySelector(".header-bottom");
  if (headerBottom) {
    headerBottom.style.justifyContent = "center";
    headerBottom.style.gap = "12px";
  }
});

// === 📜 История заказов ===
let orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");

function saveOrderHistory() {
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
}

function renderOrders() {
  const box = document.getElementById("ordersList");
  box.innerHTML = "";

  if (!orderHistory.length) {
    box.innerHTML = "<p>Пока нет оформленных заказов 🛍</p>";
    return;
  }

  orderHistory
    .slice()
    .reverse()
    .forEach((order, i) => {
      const div = document.createElement("div");
      div.className = "order-card";
      const items = order.items.map(x => `• ${x}`).join("<br>");
      div.innerHTML = `
        <h3>Заказ №${i + 1}</h3>
        <p><b>Дата:</b> ${order.date}</p>
        <p><b>Имя:</b> ${order.name}</p>
        <p><b>Телефон:</b> ${order.phone}</p>
        <p><b>Товары:</b><br>${items}</p>
        <p><b>Сумма:</b> ${order.total} MDL</p>
      `;
      box.appendChild(div);
    });
}

// === 🌗 Переключение темы (ночная ↔ дневная) ===
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    root.classList.add("light-theme");
    themeBtn.textContent = "🌞";
  } else {
    themeBtn.textContent = "🌙";
  }

  themeBtn.addEventListener("click", () => {
    root.classList.toggle("light-theme");
    const isLight = root.classList.contains("light-theme");
    themeBtn.textContent = isLight ? "🌞" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});


// === 📦 Отправка заказа в Telegram ===
async function sendOrder() {
  const name = $("orderName").value.trim();
  const phone = $("orderPhone").value.trim();
  const comment = $("orderComment").value.trim();

  if (!currentUser) {
    $("cartOverlay").style.display = "none";
    $("orderOverlay").style.display = "none";
    showToast("🔒 Войдите в аккаунт, чтобы оформить заказ!", "error");
    showPage("account");
    return;
  }

  if (!name || !phone) {
    showToast("⚠️ Введите имя и телефон!", "error");
    return;
  }

  if (!cart.length) {
    showToast("🛒 Корзина пуста!", "info");
    return;
  }

  const itemsText = cart
    .map((p, i) => `${i + 1}. ${p.displayName || p.name} — ${fmt(p.price)} MDL`)
    .join("\n");

  const text = `
🧾 <b>Новый заказ PrimeDevices.pmr</b>\n
👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || "—"}
━━━━━━━━━━━━━━━
${itemsText}
━━━━━━━━━━━━━━━
💰 Итого: ${$("totalPrice").textContent} MDL
`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML"
      })
    });

    const data = await res.json();

    if (res.ok && data.ok) {
      const orderData = {
        date: new Date().toLocaleString(),
        name,
        phone,
        comment,
        items: cart.map(p => p.displayName || p.name),
        total: $("totalPrice").textContent
      };
      orderHistory.push(orderData);
      saveOrderHistory();

      showToast("✅ Заказ успешно отправлен!", "success");
      $("orderOverlay").style.display = "none";
      cart = [];
      $("cartCount").textContent = 0;
      renderCart();
      saveState();
    } else {
      console.error("Ошибка Telegram:", data);
      showToast("⚠️ Ошибка при отправке заказа!", "error");
    }
  } catch (err) {
    console.error("Ошибка сети:", err);
    
  }
}




// 📸 Предпросмотр фото
function previewReviewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    tempReviewPhoto = ev.target.result;
    $("reviewPreview").innerHTML = `
      <img src="${tempReviewPhoto}" alt="Фото отзыва" 
           style="max-width:150px; border-radius:10px; margin-top:8px; border:2px solid var(--accent);">
    `;
  };
  reader.readAsDataURL(file);
}

// 📝 Добавление нового отзыва
function addReview() {
  const name = $("reviewName").value.trim();
  const text = $("reviewText").value.trim();

  if (!name || !text) {
    showToast("⚠️ Заполните имя и текст!", "error");
    return;
  }

  // проверка на вход
  if (!currentUser) {
    showToast("🔒 Войдите в аккаунт, чтобы оставить отзыв!", "error");
    showPage("account");
    return;
  }

  const newReview = {
    name,
    text,
    email: currentUser.email,
    date: new Date().toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }),
    photo: tempReviewPhoto || null
  };

  reviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  $("reviewName").value = "";
  $("reviewText").value = "";
  $("reviewPhoto").value = "";
  $("reviewPreview").innerHTML = "";
  tempReviewPhoto = null;

  showToast("✅ Спасибо за отзыв!", "success");
  renderReviews();
}


// 📋 Отображение отзывов
function renderReviews() {
  const box = $("reviewsList");
  box.innerHTML = "";

  if (!reviews.length) {
    box.innerHTML = "<p>Пока нет отзывов. Будьте первым, кто поделится впечатлением! 🌟</p>";
    return;
  }

  reviews.forEach((r, i) => {
    const card = document.createElement("div");
    card.className = "review-card";

    const canDelete = currentUser && currentUser.email === r.email;
    const deleteBtn = canDelete
      ? `<button class="btn btn-danger" style="margin-top:10px;" onclick="deleteReview(${i})">🗑 Удалить</button>`
      : "";

    card.innerHTML = `
      <p><b>${r.name}</b> <span style="opacity:0.7;">(${r.date})</span></p>
      <p>${r.text}</p>
      ${r.photo ? `<img src="${r.photo}" alt="Фото отзыва"
        style="max-width:150px; border-radius:10px; margin-top:8px; border:2px solid var(--accent);">` : ""}
      ${deleteBtn}
    `;
    box.prepend(card); // вставляем сверху, чтобы свежие были первыми
  });
}

function deleteReview(index) {
  if (!currentUser) return showToast("⚠️ Вы не вошли в аккаунт!", "error");

  const review = reviews[index];
  if (review.email !== currentUser.email) {
    showToast("🚫 Можно удалить только свой отзыв!", "error");
    return;
  }

  if (!confirm("Удалить этот отзыв?")) return;

  reviews.splice(index, 1);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  showToast("🗑 Отзыв удалён!", "success");
  renderReviews();
}

// ⏳ Загружаем отзывы при открытии страницы
document.addEventListener("DOMContentLoaded", renderReviews);


// === 🔐 Авторизация / Регистрация ===
function toggleAuth(mode) {
  $("loginBox").style.display = mode === "login" ? "block" : "none";
  $("registerBox").style.display = mode === "register" ? "block" : "none";
}

function registerUser() {
  users = JSON.parse(localStorage.getItem("users") || "[]");

  const name = $("regName").value.trim();
  const email = $("regEmail").value.trim().toLowerCase();
  const pass = $("regPass").value.trim();

  if (!name || !email || !pass) return showToast("⚠️ Заполните все поля!", "error");

  const exists = users.some(u => u.email === email);
  if (exists) return showToast("❌ Такой email уже зарегистрирован!", "error");

  const newUser = { name, email, pass };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  showToast("✅ Аккаунт успешно создан!", "success");
  toggleAuth("login");
}

function loginUser() {
  const email = $("loginEmail").value.trim().toLowerCase();
  const pass = $("loginPass").value.trim();
  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) return showToast("❌ Неверный email или пароль!", "error");

  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
  renderAccount();
  showToast(`👋 Добро пожаловать, ${user.name}!`, "success");
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  renderAccount();
  showToast("🚪 Вы вышли из аккаунта", "info");
}

// === 👤 Интерфейс профиля ===
function renderAccount() {
  if (currentUser) {
    $("loginBox").style.display = "none";
    $("registerBox").style.display = "none";
    $("userPanel").style.display = "block";
    $("userName").textContent = currentUser.name;
    loadAvatar();
  } else {
    $("loginBox").style.display = "block";
    $("registerBox").style.display = "none";
    $("userPanel").style.display = "none";
  }
}

// === 🧍 Аватар ===
function loadAvatar() {
  if (!currentUser) return;
  const avatarKey = `avatar_${currentUser.email}`;
  const saved = localStorage.getItem(avatarKey);
  $("userAvatar").src = saved || `https://dummyimage.com/200x200/1c79ff/ffffff&text=${currentUser.name.charAt(0).toUpperCase()}`;
}

function changeAvatar(e) {
  const file = e.target.files[0];
  if (!file || !currentUser) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const avatarKey = `avatar_${currentUser.email}`;
    localStorage.setItem(avatarKey, ev.target.result);
    $("userAvatar").src = ev.target.result;
    showToast("✅ Фото обновлено!");
  };
  reader.readAsDataURL(file);
}

// === ✏️ Редактирование имени ===
function toggleEdit() {
  tempAvatar = null;
  const box = $("editProfileBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function cancelEdit() {
  $("editProfileBox").style.display = "none";
}
function saveProfile() {
  const newName = $("editName").value.trim();
  if (!newName) return showToast("⚠️ Введите новое имя!", "error");

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users = users.map(u => (u.email === currentUser.email ? { ...u, name: newName } : u));
  localStorage.setItem("users", JSON.stringify(users));

  currentUser.name = newName;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  $("userName").textContent = newName;
  $("editProfileBox").style.display = "none";
  showToast("✅ Имя успешно обновлено!");
}

// === 🗑 Удаление аккаунта ===
function deleteAccount() {
  if (!currentUser) return showToast("⚠️ Вы не вошли!", "error");
  if (!confirm(`Удалить аккаунт ${currentUser.email}?`)) return;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users = users.filter(u => u.email !== currentUser.email);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem(`avatar_${currentUser.email}`);
  localStorage.removeItem("currentUser");
  currentUser = null;

  showToast("🗑 Аккаунт удалён!");
  renderAccount();
  toggleAuth("register");
}


// === 🧍 АВАТАР + РЕДАКТИРОВАНИЕ ПРОФИЛЯ ===

function loadAvatar() {
  const avatar = $("userAvatar");
  if (!currentUser || !avatar) return;

  const avatarKey = `avatar_${currentUser.email}`;
  const saved = localStorage.getItem(avatarKey);

  if (saved) {
    avatar.src = saved;
  } else if (currentUser.name) {
    const letter = currentUser.name.charAt(0).toUpperCase();
    avatar.src = `https://dummyimage.com/200x200/1c79ff/ffffff&text=${letter}`;
  } else {
    avatar.src = `https://dummyimage.com/200x200/1c79ff/ffffff&text=?`;
  }
}


let tempAvatar = null; // временное фото

function changeAvatar(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    tempAvatar = ev.target.result; // сохраняем временно
    $("userAvatar").src = tempAvatar; // показываем пользователю
    showToast("📷 Фото выбрано, нажмите «Сохранить» для подтверждения", "info");
  };
  reader.readAsDataURL(file);
}




// показать / скрыть форму редактирования
function toggleEdit() {
  const box = $("editProfileBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

// отмена
function cancelEdit() {
  $("editProfileBox").style.display = "none";
}

function saveProfile() {
  const newName = $("editName").value.trim();

  if (!newName && !tempAvatar) {
    showToast("⚠️ Ничего не изменено!", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users = users.map(u => {
    if (u.email === currentUser.email) {
      return { ...u, name: newName || u.name };
    }
    return u;
  });
  localStorage.setItem("users", JSON.stringify(users));

  if (newName) {
    currentUser.name = newName;
    $("userName").textContent = newName;
  }

  // ✅ Сохраняем фото только при нажатии "Сохранить"
  if (tempAvatar) {
    const avatarKey = `avatar_${currentUser.email}`;
    localStorage.setItem(avatarKey, tempAvatar);
    $("userAvatar").src = tempAvatar;
    tempAvatar = null; // очищаем временное фото
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  $("editProfileBox").style.display = "none";
  showToast("✅ Изменения сохранены!");
}




// при загрузке страницы
document.addEventListener("DOMContentLoaded", loadAvatar);

// === 🔐 Назначение администратора (только для главного админа) ===
function makeAdmin(targetEmail) {
  if (!isMainAdmin()) {
    showToast("🚫 Только главный администратор может назначать админов!", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === targetEmail);

  if (!user) {
    showToast("❌ Пользователь с таким email не найден!", "error");
    return;
  }

  user.role = "admin";
  localStorage.setItem("users", JSON.stringify(users));
  showToast(`✅ ${user.name} теперь администратор!`);
}
