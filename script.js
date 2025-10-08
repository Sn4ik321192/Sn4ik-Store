/* ======= ОСНОВНЫЕ ПЕРЕМЕННЫЕ ======= */
:root {
  --bg: #0b0c12;
  --card: #171923;
  --glass: rgba(255, 255, 255, 0.08);
  --stroke: rgba(255, 255, 255, 0.14);
  --accent: #1c79ff;
  --accent-2: #00d084;
  --danger: #d14;
  --text: #eaeaea;
  --muted: #9cc7ff;
}

* { box-sizing: border-box; }

html, body {
  height: 100%;
  margin: 0;
  font-family: "Poppins", sans-serif;
  -webkit-tap-highlight-color: transparent;
}

body {
  color: var(--text);
  background: radial-gradient(1200px 600px at 20% -20%, #141725 0%, transparent 70%), var(--bg);
  overflow-x: hidden;
}

/* ======= ФИКС ДЛЯ iPHONE: предотвращение увеличения ======= */
input, textarea, select, button {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

@supports (-webkit-touch-callout: none) {
  input, textarea, select, button {
    font-size: 16px !important;
  }
}

/* ======= ХЕДЕР ======= */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(20, 20, 28, 0.55);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.brand { display: flex; align-items: center; gap: 10px; }
.logo { font-size: 28px; }
.brand-name { font-weight: 700; font-size: 26px; }

.search-wrap { flex: 0 1 540px; display: flex; justify-content: center; }
.search-wrap input {
  width: 100%;
  max-width: 420px;
  padding: 12px 18px;
  border-radius: 30px;
  border: 1px solid var(--stroke);
  background: var(--glass);
  color: #fff;
  outline: none;
  transition: 0.25s;
  text-align: center;
}
.search-wrap input:focus {
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 4px rgba(28, 121, 255, 0.18) inset;
}

/* ======= КНОПКИ ======= */
.btn {
  border: 1px solid var(--stroke);
  padding: 11px 18px;
  border-radius: 28px;
  color: #fff;
  cursor: pointer;
  transition: 0.25s;
  background: var(--glass);
}
.btn:hover { background: rgba(255, 255, 255, 0.18); }
.btn-primary {
  background: linear-gradient(175deg, #3b8aff, #2163ff);
  border-color: transparent;
  box-shadow: 0 8px 18px rgba(28, 121, 255, 0.25);
}
.btn-primary:hover { filter: brightness(1.06); }
.btn-success {
  background: linear-gradient(175deg, #00e08f, #0abf78);
  border-color: transparent;
  box-shadow: 0 8px 18px rgba(10, 191, 120, 0.25);
}
.btn-danger {
  background: linear-gradient(175deg, #ff5a7a, #c21a3a);
  border-color: transparent;
  box-shadow: 0 8px 18px rgba(194, 26, 58, 0.25);
}
.btn-glass { background: var(--glass); }
.btn-pill {
  background: var(--glass);
  padding: 12px 26px;
  border-radius: 999px;
  box-shadow: inset 0 8px 24px rgba(28, 121, 255, 0.18);
}

/* ======= КОНТРОЛЫ ======= */
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  padding: 22px;
}

/* ======= DROPDOWN ======= */
.dropdown {
  position: relative;
  z-index: 50;
}
.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  padding: 8px;
  border-radius: 16px;
  display: none;
  background: rgba(23, 25, 35, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
  z-index: 9999;
}
.dropdown.open .dropdown-menu {
  display: block;
  animation: fadeIn 0.25s ease;
}
.dropdown-menu button {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: #fff;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
}
.dropdown-menu button:hover { background: rgba(28, 121, 255, 0.22); }

/* ======= Сетка карточек ======= */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-items: center;
  align-items: start;
  padding: 20px;
}

/* 📱 Адаптация для телефонов */
@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: linear-gradient(180deg, #141725, #11131b);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 28px;
  padding: 22px;
  text-align: center;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: transform 0.35s, box-shadow 0.35s;
  position: relative;
  width: 320px;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
}

.card img {
  width: 220px;
  height: 220px;
  object-fit: contain;
  border-radius: 18px;
  user-select: none;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.card:hover img {
  transform: scale(1.06);
  box-shadow: 0 0 25px rgba(28,121,255,0.2);
}

.card h3 { margin: 14px 0 6px; }
.price { color: var(--muted); font-weight: 600; margin: 0 0 10px; }

/* ======= ПАГИНАЦИЯ ======= */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 22px;
}
.page-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--stroke);
  background: var(--glass);
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
}
.page-btn.active, .page-btn:hover {
  background: rgba(28, 121, 255, 0.38);
  border-color: transparent;
}

/* ======= ОВЕРЛЕИ И ПАНЕЛИ ======= */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  align-items: center;
  justify-content: center;
  z-index: 20;
}
.panel {
  width: 340px;
  background: var(--card);
  border: 1px solid var(--stroke);
  border-radius: 24px;
  padding: 22px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: pop 0.28s ease;
}
@keyframes pop {
  from { transform: translateY(-8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.panel input, .panel textarea {
  width: 100%;
  padding: 12px 14px;
  margin: 8px 0;
  border-radius: 14px;
  border: 1px solid var(--stroke);
  background: var(--glass);
  color: #fff;
  outline: none;
  transition: 0.2s;
}
.panel input:focus, .panel textarea:focus {
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 4px rgba(28, 121, 255, 0.18) inset;
}
.panel textarea { min-height: 70px; resize: none; }
.row { display: flex; gap: 10px; margin-top: 6px; }
.cart-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.cart-buttons .btn {
  flex: 1;
  min-width: 100px;
  text-align: center;
  font-size: 15px;
  padding: 12px 0;
  border-radius: 18px;
  transition: 0.25s ease;
}

.cart-buttons .btn-close {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
}
.cart-buttons .btn-close:hover {
  background: rgba(255, 255, 255, 0.22);
}

/* ======= АДАПТИВ ======= */
@media (max-width: 560px) {
  .brand-name { font-size: 20px; }
  .search-wrap { flex: 1; }
  .panel { width: 92%; }
  .card img { height: 160px; }
}

/* ======= АНИМАЦИЯ УСПЕШНОЙ ПОКУПКИ ======= */
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.4s ease;
}

.success-checkmark {
  text-align: center;
  transform: scale(0.9);
  opacity: 0;
  animation: successPop 0.6s forwards ease-out;
}

.success-checkmark svg {
  width: 150px;
  height: 150px;
  overflow: visible;
  stroke: #00ffb3;
  stroke-width: 3.2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 16px #00ffb3) drop-shadow(0 0 32px #00ffb3);
}

.success-checkmark circle {
  stroke-dasharray: 315;
  stroke-dashoffset: 315;
  animation: drawCircleSmooth 0.9s cubic-bezier(0.55, 0, 0.1, 1) forwards;
}

.success-checkmark path {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: drawCheckSmooth 0.5s ease forwards 0.5s;
}

.success-checkmark p {
  margin-top: 10px;
  color: #b9ffd8;
  font-weight: 600;
  font-size: 18px;
  opacity: 0;
  animation: textFade 0.8s ease forwards 0.9s;
}

/* ======= КЛЮЧЕВЫЕ КАДРЫ ======= */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes successPop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes drawCircleSmooth { from { stroke-dashoffset: 315; } to { stroke-dashoffset: 0; } }
@keyframes drawCheckSmooth { from { stroke-dashoffset: 48; } to { stroke-dashoffset: 0; } }
@keyframes textFade { to { opacity: 1; } }

/* ======= ОКНО ИНФОРМАЦИИ О ТОВАРЕ ======= */
.info-panel {
  max-width: 420px;
  width: 90%;
  text-align: center;
  background: linear-gradient(180deg, #171923, #0d0f16);
  border-radius: 26px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(28, 121, 255, 0.25);
}

.info-panel img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  border-radius: 20px;
  margin-bottom: 14px;
}

.info-panel h2 {
  margin: 6px 0;
  font-size: 22px;
  color: #fff;
}

.info-panel .price {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: 8px;
}

.info-panel ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 18px;
  text-align: left;
}

.info-panel ul li {
  margin: 4px 0;
  color: #b0c7ff;
  font-size: 15px;
}

/* ======= Анимации ======= */
@keyframes pulse {
  0% { box-shadow: 0 0 0 rgba(28,121,255,0.4); transform: scale(1); }
  50% { box-shadow: 0 0 20px rgba(28,121,255,0.8); transform: scale(1.1); }
  100% { box-shadow: 0 0 0 rgba(28,121,255,0.4); transform: scale(1); }
}
#cartBtn.pulse {
  animation: pulse 0.8s ease;
}

@keyframes cartBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
.cart-pulse {
  animation: cartBounce 0.4s ease;
}

.card {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.6s ease forwards;
}
.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

/* ======= Варианты цвета и памяти ======= */
.color-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 10px 0;
}
.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.color-swatch:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px var(--accent);
}
.color-swatch.active {
  transform: scale(1.2);
  box-shadow: 0 0 0 3px var(--accent), 0 0 12px var(--accent-2);
  border: 2px solid white;
}
.option-row {
  margin: 10px 0;
  text-align: center;
}
.option-row label {
  display: block;
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 6px;
}

/* ======= Кастомный выпадающий список памяти ======= */
.custom-select {
  position: relative;
  width: 220px;
  user-select: none;
}

.select-selected {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 150, 0.5);
  border-radius: 10px;
  padding: 10px 16px;
  color: #00ffaa;
  cursor: pointer;
  transition: 0.25s;
  text-align: center;
  font-weight: 500;
}

.select-selected:hover {
  box-shadow: 0 0 12px rgba(0, 255, 150, 0.5);
}

.select-items {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: rgba(12, 12, 12, 0.95);
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 150, 0.35);
  margin-top: 8px;
  overflow: hidden;
  z-index: 9999;
  box-shadow: 0 0 20px rgba(0, 255, 150, 0.3);
  animation: fadeInSelect 0.25s ease;
}

.select-items div {
  padding: 10px;
  color: #00ffaa;
  text-align: center;
  transition: 0.2s;
  cursor: pointer;
}

.select-items div:hover {
  background: rgba(0, 255, 150, 0.15);
  color: #fff;
  box-shadow: inset 0 0 8px rgba(0, 255, 150, 0.3);
}

.select-hide {
  display: none;
}

.select-selected.active {
  box-shadow: 0 0 16px rgba(0, 255, 150, 0.7);
  background: rgba(0, 255, 150, 0.1);
}

@keyframes fadeInSelect {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
/* ======= ПРОСТЫЕ АНИМАЦИИ ТОЛЬКО CSS ======= */

/* 1. Плавное появление карточек при загрузке */
.card {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }
.card:nth-child(5) { animation-delay: 0.5s; }
.card:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 2. Пульсация кнопки корзины при изменении количества - УБРАТЬ transform */
#cartBtn:active {
  animation: pulse 0.4s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 3. Плавное увеличение карточки при наведении - ИСПРАВИТЬ */
.card:hover {
  transform: translateY(-5px);
  transition: all 0.3s ease;
}

/* 4. Свечение кнопок при наведении */
.btn:hover {
  box-shadow: 0 0 15px rgba(28, 121, 255, 0.4);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 0 20px rgba(28, 121, 255, 0.6);
}

/* 5. Анимация появления оверлеев */
.overlay[style*="display: flex"] .panel {
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 6. Плавное изменение цвета цены при наведении */
.price:hover {
  color: var(--accent-2);
  transition: color 0.3s ease;
}

/* 7. Анимация увеличения изображения в карточке - ИСПРАВИТЬ */
.card img {
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.05);
}

/* 8. Эффект "дыхания" для активных элементов */
.page-btn.active {
  animation: breathe 2s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 9. Плавное появление выпадающего меню */
.dropdown.open .dropdown-menu {
  animation: fadeInDown 0.3s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 10. Анимация перелистывания страниц - УБРАТЬ transform */
.page-btn:hover {
  background: rgba(28, 121, 255, 0.5);
  transition: background 0.3s ease;
}

/* 11. Плавное изменение фона при наведении на карточку */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(28, 121, 255, 0.1), transparent);
  border-radius: 28px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.card:hover::before {
  opacity: 1;
}

/* 12. Анимация появления поиска */
.search-wrap input:focus {
  animation: searchFocus 0.3s ease;
}

@keyframes searchFocus {
  from {
    box-shadow: 0 0 0 0 rgba(28, 121, 255, 0.3);
  }
  to {
    box-shadow: 0 0 0 4px rgba(28, 121, 255, 0.1);
  }
}

/* 13. Плавное изменение цвета свачей цвета */
.color-swatch {
  transition: all 0.2s ease;
}

.color-swatch:hover {
  transform: scale(1.2);
}

.color-swatch.active {
  animation: colorSelect 0.3s ease;
}

@keyframes colorSelect {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1.2); }
}

/* 14. Анимация появления выпадающего списка памяти */
.select-items {
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 15. Эффект "нажатия" для всех кнопок - УБРАТЬ transform */
.btn:active {
  filter: brightness(0.9);
  transition: filter 0.1s ease;
}

/* 16. Плавное изменение градиента для дорогих товаров */
.card .price[data-price="high"] {
  background: linear-gradient(45deg, #ff6b6b, #ffa726);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 17. Мигание для уведомлений */
.blink {
  animation: blink 1s ease-in-out infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.7; }
}

/* 18. Вращение логотипа при наведении */
.logo:hover {
  animation: rotate 0.5s ease;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 19. Эффект "пульсации" для загрузки */
.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

/* 20. Плавное исчезновение при закрытии */
.panel.closing {
  animation: slideDown 0.3s ease forwards;
}

/* 21. Анимация для кнопок добавления в корзину - БЕЗОПАСНАЯ */
.card .btn {
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.card .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(28, 121, 255, 0.4);
}

.card .btn:active {
  transform: translateY(0);
}

/* 22. Убедимся, что карточки не перекрывают клики */
.card {
  position: relative;
  z-index: 1;
}

/* 23. Анимация для модального окна товара */
#productModal[style*="display: flex"] .panel {
  animation: modalAppear 0.4s ease;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 24. Анимация для элементов в корзине */
.cart-panel li {
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 25. Простая анимация загрузки */
@keyframes simplePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.pulse-simple {
  animation: simplePulse 2s ease-in-out infinite;
}
