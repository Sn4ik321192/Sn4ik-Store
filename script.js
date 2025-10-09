// --- Настройки
const TELEGRAM_TOKEN = "8060002374:AAGZ1B6fQutNTMMS22wOkgCH_defGVS8KVE";
const TELEGRAM_CHAT_ID = "6509764945";

// --- Состояния
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
      { "name": "Серебристый", "color": "#dcdcdc", "img": "img/macbookpro16m3.webp" },
      { "name": "Чёрный", "color": "#111", "img": "img/macbookpro16m3black.png" }
    ]
  },
  {
    "name": "MacBook Air 15″ M3",
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
  if (query) list = list.filter(p => p.name.toLowerCase().includes(query));
  if (sortMode === "priceAsc") list.sort((a, b) => a.price - b.price);
  if (sortMode === "priceDesc") list.sort((a, b) => b.price - a.price);
  if (sortMode === "name") list.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  return list;
}

// --- Рендер товаров
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
      <img src="${p.img}" alt="${p.name}" onclick="openProduct(${idx})">
      <h3>${p.name}</h3>
      <p class="price">${fmt(p.price)} ₽</p>
      <button class="btn btn-primary" onclick="addToCart(${idx})">Добавить</button>
    `;
    list.appendChild(card);
  });
  renderPagination(totalPages);
}
render();

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
  cart.push({...p});
  $("cartCount").textContent = cart.length;
  renderCart();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  $("cartCount").textContent = cart.length;
  renderCart();
}

function clearCart() {
  cart = [];
  $("cartCount").textContent = 0;
  renderCart();
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

// --- Модалка товара (цвет + память)
let modalState = { index: null, colorIdx: 0, memIdx: 0 };

function openProduct(i) {
  modalState = { index: i, colorIdx: 0, memIdx: 0 };
  const p = products[i];

  $("modalTitle").textContent = p.name;
  $("modalSpecs").innerHTML = p.specs.map(s => `<li>• ${s}</li>`).join("");
  $("modalPrice").textContent = fmt(p.memory?.[0]?.price ?? p.price) + " ₽";
  $("modalImg").src = p.colors?.[0]?.img || p.img;

  // Цвета
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

  // Память
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
  };

  $("productModal").style.display = "flex";
}

function closeModal() { $("productModal").style.display = "none"; }

// --- Оформление заказа
function placeOrder() {
  if (!cart.length) return alert("Корзина пуста 😅");
  $("orderOverlay").style.display = "flex";
}
function closeOrder() { $("orderOverlay").style.display = "none"; }
function overlayClick(e) { if (e.target.classList.contains("overlay")) e.target.style.display = "none"; }

function sendOrder() {
  const name = $("orderName").value.trim();
  const phone = $("orderPhone").value.trim();
  const comment = $("orderComment").value.trim();
  if (!name || !phone) return alert("Введите имя и номер телефона!");

  const summary = cart.map(p => `• ${p.displayName || p.name} — ${fmt(p.price)} ₽`).join("\n");
  const total = fmt(cart.reduce((s, p) => s + p.price, 0));
  const msg =
`🛍 Новый заказ в Sn4ik-Store
👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || "—"}

${summary}

💰 Итого: ${total} ₽`;

  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg })
  })
  .then(r => r.json())
  .then(d => {
    if (d.ok) {
      alert("✅ Заказ отправлен!");
      clearCart();
      closeOrder();
      toggleCart();
    } else alert("⚠️ Ошибка Telegram.");
  })
  .catch(() => alert("⚠️ Ошибка соединения с Telegram."));
}
