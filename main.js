import { I18N_DATA } from './data.js';

// 1. peo-plan: 負責資料注入 (避免動態寫入 HTML 破壞 GSAP 結構)
export function setContent() {
  const elements = document.querySelectorAll('[data-key]');
  elements.forEach(el => {
    const key = el.getAttribute('data-key');
    if (I18N_DATA[key]) {
      // 處理換行符號
      el.innerHTML = I18N_DATA[key].replace(/\\n/g, '<br>');
    }
  });
}

// 2. peo-plan: 負責假裝排班表的資料渲染
export function renderSchedule() {
  const scheduleGrid = document.getElementById('schedule-grid');
  if (!scheduleGrid) return;
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const shifts = ['早診 09:00-12:00', '午診 14:00-17:00', '晚診 18:00-21:00'];
  const doctors = ['Dr. Alexander', 'Dr. Bella', 'Dr. Carter', 'Dr. Daniel', 'Dr. Elena'];
  
  let html = '<div class="sch-header"></div>';
  days.forEach(d => html += `<div class="sch-header">${d}</div>`);
  
  shifts.forEach(shift => {
    html += `<div class="sch-shift">${shift}</div>`;
    days.forEach(day => {
      // 隨機假裝排班
      const isOff = Math.random() > 0.7;
      if (isOff) {
        html += `<div class="sch-cell off">-</div>`;
      } else {
        const doc = doctors[Math.floor(Math.random() * doctors.length)];
        html += `<div class="sch-cell">${doc}</div>`;
      }
    });
  });
  
  scheduleGrid.innerHTML = html;
}

// 3. peo-plan: 負責手風琴 (Accordion) 互動邏輯
export function initAccordion() {
  const items = document.querySelectorAll('.acc-item');
  items.forEach(item => {
    const title = item.querySelector('.acc-title');
    title.addEventListener('click', () => {
      // 收起其他已展開的項目 (可選：保持極簡)
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // 切換當前項目的狀態
      item.classList.toggle('active');
    });
  });
}

// 4. peo-plan: 負責微笑藝廊 (Mouse Trail Reveal) 互動邏輯
export function initGallery() {
  const items = document.querySelectorAll('.gal-item');
  const cursorImg = document.getElementById('gal-cursor-img');
  
  if (!cursorImg || items.length === 0) return;

  // 滑鼠跟隨
  document.addEventListener('mousemove', (e) => {
    cursorImg.style.left = e.clientX + 'px';
    cursorImg.style.top = e.clientY + 'px';
  });

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const imgUrl = item.getAttribute('data-image');
      cursorImg.style.backgroundImage = `url(${imgUrl})`;
      cursorImg.classList.add('active');
    });
    
    item.addEventListener('mouseleave', () => {
      cursorImg.classList.remove('active');
    });
  });
}
