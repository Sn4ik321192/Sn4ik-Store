// --- Настройки
const TELEGRAM_TOKEN = "8060002374:AAGZ1B6fQutNTMMS22wOkgCH_defGVS8KVE";
const TELEGRAM_CHAT_ID = "6509764945";

// --- Состояния
let cart = [];
let favorites = [];

// === Сохранение состояния корзины и избранного ===
function saveState() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

let currentPage = 1;
const perPage = 6;
let sortMode = "default";

let query = "";

let activeCategory = "all";

// --- Данные (по умолчанию)
let products = [
  {
  "name": "iPhone 16 Pro Max",
  "category": "iphone",
  "price": 199990,
  "img": "img/iphone16problack.webp",
  "specs": ["Чип A18 Pro", "Дисплей 6.9″ 120 Гц", "Титан", "Камера 48 МП", "Батарея 5000 мАч"],
  "memory": [
    { "size": "256 ГБ", "price": 199990 },
    { "size": "512 ГБ", "price": 229990 },
    { "size": "1 ТБ", "price": 259990 }
  ],
  "colors": [
    { "name": "Черный титан", "color": "#212329", "img": "img/iphone16problack.webp" },
    { "name": "Натуральный титан", "color": "#b6b1a9", "img":"img/iphone16pronatural.png" },
    { "name": "Белый титан", "color": "#f4f4f4", "img": "img/iphone16prowhiе.png" }
  ]
},
  {
    "name": "iPhone 16 Pro",
    "category": "iphone",
    "price": 154990,
    "img": "img/iphone16problack.webp",
    "specs": ["Чип A18 Pro", "Дисплей 6.3″ 120 Гц", "Титан", "Камера 48 МП", "Батарея 4500 мАч"],
    "memory": [
      { "size": "128 ГБ", "price": 154990 },
      { "size": "256 ГБ", "price": 169990 },
      { "size": "512 ГБ", "price": 199990 }
    ],
    "colors": [
      { "name": "Черный титан", "color": "#212329", "img": "img/iphone16problack.webp" },
    { "name": "Натуральный титан", "color": "#b6b1a9", "img":"img/iphone16pronatural.png" },
    { "name": "Белый титан", "color": "#f4f4f4", "img": "img/iphone16prowhiе.png" }
    ]
  },
  {
    "name": "iPhone 16",
    "category": "iphone",
    "price": 119990,
    "img": "img/iphone16gren.png",
    "specs": ["Чип A18", "Дисплей 6.1″ 90 Гц", "Алюминий", "Камера 48 МП", "Батарея 4800 мАч"],
    "memory": [
      { "size": "128 ГБ", "price": 119990 },
      { "size": "256 ГБ", "price": 134990 }
    ],
    "colors": [
      { "name": "Черный", "color": "#000", "img": "img/iphone16gren.png" },
      { "name": "Синий", "color": "#1e3a8a", "img": "img/iphone16blue.png" }
    ]
  },
  {
    "name": "MacBook Pro 16″ M3 Max",
    "category": "macbook",
    "price": 389990,
    "img": "img/macbookpro16m3.webp",
    "specs": ["Чип M3 Max", "Дисплей 16.2″ Liquid Retina XDR", "32 ГБ RAM", "1 ТБ SSD", "Touch ID"],
    "memory": [
      { "size": "1 ТБ", "price": 389990 },
      { "size": "2 ТБ", "price": 429990 }
    ],
    "colors": [
      { "name": "Серебристый", "color": "#dcdcdc", "img": "img/macbookpro16m3.webp" },
      { "name": "Чёрный", "color": "#111", "img": "img/macbookpro16m3black.png" }
    ]
  },
  {
    "name": "MacBook Air 15″ M3",
    "category": "macbook",
    "price": 259990,
    "img": "img/apple-macbook-air-15-2025-mw1l3-midnight-xstore-md-no-bg-preview (carve.photos).png",
    "specs": ["Чип M3", "Дисплей 15.3″ Retina", "8 ГБ RAM", "256 ГБ SSD", "FaceTime HD"],
    "memory": [
      { "size": "256 ГБ", "price": 259990 },
      { "size": "512 ГБ", "price": 289990 }
    ],
    "colors": [
      { "name": "Синий", "color": "#223355", "img": "img/apple-macbook-air-15-2025-mw1l3-midnight-xstore-md-no-bg-preview (carve.photos).png" },
      { "name": "Золотой", "color": "#e8cfa8", "img": "img/i-no-bg-preview (carve.photos).png" }
    ]
  },
  {
    "name": "MacBook Pro 14″ M2 Pro",
    "category": "macbook",
    "price": 299990,
    "img": "img/ed1ec4ca-cca0-4b29-843f-9b7f9139b5c3.webp",
    "specs": ["Чип M2 Pro", "Дисплей 14.2″ Retina XDR", "16 ГБ RAM", "512 ГБ SSD"],
    "memory": [
      { "size": "512 ГБ", "price": 299990 },
      { "size": "1 ТБ", "price": 339990 }
    ],
    "colors": [
      { "name": "Серый космос", "color": "#333", "img": "img/ed1ec4ca-cca0-4b29-843f-9b7f9139b5c3.webp" }
    ]
  },
  {
    "name": "iPad Pro 13″ M4",
    "category": "ipad",
    "price": 189990,
    "img": "img/Apple-iPad-Pro-13-2024-MVX33NFA--1--no-bg-preview (carve.photos).png",
    "specs": ["Чип M4", "Дисплей 13″ OLED", "Face ID", "120 Гц", "Thunderbolt 4"],
    "memory": [
      { "size": "256 ГБ", "price": 189990 },
      { "size": "512 ГБ", "price": 209990 }
    ],
    "colors": [
      { "name": "Серебристый", "color": "#ddd", "img": "img/Apple-iPad-Pro-13-2024-MVX33NFA--1--no-bg-preview (carve.photos).png" },
      { "name": "Серый космос", "color": "#333", "img": "img/apple-ipad-pro-13-2024-mvx43-xstore-md-56-no-bg-preview (carve.photos).png" }
    ]
  },
  {
    "name": "iPad Air 6 (M2)",
    "category": "ipad",
    "price": 129990,
    "img": "img/1-no-bg-preview (carve.photos).png",
    "specs": ["Чип M2", "Дисплей 11″ Liquid Retina", "Touch ID", "Поддержка Apple Pencil Pro"],
    "memory": [
      { "size": "128 ГБ", "price": 129990 },
      { "size": "256 ГБ", "price": 149990 }
    ],
    "colors": [
      { "name": "Синий", "color": "#1e40af", "img": "img/1-no-bg-preview (carve.photos).png" },
      { "name": "Фиолетовый", "color": "#b2afb8ff", "img": "img/space 1-450x450-no-bg-preview (carve.photos).png" }
    ]
  },
  {
    "name": "iPad 10 (2022)",
    "category": "ipad",
    "price": 89990,
    "img": "img/1-32-1-no-bg-preview (carve.photos).png",
    "specs": ["Чип A14 Bionic", "Дисплей 10.9″", "Touch ID", "USB-C"],
    "memory": [
      { "size": "64 ГБ", "price": 89990 },
      { "size": "256 ГБ", "price": 104990 }
    ],
    "colors": [
      
      { "name": "Жёлтый", "color": "#facc15", "img": "img/ipad-10-10-9-2022-joltyy-600x600.png" },
      { "name": "Серебристый", "color": "#dcdcdc", "img": "img/1-32-1-no-bg-preview (carve.photos).png" }
    ]
  }
];



// --- Утилиты
const fmt = n => n.toLocaleString("ru-RU");
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
  <p class="price">${fmt(p.price)} ₽</p>
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
        <div>${fmt(p.price)} ₽</div>
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
        <div>${fmt(p.price)} ₽</div>
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
  $("modalPrice").textContent = fmt(p.price) + " ₽";
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
      $("modalPrice").textContent = fmt(memory[mi].price) + " ₽";
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

    const currentPage = document.getElementById(`page-${page}`);
    if (currentPage) currentPage.style.display = "block";
  }

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
// === 🌗 Переключение темы (ночная ↔ дневная) ===
document.addEventListener("DOMContentLoaded", () => {
  // 1. Находим кнопку и корневой элемент
  const themeBtn = document.getElementById("themeToggle");
  const root = document.documentElement; // это <html>

  // 2. Проверяем, сохранена ли тема в localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    // Если ранее была выбрана светлая — включаем её
    root.classList.add("light-theme");
    themeBtn.textContent = "🌞"; // показываем солнце
  } else {
    // Если тёмная (по умолчанию)
    themeBtn.textContent = "🌙";
  }

  // 3. Обработка клика по кнопке
  themeBtn.addEventListener("click", () => {
    // Переключаем класс у <html>
    root.classList.toggle("light-theme");

    // Проверяем, включена ли светлая тема
    const isLight = root.classList.contains("light-theme");

    // Меняем иконку на кнопке
    themeBtn.textContent = isLight ? "🌞" : "🌙";

    // Сохраняем выбор в localStorage
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});


