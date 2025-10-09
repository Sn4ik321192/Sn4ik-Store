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


// === Рендер товаров ===
function getFiltered() {
  let list = products.slice();
  if (query) list = list.filter(p => p.name.toLowerCase().includes(query));
  if (sortMode === "priceAsc") list.sort((a,b)=>a.price-b.price);
  if (sortMode === "priceDesc") list.sort((a,b)=>b.price-a.price);
  if (sortMode === "name") list.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
  return list;
}

function render() {
  const list = $("productList");
  list.innerHTML = "";
  const items = getFiltered();
  const totalPages = Math.ceil(items.length / perPage);
  const pageItems = items.slice((currentPage-1)*perPage, currentPage*perPage);

  pageItems.forEach((p,i)=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${fmt(p.price)} ₽</p>
      <button class="btn" onclick="addToCart(${products.indexOf(p)})">Добавить</button>`;
    list.appendChild(card);
  });

  const pag=$("pagination"); pag.innerHTML="";
  for(let i=1;i<=totalPages;i++){
    const b=document.createElement("button");
    b.className="page-btn"+(i===currentPage?" active":"");
    b.textContent=i;
    b.onclick=()=>{currentPage=i;render();};
    pag.appendChild(b);
  }
}

// === Поиск и сортировка ===
function filterProducts(){ query=$("searchInput").value.toLowerCase(); currentPage=1; render(); }
(function(){
  const dd=$("sortDropdown"),btn=$("sortBtn"),menu=$("sortMenu");
  btn.onclick=e=>{e.stopPropagation();dd.classList.toggle("open");};
  menu.querySelectorAll("button").forEach(b=>{
    b.onclick=()=>{
      sortMode=b.dataset.sort;
      btn.textContent=b.textContent;
      dd.classList.remove("open");
      render();
    };
  });
  document.addEventListener("click",()=>dd.classList.remove("open"));
})();

// === Корзина ===
function toggleCart(){const o=$("cartOverlay");o.style.display=o.style.display==="flex"?"none":"flex";renderCart();}
function addToCart(i){cart.push(products[i]);$("cartCount").textContent=cart.length;renderCart();}
function renderCart(){
  const c=$("cartItems");c.innerHTML="";let t=0;
  cart.forEach((p,i)=>{t+=p.price;
    const d=document.createElement("div");
    d.className="cart-item";
    d.innerHTML=`<img src="${p.img}" alt=""><div><strong>${p.name}</strong><br>${fmt(p.price)} ₽</div>
    <button onclick="removeFromCart(${i})" class="btn btn-clear">✕</button>`;
    c.appendChild(d);
  });
  $("totalPrice").textContent=fmt(t);
}
function removeFromCart(i){cart.splice(i,1);$("cartCount").textContent=cart.length;renderCart();}
function clearCart(){cart=[];$("cartCount").textContent=0;renderCart();}
function overlayClick(e){if(e.target.classList.contains("overlay"))e.target.style.display="none";}

// === Заказ ===
function placeOrder(){if(!cart.length)return alert("Корзина пуста!");$("orderOverlay").style.display="flex";}
function closeOrder(){$("orderOverlay").style.display="none";}
function sendOrder(){
  const name=$("orderName").value.trim(),phone=$("orderPhone").value.trim();
  if(!name||!phone)return alert("Введите имя и телефон!");
  const summary=cart.map(p=>`• ${p.name} — ${fmt(p.price)} ₽`).join("\n");
  const total=fmt(cart.reduce((s,p)=>s+p.price,0));
  const msg=`🛍 Заказ в Sn4ik-Store\n👤 ${name}\n📞 ${phone}\n\n${summary}\n\n💰 Итого: ${total} ₽`;
  fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({chat_id:TELEGRAM_CHAT_ID,text:msg})
  }).then(r=>r.json()).then(d=>{
    if(d.ok){clearCart();closeOrder();toggleCart();alert("✅ Заказ отправлен!");}
    else alert("⚠️ Ошибка Telegram");
  });
}

// === Запуск ===
render();
