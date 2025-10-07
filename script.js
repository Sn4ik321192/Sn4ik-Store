let admin = false;
const ADMIN_PASSWORD = "Alex2307";

let products = [
  { name: "iPhone 16 Pro", price: 119990, img: "https://freephonestores.com/wp-content/uploads/2024/11/2b68abe0-2b47-4be2-ab50-181d8e2dd6c0-1.png", specs: ["Дисплей 6.1\"", "Процессор A17 Pro", "Память 256 ГБ", "Камера 48 МП"] },
  { name: "MacBook Air M3", price: 159990, img: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_13_m3_2024_hero.png", specs: ["Экран 13.6\"", "Чип M3", "8 ГБ RAM", "SSD 256 ГБ"] },
  { name: "iPad Pro M4", price: 149990, img: "https://redstore.by/wp-content/uploads/2024/05/Apple-iPad-Pro-M4-2024-silver-11.png", specs: ["Дисплей 13\"", "Процессор M4", "120 Гц", "Face ID"] },
  { name: "Apple Watch Ultra 2", price: 74990, img: "https://cdn-ultra.esempla.com/storage/webp/bfb8e7b2-fe18-418c-93ad-311c34356135.webp", specs: ["Корпус 49 мм", "Титан", "GPS + LTE", "Аккумулятор 36 ч"] },
  { name: "AirPods Pro 2", price: 29990, img: "https://png.pngtree.com/png-clipart/20230504/ourmid/pngtree-airpods-png-image_7081756.png", specs: ["Активное шумоподавление", "Bluetooth 5.3", "Зарядка MagSafe"] }
];

let cart = [];
let currentPage = 1;
const itemsPerPage = 6;

/* === Вывод товаров и пагинация === */
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
      <button class="delete-btn" onclick="deleteProduct(${start + i})">✕</button>`;
    list.appendChild(div);
  });
  if (admin) document.querySelectorAll(".delete-btn").forEach(b => b.style.display = "block");
  renderPagination();
}

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
renderProducts();

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
function clearCart() { cart = []; document.getElementById("cartCount").textContent = 0; renderCart(); }
function placeOrder() {
  if (cart.length === 0) return alert("Корзина пуста 😅");
  let summary = cart.map(p => `• ${p.name} — ${p.price.toLocaleString()} ₽`).join("\n");
  let total = cart.reduce((s, p) => s + p.price, 0).toLocaleString();
  const conf = confirm(`Ваш заказ:\n\n${summary}\n\nИтого: ${total} ₽\n\nПодтвердить заказ?`);
  if (conf) {
    alert("✅ Заказ оформлен! Спасибо за покупку в A-Store 🍏");
    cart = []; document.getElementById("cartCount").textContent = 0; renderCart(); toggleCart();
  }
}

/* === Информация о товаре === */
function showInfo(i) {
  currentProductIndex = i;
  const p = products[i];
  document.getElementById("infoOverlay").style.display = "flex";
  infoTitle.textContent = p.name;
  infoImg.src = p.img;
  infoPrice.textContent = p.price.toLocaleString() + " ₽";
  infoSpecs.innerHTML = "";
  p.specs.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s; infoSpecs.appendChild(li);
  });
  if (admin) { adminEdit.style.display = "block"; editSpecs.value = p.specs.join(", "); }
  else adminEdit.style.display = "none";
}
function closeInfo() { infoOverlay.style.display = "none"; }
function saveSpecs() {
  const txt = editSpecs.value.trim();
  if (!txt) return;
  products[currentProductIndex].specs = txt.split(",").map(s => s.trim());
  showInfo(currentProductIndex);
  alert("Характеристики обновлены ✅");
}

/* === Добавление и удаление === */
function openAddProduct() {
  const o = document.getElementById("addOverlay");
  o.style.display = o.style.display === "flex" ? "none" : "flex";
}
function addProduct() {
  const name = newName.value, price = +newPrice.value, img = newImg.value;
  const specs = newSpecs.value.split(",").map(s => s.trim());
  if (!name || !price || !img) return alert("Заполни все поля!");
  products.push({ name, price, img, specs });
  renderProducts(); openAddProduct();
}
function deleteProduct(i) {
  if (!admin) return;
  if (confirm("Удалить товар?")) { products.splice(i, 1); renderProducts(); }
}

/* === Фильтр и сортировка === */
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

/* === Кастомное меню
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

/* === Авторизация администратора === */
function adminLogin() {
  const pass = prompt("Введите пароль администратора:");
  if (pass === ADMIN_PASSWORD) {
    admin = true;
    alert("✅ Вход выполнен. Админ-режим активен.");
    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "inline-block";
    document.querySelectorAll(".delete-btn").forEach(b => b.style.display = "block");
  } else {
    alert("❌ Неверный пароль!");
  }
}
function logoutAdmin() {
  admin = false;
  alert("🚪 Вы вышли из админ-режима.");
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "none";
  document.querySelectorAll(".delete-btn").forEach(b => b.style.display = "none");
}

/* === Горячая клавиша Alt + A для входа === */
document.addEventListener("keydown", e => {
  if (e.altKey && e.code === "KeyA") {
    const btn = document.getElementById("adminLoginBtn");
    btn.style.display = btn.style.display === "none" ? "inline-block" : "none";
  }
});

/* === Закрытие оверлеев кликом вне окна === */
function overlayClick(e) {
  if (e.target.classList.contains("overlay")) e.target.style.display = "none";
}

/* === Автоинициализация === */
renderProducts();



