/* ============ Sn4ik-Store — основной скрипт ============ */

// --- Настройки
const ADMIN_PASSWORD = "Alex2307";
const TELEGRAM_TOKEN = "8060002374:AAGZ1B6fQutNTMMS22wOkgCH_defGVS8KVE";
const TELEGRAM_CHAT_ID = "6509764945";

// --- Состояния
let admin = false;
let cart = [];
let currentPage = 1;
const perPage = 6;
let sortMode = "default";
let query = "";

// --- Данные (по умолчанию)
let products = [
  {
  "name": "iPhone 16 Pro Max",
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
    "price": 389990,
    "img": "img/macbookpro16m3.webp",
    "specs": ["Чип M3 Max", "Дисплей 16.2″ Liquid Retina XDR", "32 ГБ RAM", "1 ТБ SSD", "Touch ID"],
    "memory": [
      { "size": "1 ТБ", "price": 389990 },
      { "size": "2 ТБ", "price": 429990 }
    ],
    "colors": [
      { "name": "Серебристый", "color": "#dcdcdc", "img": "img/macbookprosilver.webp" },
      { "name": "Чёрный", "color": "#111", "img": "img/macbookproblack.webp" }
    ]
  },
  {
    "name": "MacBook Air 15″ M3",
    "price": 259990,
    "img": "img/macbookair15m3.webp",
    "specs": ["Чип M3", "Дисплей 15.3″ Retina", "8 ГБ RAM", "256 ГБ SSD", "FaceTime HD"],
    "memory": [
      { "size": "256 ГБ", "price": 259990 },
      { "size": "512 ГБ", "price": 289990 }
    ],
    "colors": [
      { "name": "Синий", "color": "#223355", "img": "img/macbookairblue.webp" },
      { "name": "Золотой", "color": "#e8cfa8", "img": "img/macbookairgold.webp" }
    ]
  },
  {
    "name": "MacBook Pro 14″ M2 Pro",
    "price": 299990,
    "img": "img/macbookpro14m2.webp",
    "specs": ["Чип M2 Pro", "Дисплей 14.2″ Retina XDR", "16 ГБ RAM", "512 ГБ SSD"],
    "memory": [
      { "size": "512 ГБ", "price": 299990 },
      { "size": "1 ТБ", "price": 339990 }
    ],
    "colors": [
      { "name": "Серый космос", "color": "#333", "img": "img/macbookprogray.webp" }
    ]
  },
  {
    "name": "iPad Pro 13″ M4",
    "price": 189990,
    "img": "img/ipadpro13m4.webp",
    "specs": ["Чип M4", "Дисплей 13″ OLED", "Face ID", "120 Гц", "Thunderbolt 4"],
    "memory": [
      { "size": "256 ГБ", "price": 189990 },
      { "size": "512 ГБ", "price": 209990 }
    ],
    "colors": [
      { "name": "Серебристый", "color": "#ddd", "img": "img/ipadprosilver.webp" },
      { "name": "Серый космос", "color": "#333", "img": "img/ipadprogray.webp" }
    ]
  },
  {
    "name": "iPad Air 6 (M2)",
    "price": 129990,
    "img": "img/ipadair6.webp",
    "specs": ["Чип M2", "Дисплей 11″ Liquid Retina", "Touch ID", "Поддержка Apple Pencil Pro"],
    "memory": [
      { "size": "128 ГБ", "price": 129990 },
      { "size": "256 ГБ", "price": 149990 }
    ],
    "colors": [
      { "name": "Синий", "color": "#1e40af", "img": "img/ipadairblue.webp" },
      { "name": "Фиолетовый", "color": "#8b5cf6", "img": "img/ipadairpurple.webp" }
    ]
  },
  {
    "name": "iPad 10 (2022)",
    "price": 89990,
    "img": "img/ipad10.webp",
    "specs": ["Чип A14 Bionic", "Дисплей 10.9″", "Touch ID", "USB-C"],
    "memory": [
      { "size": "64 ГБ", "price": 89990 },
      { "size": "256 ГБ", "price": 104990 }
    ],
    "colors": [
      { "name": "Жёлтый", "color": "#facc15", "img": "img/ipadyellow.webp" },
      { "name": "Серебристый", "color": "#dcdcdc", "img": "img/ipadsilver.webp" }
    ]
  }
];


// --- Утилиты
const fmt = n => n.toLocaleString("ru-RU");
function $(id) { return document.getElementById(id); }

// --- Отображение товаров
function getFiltered() {
  let list = products.slice();
  if (query) list = list.filter(p => p.name.toLowerCase().includes(query));
  if (sortMode === "priceAsc") list.sort((a, b) => a.price - b.price);
  if (sortMode === "priceDesc") list.sort((a, b) => b.price - a.price);
  if (sortMode === "name") list.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  return list;
}

function render() {
  const list = $("productList");
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
    
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" onclick="showProductModal(${idx})">
      <h3>${p.name}</h3>
      <p class="price">${fmt(p.price)} ₽</p>
      <button class="btn btn-primary" onclick="addToCart(${idx})">Добавить</button>
    `;

    list.appendChild(card);
  });

  renderPagination(totalPages);
}

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
        sortMode === "name" ? "По названию" : "Сортировка ▾";
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
  const product = products[i];
  cart.push(product);
  $("cartCount").textContent = cart.length;
  renderCart();
}

function renderCart() {
  const ul = $("cartItems");
  ul.innerHTML = "";
  let total = 0;
  cart.forEach((p, index) => {
    total += p.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.displayName || p.name} — ${fmt(p.price)} ₽
      <button onclick="removeFromCart(${index})" style="margin-left: 10px; background: var(--danger); border: none; color: white; border-radius: 4px; padding: 2px 6px;">✕</button>
    `;
    ul.appendChild(li);
  });
  $("totalPrice").textContent = fmt(total);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  $("cartCount").textContent = cart.length;
  renderCart();
}

function clearCart() {
  cart = [];
  $("cartCount").textContent = 0;
  renderCart();
}

// --- Модалка товара с цветом и памятью
function showProductModal(i) {
  const product = products[i];
  $("productModal").style.display = "flex";
  
  // Очистка перед заполнением
  $("colorOptions").innerHTML = "";
  $("memorySelect").innerHTML = "";
  
  // Заполняем основную информацию
  $("modalTitle").textContent = product.name;
  $("modalImg").src = product.img;
  $("modalSpecs").innerHTML = product.specs.map(s => `<li>• ${s}</li>`).join("");
  
  // --- ВАРИАНТЫ ЦВЕТА ---
  const colorOptions = $("colorOptions");
  if (product.colors && product.colors.length > 0) {
    product.colors.forEach((colorObj, index) => {
      const colorSwatch = document.createElement("div");
      colorSwatch.className = "color-swatch" + (index === 0 ? " active" : "");
      colorSwatch.style.backgroundColor = colorObj.color;
      colorSwatch.title = colorObj.name;
      colorSwatch.onclick = () => {
        document.querySelectorAll(".color-swatch").forEach(sw => sw.classList.remove("active"));
        colorSwatch.classList.add("active");
        if (colorObj.img) {
          $("modalImg").src = colorObj.img;
        }
      };
      colorOptions.appendChild(colorSwatch);
    });
  } else {
    colorOptions.innerHTML = '<div style="color: var(--muted);">Нет вариантов цвета</div>';
  }
  
  // --- ВАРИАНТЫ ПАМЯТИ ---
  const memoryBox = $("memorySelect");
  if (product.memory && product.memory.length > 0) {
    const memoryList = document.createElement("div");
    memoryList.className = "custom-select";

    const selected = document.createElement("div");
    selected.className = "select-selected";
    selected.textContent = `${product.memory[0].size} — ${fmt(product.memory[0].price)} ₽`;

    const items = document.createElement("div");
    items.className = "select-items select-hide";

    product.memory.forEach((mem, index) => {
      const item = document.createElement("div");
      item.textContent = `${mem.size} — ${fmt(mem.price)} ₽`;
      item.onclick = () => {
        selected.textContent = item.textContent;
        $("modalPrice").textContent = `${fmt(mem.price)} ₽`;
        items.classList.add("select-hide");
        selected.classList.remove("active");
        memoryBox.dataset.selectedPrice = mem.price;
        memoryBox.dataset.selectedSize = mem.size;
      };
      items.appendChild(item);
    });

    memoryList.appendChild(selected);
    memoryList.appendChild(items);
    memoryBox.appendChild(memoryList);

    memoryBox.dataset.selectedPrice = product.memory[0].price;
    memoryBox.dataset.selectedSize = product.memory[0].size;
    $("modalPrice").textContent = `${fmt(product.memory[0].price)} ₽`;

    selected.onclick = (e) => {
      e.stopPropagation();
      items.classList.toggle("select-hide");
      selected.classList.toggle("active");
    };

    document.addEventListener("click", () => {
      items.classList.add("select-hide");
      selected.classList.remove("active");
    });

  } else {
    memoryBox.innerHTML = `<div style="color: var(--muted);">${fmt(product.price)} ₽</div>`;
    memoryBox.dataset.selectedPrice = product.price;
    memoryBox.dataset.selectedSize = "Базовый";
    $("modalPrice").textContent = `${fmt(product.price)} ₽`;
  }

  // --- КНОПКА ДОБАВЛЕНИЯ В КОРЗИНУ ---
  $("modalAddToCart").onclick = () => {
    const selectedPrice = +memoryBox.dataset.selectedPrice;
    const selectedSize = memoryBox.dataset.selectedSize;
    const selectedColor = document.querySelector(".color-swatch.active")?.title || "Стандартный";
    
    const cartProduct = {
      ...product,
      price: selectedPrice,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
      displayName: `${product.name} (${selectedColor}, ${selectedSize})`
    };
    
    cart.push(cartProduct);
    $("cartCount").textContent = cart.length;
    renderCart();
    closeModal();
    
    $("cartBtn").classList.add("cart-pulse");
    setTimeout(() => $("cartBtn").classList.remove("cart-pulse"), 400);
  };
}

function closeModal() {
  $("productModal").style.display = "none";
}

// --- Оформление заказа
function placeOrder() {
  if (!cart.length) return alert("Корзина пуста 😅");
  $("orderOverlay").style.display = "flex";
}

function closeOrder() {
  $("orderOverlay").style.display = "none";
}

function sendOrder() {
  const name = $("orderName").value.trim();
  const phone = $("orderPhone").value.trim();
  const comment = $("orderComment").value.trim();
  if (!name || !phone) return alert("Введите имя и номер телефона!");

  const summary = cart.map(p => `• ${p.displayName || p.name} — ${fmt(p.price)} ₽`).join("\n");
  const total = fmt(cart.reduce((s, p) => s + p.price, 0));
  const message = `🛍 Новый заказ в Sn4ik-Store\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Комментарий: ${comment || "—"}\n\n${summary}\n\n💰 Итого: ${total} ₽`;

  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
  })
    .then(r => r.json())
    .then(d => {
      if (d.ok) {
        closeOrder();
        clearCart();
        toggleCart();
        alert("✅ Заказ успешно оформлен!");
      } else alert("⚠️ Ошибка отправки в Telegram.");
    })
    .catch(() => alert("⚠️ Ошибка соединения с Telegram"));
}

// --- Админ (только для экспорта)
function adminLogin() {
  const pass = prompt("Введите пароль администратора:");
  if (pass === ADMIN_PASSWORD) {
    admin = true;
    alert("✅ Админ-режим активен (только экспорт)");
    $("exportBtn").style.display = "inline-block";
    $("logoutBtn").style.display = "inline-block";
    $("adminLoginBtn").style.display = "none";
  } else alert("❌ Неверный пароль");
}

function logoutAdmin() {
  admin = false;
  alert("🚪 Вы вышли из админ-режима");
  $("logoutBtn").style.display = "none";
  $("exportBtn").style.display = "none";
  $("adminLoginBtn").style.display = "inline-block";
}

// --- Alt + A (вход в админку)
document.addEventListener("keydown", e => {
  if (e.altKey && e.code === "KeyA") {
    const b = $("adminLoginBtn");
    if (getComputedStyle(b).display === "none") {
      b.style.display = "inline-block";
      setTimeout(() => b.classList.add("show"), 10);
    } else {
      b.classList.remove("show");
      setTimeout(() => (b.style.display = "none"), 300);
    }
  }
});

// --- Оверлеи
function overlayClick(ev) {
  if (ev.target.classList.contains("overlay")) ev.target.style.display = "none";
}

// --- Экспорт
function exportProducts() {
  if (!admin) return alert("Только админ может экспортировать товары!");
  const dataStr = JSON.stringify(products, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "products.json";
  a.click();
  URL.revokeObjectURL(url);
  alert("✅ Файл products.json сохранён!");
}

// --- Запуск
render();
