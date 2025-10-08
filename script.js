/* ============ Sn4ik-Store — основной скрипт ============ */

// --- Настройки
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

// --- Данные (по умолчанию). Затем подменяются из localStorage, если есть
let products = [
  { name: "IPhone 16 Pro", price: 120000, img: "https://cdn-ultra.esempla.com/storage/webp/2486c908-e555-47df-b9a8-57993939a343.webp", },
  { name: "MacBook Air M3", price: 159990, img: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_13_m3_2024_hero.png", specs: ["Экран 13.6\"", "Чип M3", "8 ГБ RAM", "SSD 256 ГБ"] },
  { name: "iPad Pro M4", price: 149990, img: "https://redstore.by/wp-content/uploads/2024/05/Apple-iPad-Pro-M4-2024-silver-11.png", specs: ["Дисплей 13\"", "Процессор M4", "120 Гц", "Face ID"] },
  { name: "Apple Watch Ultra 2", price: 74990, img: "https://cdn-ultra.esempla.com/storage/webp/bfb8e7b2-fe18-418c-93ad-311c34356135.webp", specs: ["Корпус 49 мм", "Титан", "GPS + LTE", "Аккумулятор 36 ч"] },
  { name: "AirPods Pro 2", price: 29990, img: "https://png.pngtree.com/png-clipart/20230504/ourmid/pngtree-airpods-png-image_7081756.png", specs: ["Активное шумоподавление", "Bluetooth 5.3", "Зарядка MagSafe"] },
  
  { name: "IPhone 15 ", price: 120000, img: "https://cdn-ultra.esempla.com/storage/webp/1a063c20-ad57-4158-9246-0a8c128fde2b.webp", },
  { name: "MacBook Air M4", price: 159990, img: "https://cdn.omd.md/eshop-assets/product_catalog/5896/19d0f01c479e4413b36311234dc8aa73.wl.webp", specs: ["Экран 13.6\"", "Чип M3", "8 ГБ RAM", "SSD 256 ГБ"] },
  { name: "iPad Pro M2", price: 149990, img: "https://action-jo-v2.action.jo/1497/1669110050_d52b8aae55b5cc3185e2.png", specs: ["Дисплей 13\"", "Процессор M4", "120 Гц", "Face ID"] },
  { name: "Apple Watch series 10", price: 74990, img: "https://cdn-ultra.esempla.com/storage/webp/2e4d3cb0-1af5-48b0-9695-702bab4a2e89.webp", specs: ["Корпус 49 мм", "Титан", "GPS + LTE", "Аккумулятор 36 ч"] },
  { name: "AirPods 4", price: 29990, img: "https://cdn-ultra.esempla.com/storage/webp/3eded361-a4d0-467b-972d-2262912d0dea.webp", specs: ["Активное шумоподавление", "Bluetooth 5.3", "Зарядка MagSafe"] },
];

// Загрузка сохранённых товаров
try{
  const saved = JSON.parse(localStorage.getItem("products"));
  if (Array.isArray(saved) && saved.length) products = saved;
}catch(e){ localStorage.removeItem("products"); }

// --- Утилиты
const fmt = n => n.toLocaleString("ru-RU");
const $ = (id) => document.getElementById(id);


// --- Рендер
function getFiltered(){
  let list = products.slice();
  if (query) list = list.filter(p => p.name.toLowerCase().includes(query));
  if (sortMode === "priceAsc") list.sort((a,b)=>a.price-b.price);
  if (sortMode === "priceDesc") list.sort((a,b)=>b.price-a.price);
  if (sortMode === "name") list.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
  return list;
}

function render(){
  const list = $("productList");
  list.innerHTML = "";
  const items = getFiltered();
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage-1)*perPage;
  const pageItems = items.slice(start, start+perPage);

  pageItems.forEach((p, i) => {
    const idx = products.indexOf(p);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <button class="delete-btn" onclick="deleteProduct(${idx})">✕</button>
      <img src="${p.img}" alt="${p.name}" onclick="showInfo(${idx})">
      <h3>${p.name}</h3>
      <p class="price">${fmt(p.price)} ₽</p>
      <button class="btn btn-primary" onclick="addToCart(${idx})">Добавить</button>
    `;
    list.appendChild(card);
  });

  // показать крестики в админ-режиме
  document.querySelectorAll(".delete-btn").forEach(b => b.style.display = admin ? "inline-flex" : "none");

  renderPagination(totalPages);
}
function renderPagination(total){
  const box = $("pagination");
  box.innerHTML = "";
  for(let i=1;i<=total;i++){
    const b = document.createElement("button");
    b.className = "page-btn"+(i===currentPage?" active":"");
    b.textContent = i;
    b.onclick = ()=>{ currentPage=i; render(); };
    box.appendChild(b);
  }
}
render();

/* --- Поиск --- */
function filterProducts(){
  query = $("searchInput").value.trim().toLowerCase();
  currentPage = 1;
  render();
}

/* --- Сортировка (кастомный dropdown) --- */
(function initSort(){
  const dd = $("sortDropdown");
  const btn = $("sortBtn");
  const menu = $("sortMenu");
  btn.addEventListener("click", e => {
    e.stopPropagation();
    dd.classList.toggle("open");
  });
  menu.querySelectorAll("button").forEach(b=>{
    b.addEventListener("click", ()=>{
      sortMode = b.dataset.sort;
      btn.textContent =
        sortMode==="priceAsc" ? "Цена ↑" :
        sortMode==="priceDesc" ? "Цена ↓" :
        sortMode==="name" ? "По названию" : "Сортировка ▾";
      dd.classList.remove("open");
      render();
    });
  });
  document.addEventListener("click", e => dd.classList.remove("open"));
})();

/* --- Корзина --- */
function toggleCart(){
  const o = $("cartOverlay");
  o.style.display = o.style.display==="flex" ? "none" : "flex";
  renderCart();
}
function addToCart(i){
  cart.push(products[i]);
  $("cartCount").textContent = cart.length;
  renderCart();
}
function renderCart(){
  const ul = $("cartItems");
  ul.innerHTML="";
  let total = 0;
  cart.forEach(p=>{
    total+=p.price;
    const li = document.createElement("li");
    li.textContent = `${p.name} — ${fmt(p.price)} ₽`;
    ul.appendChild(li);
  });
  $("totalPrice").textContent = fmt(total);
}
function clearCart(){
  cart = [];
  $("cartCount").textContent = 0;
  renderCart();
}

/* --- Оформление заказа (модалка) --- */
function placeOrder(){
  if(!cart.length) return alert("Корзина пуста 😅");
  $("orderOverlay").style.display = "flex";
}
function closeOrder(){ $("orderOverlay").style.display = "none"; }

function sendOrder(){
  const name = $("orderName").value.trim();
  const phone = $("orderPhone").value.trim();
  const comment = $("orderComment").value.trim();
  if(!name || !phone) return alert("Введите имя и номер телефона!");

  const summary = cart.map(p=>`• ${p.name} — ${fmt(p.price)} ₽`).join("\n");
  const total = fmt(cart.reduce((s,p)=>s+p.price,0));
  const message = `🛍 Новый заказ в Sn4ik-Store\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Комментарий: ${comment||"—"}\n\n${summary}\n\n💰 Итого: ${total} ₽`;

  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.ok){
      closeOrder();
      showSuccessAnimation();
      playSuccessSound();
      clearCart();
      toggleCart(); // закрыть корзину
    }else alert("⚠️ Ошибка отправки сообщения.");
  })
  .catch(()=> alert("⚠️ Ошибка соединения с Telegram"));
}

/* --- Успех + звук --- */
function showSuccessAnimation(){
  const o = document.createElement("div");
  o.className = "success-overlay";
  o.innerHTML = `
    <div class="success-checkmark">
      <svg viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="25"></circle>
        <path d="M14 27l7 7 16-16"></path>
      </svg>
      <p>Покупка завершена</p>
    </div>`;
  document.body.appendChild(o);
  setTimeout(()=>{ o.classList.add("fade-out"); setTimeout(()=>o.remove(),600); }, 1600);
}
function playSuccessSound(){
  const a = new Audio("https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3");
  a.volume = 0.45; a.play().catch(()=>{});
}

/* --- Карточка товара (инфо) --- */
let currentIdx = null;
function showInfo(i){
  currentIdx = i;
  const p = products[i];
  $("infoImg").src = p.img;
  $("infoTitle").textContent = p.name;
  $("infoPrice").textContent = fmt(p.price) + " ₽";
  const ul = $("infoSpecs");
  ul.innerHTML = "";
  p.specs.forEach(s=>{ const li=document.createElement("li"); li.textContent=s; ul.appendChild(li); });
  $("adminEdit").style.display = admin ? "block" : "none";
  $("editSpecs").value = p.specs.join(", ");
  $("infoOverlay").style.display = "flex";
}
function closeInfo(){ $("infoOverlay").style.display = "none"; }
function saveSpecs(){
  const txt = $("editSpecs").value.trim();
  if(!txt) return;
  products[currentIdx].specs = txt.split(",").map(x=>x.trim()).filter(Boolean);
  localStorage.setItem("products", JSON.stringify(products));
  showInfo(currentIdx);
  alert("✅ Характеристики обновлены!");
}

/* --- Добавление/удаление товаров --- */
function openAddProduct(){
  if(!admin) return alert("Только админ может добавлять товары!");
  const o = $("addOverlay");
  o.style.display = o.style.display==="flex" ? "none" : "flex";
}
function addProduct(){
  const name = $("newName").value.trim();
  const price = +$("newPrice").value;
  const img = $("newImg").value.trim();
  const specs = $("newSpecs").value.split(",").map(x=>x.trim()).filter(Boolean);
  if(!name || !price || !img) return alert("Заполните все поля!");

  products.push({ name, price, img, specs });
  localStorage.setItem("products", JSON.stringify(products));
  $("newName").value = $("newPrice").value = $("newImg").value = $("newSpecs").value = "";
  openAddProduct();
  render();
}
function deleteProduct(i){
  if(!admin) return;
  if(confirm("Удалить товар?")){
    products.splice(i,1);
    localStorage.setItem("products", JSON.stringify(products));
    render();
  }
}

/* --- Админ вход/выход --- */
function adminLogin(){
  const pass = prompt("Введите пароль администратора:");
  if(pass === ADMIN_PASSWORD){
    admin = true;
    alert("✅ Админ-режим активен");
    $("addBtn").style.display = "inline-block";
    $("logoutBtn").style.display = "inline-block";
    document.querySelectorAll(".delete-btn").forEach(b=>b.style.display="inline-flex");
  }else{
    alert("❌ Неверный пароль");
  }
}
function logoutAdmin(){
  admin = false;
  alert("🚪 Вы вышли из админ-режима");
  $("addBtn").style.display = "none";
  $("logoutBtn").style.display = "none";
  document.querySelectorAll(".delete-btn").forEach(b=>b.style.display="none");
}

/* --- Alt + A: показать/скрыть кнопку "Войти как админ" --- */
document.addEventListener("keydown", (e)=>{
  if(e.altKey && e.code === "KeyA"){
    const b = $("adminLoginBtn");
    if(getComputedStyle(b).display === "none"){
      b.style.display = "inline-block";
      setTimeout(()=> b.classList.add("show"), 10);
    }else{
      b.classList.remove("show");
      setTimeout(()=> b.style.display = "none", 300);
    }
  }
});

/* --- Общие хэндлеры --- */
function overlayClick(ev){ if(ev.target.classList.contains("overlay")) ev.target.style.display="none"; }

/* стартовый рендер */
render();


















