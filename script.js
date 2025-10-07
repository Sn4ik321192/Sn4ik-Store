let admin = false;
const ADMIN_PASSWORD = "Alex2307";

let products = [
  { name: "IPhone 16 Pro", price: 120000, img: "https://cdn-ultra.esempla.com/storage/webp/2486c908-e555-47df-b9a8-57993939a343.webp", },
  { name: "MacBook Air M3", price: 159990, img: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_13_m3_2024_hero.png", specs: ["Экран 13.6\"", "Чип M3", "8 ГБ RAM", "SSD 256 ГБ"] },
  { name: "iPad Pro M4", price: 149990, img: "https://redstore.by/wp-content/uploads/2024/05/Apple-iPad-Pro-M4-2024-silver-11.png", specs: ["Дисплей 13\"", "Процессор M4", "120 Гц", "Face ID"] },
  { name: "Apple Watch Ultra 2", price: 74990, img: "https://cdn-ultra.esempla.com/storage/webp/bfb8e7b2-fe18-418c-93ad-311c34356135.webp", specs: ["Корпус 49 мм", "Титан", "GPS + LTE", "Аккумулятор 36 ч"] },
  { name: "AirPods Pro 2", price: 29990, img: "https://png.pngtree.com/png-clipart/20230504/ourmid/pngtree-airpods-png-image_7081756.png", specs: ["Активное шумоподавление", "Bluetooth 5.3", "Зарядка MagSafe"] }
];

/* ===========================
   🍏 A-Store JavaScript
   =========================== */

let admin = false;
const ADMIN_PASSWORD = "Alex2307";
const TELEGRAM_TOKEN = "8060002374:AAGZ1B6fQutNTMMS22wOkgCH_defGVS8KVE";
const TELEGRAM_CHAT_ID = "6509764945";

let products = [
  { name: "iPhone 15 Pro", price: 119990, img: "https://www.apple.com/v/iphone-15-pro/h/images/overview/hero_endframe__e0ajd2ayxqq2_large.jpg", specs: ["Дисплей 6.1\"", "A17 Pro", "256 ГБ", "48 МП"] },
  { name: "MacBook Air M3", price: 159990, img: "https://www.apple.com/v/macbook-air-m2/h/images/overview/hero_endframe__ea0qze85eyi6_large.jpg", specs: ["13.6\"", "M3", "8 ГБ RAM", "SSD 256 ГБ"] },
  { name: "iPad Pro M4", price: 149990, img: "https://www.apple.com/v/ipad-pro/h/images/overview/hero__ecv967jz1y0y_large.jpg", specs: ["13\"", "M4", "120 Гц", "Face ID"] },
  { name: "Apple Watch Ultra 2", price: 74990, img: "https://www.apple.com/v/watch-ultra-2/h/images/overview/hero_endframe__e6khcva4hkeq_large.jpg", specs: ["49 мм", "Титан", "WR100", "Сенсоры здоровья"] },
  { name: "AirPods Pro 2", price: 29990, img: "https://www.apple.com/v/airpods-pro/h/images/overview/hero__gnbk5g59t0qe_large.jpg", specs: ["Активное шумоподавление", "Звук H2", "Bluetooth 5.3"] }
];

// === Загрузка сохранённых товаров ===
const saved = localStorage.getItem("products");
if (saved) {
  try {
    products = JSON.parse(saved);
    if (!Array.isArray(products)) throw new Error("Invalid data");
  } catch (err) {
    console.warn("Ошибка при чтении localStorage:", err);
    localStorage.removeItem("products");
  }
}

let cart = [];
let currentPage = 1;
const itemsPerPage = 6;

/* === Отрисовка товаров === */
function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const pageProducts = products.slice(start, start + itemsPerPage);

  pageProducts.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" onclick="showInfo(${start + i})">
      <h3>${p.name}</h3>
      <p>${p.price.toLocaleString()} ₽</p>
      <button onclick="addToCart(${start + i})">Добавить</button>
      <button class="delete-btn" onclick="deleteProduct(${start + i})">✕</button>
    `;
    list.appendChild(div);
  });

  if (admin) document.querySelectorAll(".delete-btn").forEach(b => b.style.display = "block");
  renderPagination();
}
renderProducts();

/* === Пагинация === */
function renderPagination() {
  const total = Math.ceil(products.length / itemsPerPage);
  const pg = document.getElementById("pagination");
  pg.innerHTML = "";
  for (let i = 1; i <= total; i++) {
    const b = document.createElement("button");
    b.textContent = i;
    b.className = "page-btn" + (i === currentPage ? " active" : "");
    b.onclick = () => { currentPage = i; renderProducts(); };
    pg.appendChild(b);
  }
}

/* === Корзина === */
function toggleCart() {
  const o = document.getElementById("cartOverlay");
  o.style.display = o.style.display === "flex" ? "none" : "flex";
  renderCart();
}

function addToCart(i) {
  cart.push(products[i]);
  document.getElementById("cartCount").textContent = cart.length;
  renderCart();
}

function renderCart() {
  const ul = document.getElementById("cartItems");
  ul.innerHTML = "";
  let total = 0;
  cart.forEach(p => {
    total += p.price;
    const li = document.createElement("li");
    li.textContent = `${p.name} — ${p.price.toLocaleString()} ₽`;
    ul.appendChild(li);
  });
  document.getElementById("totalPrice").textContent = total.toLocaleString();
}

function clearCart() {
  cart = [];
  document.getElementById("cartCount").textContent = 0;
  renderCart();
}

/* === Оформление заказа === */
function placeOrder() {
  if (cart.length === 0) return alert("Корзина пуста 😅");

  const name = prompt("Введите ваше имя:");
  if (!name) return alert("Имя обязательно!");

  const phone = prompt("Введите ваш номер телефона:");
  if (!phone) return alert("Номер телефона обязателен!");

  let summary = cart.map(p => `• ${p.name} — ${p.price.toLocaleString()} ₽`).join("\n");
  let total = cart.reduce((s, p) => s + p.price, 0).toLocaleString();

  const message = `🛍 Новый заказ в A-Store\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n\n${summary}\n\n💰 Итого: ${total} ₽`;

  // === Отправка в Telegram ===
  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
  }).then(r => r.json()).then(data => {
    if (data.ok) {
      alert("✅ Заказ оформлен! Мы скоро свяжемся с вами.");
    } else {
      alert("⚠️ Ошибка отправки уведомления, но заказ оформлен локально.");
      console.error(data);
    }
  }).catch(err => console.error("Ошибка Telegram:", err));

  cart = [];
  document.getElementById("cartCount").textContent = 0;
  renderCart();
  toggleCart();
}

/* === Информация о товаре === */
let currentProductIndex = null;

function showInfo(i) {
  currentProductIndex = i;
  const p = products[i];
  const overlay = document.getElementById("infoOverlay");
  overlay.style.display = "flex";
  document.getElementById("infoTitle").textContent = p.name;
  document.getElementById("infoImg").src = p.img;
  document.getElementById("infoPrice").textContent = p.price.toLocaleString() + " ₽";
  const ul = document.getElementById("infoSpecs");
  ul.innerHTML = "";
  p.specs.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });

  if (admin) {
    document.getElementById("adminEdit").style.display = "block";
    document.getElementById("editSpecs").value = p.specs.join(", ");
  } else {
    document.getElementById("adminEdit").style.display = "none";
  }
}

function closeInfo() {
  document.getElementById("infoOverlay").style.display = "none";
}

function saveSpecs() {
  const txt = document.getElementById("editSpecs").value.trim();
  if (!txt) return;
  products[currentProductIndex].specs = txt.split(",").map(s => s.trim());
  localStorage.setItem("products", JSON.stringify(products));
  showInfo(currentProductIndex);
  alert("✅ Характеристики обновлены!");
}

/* === Добавление / удаление товаров === */
function openAddProduct() {
  const o = document.getElementById("addOverlay");
  o.style.display = o.style.display === "flex" ? "none" : "flex";
}

function addProduct() {
  const name = newName.value;
  const price = +newPrice.value;
  const img = newImg.value;
  const specs = newSpecs.value.split(",").map(s => s.trim());
  if (!name || !price || !img) return alert("Заполните все поля!");

  products.push({ name, price, img, specs });
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  openAddProduct();
}

function deleteProduct(i) {
  if (!admin) return;
  if (confirm("Удалить товар?")) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

/* === Поиск и сортировка === */
function filterProducts() {
  const q = searchInput.value.toLowerCase();
  document.getElementById("productList").innerHTML = "";
  products.filter(p => p.name.toLowerCase().includes(q)).forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "product";
    d.innerHTML = `<img src="${p.img}" alt="${p.name}" onclick="showInfo(${i})">
      <h3>${p.name}</h3><p>${p.price.toLocaleString()} ₽</p>
      <button onclick="addToCart(${i})">Добавить</button>`;
    productList.appendChild(d);
  });
}

document.querySelector('.select-selected').addEventListener('click', function () {
  this.nextElementSibling.classList.toggle('select-hide');
});

function sortBy(type) {
  const items = document.querySelector('.select-items');
  items.classList.add('select-hide');
  document.querySelector('.select-selected').textContent =
    type === 'default' ? 'Сортировка ▼' :
    type === 'priceAsc' ? 'Цена ↑' :
    type === 'priceDesc' ? 'Цена ↓' :
    'По названию';

  if (type === 'priceAsc') products.sort((a, b) => a.price - b.price);
  else if (type === 'priceDesc') products.sort((a, b) => b.price - a.price);
  else if (type === 'name') products.sort((a, b) => a.name.localeCompare(b.name));
  renderProducts();
}

/* === Админ вход === */
function adminLogin() {
  const pass = prompt("Введите пароль администратора:");
  if (pass === ADMIN_PASSWORD) {
    admin = true;
    alert("✅ Вход выполнен. Админ-режим активен.");
    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "inline-block";
    document.querySelectorAll(".delete-btn").forEach(b => b.style.display = "block");
  } else alert("❌ Неверный пароль!");
}

function logoutAdmin() {
  admin = false;
  alert("🚪 Вы вышли из админ-режима.");
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "none";
  document.querySelectorAll(".delete-btn").forEach(b => b.style.display = "none");
}

/* === Горячая клавиша ALT + A === */
document.addEventListener("keydown", e => {
  if (e.altKey && e.code === "KeyA") {
    const btn = document.getElementById("adminLoginBtn");
    btn.style.display = btn.style.display === "none" ? "inline-block" : "none";
  }
});

/* === Закрытие оверлеев === */
function overlayClick(e) {
  if (e.target.classList.contains("overlay")) e.target.style.display = "none";
}

/* === Запуск === */
renderProducts();














