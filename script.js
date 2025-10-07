let admin = false;
const ADMIN_PASSWORD = "Alex2307";

let products = [
  { name: "iPhone 16 Pro", price: 119990, img: "file:///C:/Users/sasab/OneDrive/Desktop/iPhone-16-Pro-Max-Latest-Apple-Smartphone-jpg-removebg-preview.png", specs: ["Дисплей 6.1\"", "Процессор A17 Pro", "Память 256 ГБ", "Камера 48 МП"] },
  { name: "MacBook Air M3", price: 159990, img: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_13_m3_2024_hero.png", specs: ["Экран 13.6\"", "Чип M3", "8 ГБ RAM", "SSD 256 ГБ"] },
  { name: "iPad Pro M4", price: 149990, img: "https://redstore.by/wp-content/uploads/2024/05/Apple-iPad-Pro-M4-2024-silver-11.png", specs: ["Дисплей 13\"", "Процессор M4", "120 Гц", "Face ID"] },
  { name: "Apple Watch Ultra 2", price: 74990, img: "https://cdn-ultra.esempla.com/storage/webp/bfb8e7b2-fe18-418c-93ad-311c34356135.webp", specs: ["Корпус 49 мм", "Титан", "GPS + LTE", "Аккумулятор 36 ч"] },
  { name: "AirPods Pro 2", price: 29990, img: "https://png.pngtree.com/png-clipart/20230504/ourmid/pngtree-airpods-png-image_7081756.png", specs: ["Активное шумоподавление", "Bluetooth 5.3", "Зарядка MagSafe"] }
];

let cart = [];
let currentPage = 1;
const itemsPerPage = 6;
let currentProductIndex = null;

/* === Пагинация и вывод === */
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

function clearCart() {
  cart = [];
  document.getElementById("cartCount").textContent = 0;
  renderCart();
}

/* === Инфо и характеристики === */
function showInfo(index) {
  currentProductIndex = index;
  const p = products[index];
  document.getElementById("infoOverlay").style.display = "flex";
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
function closeInfo() { document.getElementById("infoOverlay").style.display = "none"; }
function saveSpecs() {
  const text = document.getElementById("editSpecs").value.trim();
  if (text) {
    products[currentProductIndex].specs = text.split(",").map(s => s.trim());
    showInfo(currentProductIndex);
    alert("Характеристики обновлены ✅");
  }
}

/* === Добавление товара === */
function openAddProduct() {
  const o = document.getElementById("addOverlay");
  o.style.display = o.style.display === "flex" ? "none" : "flex";
}
function addProduct() {
  const name = newName.value, price = +newPrice.value, img = newImg.value;
  const specs = newSpecs.value.split(",").map(s => s.trim());
  if (!name || !price || !img) return alert("Заполни все поля!");
  products.push({ name, price, img, specs });
  renderProducts();
  openAddProduct();
}
function deleteProduct(i) {
  if (!admin) return;
  if (confirm("Удалить товар?")) { products.splice(i, 1); renderProducts(); }
}

/* === Фильтр и сортировка === */
function filterProducts() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products
    .filter(p => p.name.toLowerCase().includes(q))
    .forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}" onclick="showInfo(${i})">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString()} ₽</p>
        <button onclick="addToCart(${i})">Добавить</button>
        ${admin ? `<button class='delete-btn' onclick='deleteProduct(${i})'>✕</button>` : ""}
      `;
      list.appendChild(div);
    });
}

/* === Кастомная сортировка (меню) === */
function sortBy(val) {
  if (val === "priceAsc") products.sort((a,b)=>a.price-b.price);
  else if (val === "priceDesc") products.sort((a,b)=>b.price-a.price);
  else if (val === "name") products.sort((a,b)=>a.name.localeCompare(b.name));
  renderProducts();
  document.querySelector(".select-selected").textContent = 
    document.querySelector(`.select-items div[onclick="sortBy('${val}')"]`).textContent + " ▼";
}

// открытие / закрытие меню сортировки
document.addEventListener("click", function(e) {
  const selected = document.querySelector(".select-selected");
  const items = document.querySelector(".select-items");
  if (selected.contains(e.target)) {
    items.classList.toggle("select-hide");
    selected.classList.toggle("active");
  } else {
    items.classList.add("select-hide");
    selected.classList.remove("active");
  }
});

/* === Авторизация администратора === */
function adminLogin() {
  const pass = prompt("Введите пароль администратора:");
  if (pass === ADMIN_PASSWORD) {
    admin = true;
    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "inline-block";
    document.getElementById("adminLoginBtn").style.display = "none";
    renderProducts();
    alert("Вход выполнен ✅");
  } else alert("Неверный пароль!");
}

function logoutAdmin() {
  admin = false;
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "none";
  alert("Вы вышли из аккаунта администратора.");
  renderProducts();
}

/* === Оверлеи и горячие клавиши === */
function overlayClick(e) {
  if (e.target.classList.contains("overlay")) e.target.style.display = "none";
}

// скрытый вход Alt + A
document.addEventListener("keydown", e => {
  if ((e.altKey && e.key.toLowerCase() === "a") || (e.altKey && e.shiftKey && e.key.toLowerCase() === "a")) {
    document.getElementById("adminLoginBtn").style.display = "inline-block";
    alert("Появилась кнопка входа администратора 🔐");
  }
});


