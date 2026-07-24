// 乒奥乒乓球俱乐部官网主脚本
// 动态渲染页面内容

document.addEventListener('DOMContentLoaded', function() {
  // 加载数据（优先从localStorage）
  loadData();

  // 渲染导航菜单
  renderNav();

  // 渲染轮播图
  renderBanner();

  // 渲染教练简介
  renderCoaches();

  // 渲染学员风采（按学员列表）
  renderStudents();

  // 渲染活动日历
  renderEvents();

  // 渲染课程介绍
  renderCourses();

  // 渲染联系信息
  renderContact();

  // 渲染悬浮联系栏
  renderFloatingContact();

  // 初始化交互功能
  initInteractions();
});

// 全局数据变量
let students = [];
let events = [];

// 加载数据（优先从localStorage，否则用config.js默认值）
function loadData() {
  const savedStudents = localStorage.getItem('pingao_students');
  const savedEvents = localStorage.getItem('pingao_events');

  if (savedStudents) {
    students = JSON.parse(savedStudents);
  } else {
    students = CONFIG.students || [];
  }

  if (savedEvents) {
    events = JSON.parse(savedEvents);
  } else {
    events = CONFIG.events || [];
  }
}

// 渲染导航菜单
function renderNav() {
  const navMenu = document.getElementById('nav-menu');
  const navContainer = document.querySelector('.nav-container');
  
  // 添加logo文字
  const logo = document.querySelector('.logo span');
  if (logo) {
    logo.textContent = CONFIG.site.title;
  }

  CONFIG.nav.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.name;
    li.appendChild(a);
    navMenu.appendChild(li);
  });
}

// 渲染轮播图
function renderBanner() {
  const bannerSlide = document.querySelector('.banner-slide');
  const bannerDots = document.getElementById('banner-dots');

  CONFIG.banner.forEach((item, index) => {
    // 创建轮播项
    const slideItem = document.createElement('div');
    slideItem.className = 'banner-item';
    
    // 使用图片占位符
    slideItem.innerHTML = `
      <h1>${item.title}</h1>
      <p>${item.subtitle}</p>
    `;
    
    // 设置背景图片
    slideItem.style.backgroundImage = `url('${item.image}')`;
    bannerSlide.appendChild(slideItem);

    // 创建轮播点
    const dot = document.createElement('button');
    dot.className = 'banner-dot';
    if (index === 0) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => goToSlide(index));
    bannerDots.appendChild(dot);
  });

  // 初始化轮播
  let currentSlide = 0;
  const totalSlides = CONFIG.banner.length;
  const dots = document.querySelectorAll('.banner-dot');

  function goToSlide(index) {
    currentSlide = index;
    bannerSlide.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // 自动轮播
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 5000);
}

// 渲染教练简介
function renderCoaches() {
  const coachesGrid = document.getElementById('coaches-grid');

  CONFIG.coaches.forEach(coach => {
    const card = document.createElement('div');
    card.className = 'coach-card';
    card.innerHTML = `
      <div class="coach-image">
        <img src="${coach.image}" alt="${coach.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-user placeholder\'></i>';">
      </div>
      <div class="coach-info">
        <div class="coach-name">${coach.name}</div>
        <div class="coach-title">${coach.title}</div>
        <div class="coach-experience">${coach.experience}</div>
        <div class="coach-specialty">${coach.specialty}</div>
      </div>
    `;
    coachesGrid.appendChild(card);
  });
}

// 渲染学员风采（按学员列表展示）
function renderStudents() {
  const container = document.getElementById('academies-container');

  students.forEach(student => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
      <div class="student-image">
        <img src="${student.image}" alt="${student.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-user placeholder\'></i>';">
      </div>
      <div class="student-content">
        <div class="student-name">${student.name}</div>
        <div class="student-meta">
          <span><i class="fas fa-birthday-cake"></i> ${student.age}岁</span>
          <span><i class="fas fa-trophy"></i> ${student.level}</span>
        </div>
        <div class="student-milestones-preview">
          ${student.milestones && student.milestones.length > 0 
            ? `<span><i class="fas fa-route"></i> ${student.milestones.length}个里程碑</span>` 
            : ''}
        </div>
        <div class="student-achievements-preview">
          ${student.achievements && student.achievements.length > 0 
            ? `<span><i class="fas fa-award"></i> ${student.achievements.length}项成绩</span>` 
            : ''}
        </div>
      </div>
    `;
    card.addEventListener('click', () => openStudentModal(student));
    container.appendChild(card);
  });
}

// 渲染活动日历
function renderEvents() {
  const eventsList = document.getElementById('events-list');

  // 按日期排序（最新的在前）
  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedEvents.forEach(event => {
    // 使用第一张图片作为封面图
    const coverImage = event.images && event.images.length > 0 ? event.images[0] : '';
    
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="event-image">
        <img src="${coverImage}" alt="${event.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-calendar-alt placeholder\'></i>';">
        <div class="event-date">${formatDate(event.date)}</div>
        ${event.images && event.images.length > 1 
          ? `<div class="event-image-count"><i class="fas fa-images"></i> ${event.images.length}</div>` 
          : ''}
      </div>
      <div class="event-content">
        <div class="event-title">${event.title}</div>
        <div class="event-location">
          <i class="fas fa-map-marker-alt"></i>
          ${event.location}
        </div>
        <div class="event-description">${event.description}</div>
        <div class="event-highlights">
          ${event.highlights && event.highlights.slice(0, 2).map(h => `
            <span class="event-highlight">${h}</span>
          `).join('')}
        </div>
      </div>
    `;
    card.addEventListener('click', () => openEventModal(event));
    eventsList.appendChild(card);
  });
}

// 格式化日期
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

// 渲染课程介绍
function renderCourses() {
  const coursesGrid = document.getElementById('courses-grid');

  CONFIG.courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const featuresHtml = course.features.map(feature => `
      <li>${feature}</li>
    `).join('');
    
    card.innerHTML = `
      <div class="course-header">
        <div class="course-name">${course.name}</div>
        <div class="course-meta">
          <span><i class="fas fa-users"></i> ${course.age}</span>
          <span><i class="fas fa-clock"></i> ${course.duration}</span>
        </div>
      </div>
      <div class="course-body">
        <div class="course-price">
          <span class="amount">¥${course.price}</span>
          <span class="unit">/节</span>
        </div>
        <div class="course-description">${course.description}</div>
        <ul class="course-features">
          ${featuresHtml}
        </ul>
      </div>
    `;
    coursesGrid.appendChild(card);
  });
}

// 渲染联系信息
function renderContact() {
  document.getElementById('contact-phone').textContent = CONFIG.site.phone;
  document.getElementById('contact-address').textContent = CONFIG.site.address;
  document.getElementById('contact-qq').textContent = CONFIG.site.qq;
  document.getElementById('contact-wechat').textContent = CONFIG.site.wechat;
}

// 渲染悬浮联系栏
function renderFloatingContact() {
  const floatingContact = document.getElementById('floating-contact');
  
  // 电话
  const phoneItem = document.createElement('div');
  phoneItem.className = 'float-item phone';
  phoneItem.innerHTML = `
    <i class="fas fa-phone"></i>
    <span class="tooltip">${CONFIG.floatingContact.phone}</span>
  `;
  phoneItem.addEventListener('click', () => {
    window.location.href = `tel:${CONFIG.floatingContact.phone}`;
  });
  floatingContact.appendChild(phoneItem);

  // 微信
  const wechatItem = document.createElement('div');
  wechatItem.className = 'float-item wechat';
  wechatItem.innerHTML = `
    <i class="fab fa-weixin"></i>
    <span class="tooltip">微信咨询</span>
    <div class="qr-popup">
      <img src="${CONFIG.floatingContact.wechatQRCode}" alt="微信二维码" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'qr-placeholder\'><i class=\'fab fa-weixin\'></i><span>微信二维码</span></div><p>扫一扫添加微信</p>';">
      <p>扫一扫添加微信</p>
    </div>
  `;
  floatingContact.appendChild(wechatItem);

  // QQ
  const qqItem = document.createElement('div');
  qqItem.className = 'float-item qq';
  qqItem.innerHTML = `
    <i class="fab fa-qq"></i>
    <span class="tooltip">QQ: ${CONFIG.floatingContact.qq}</span>
  `;
  qqItem.addEventListener('click', () => {
    window.open(`http://wpa.qq.com/msgrd?v=3&uin=${CONFIG.floatingContact.qq}&site=qq&menu=yes`);
  });
  floatingContact.appendChild(qqItem);

  // 返回顶部
  const topItem = document.createElement('div');
  topItem.className = 'float-item top';
  topItem.innerHTML = `
    <i class="fas fa-arrow-up"></i>
    <span class="tooltip">返回顶部</span>
  `;
  topItem.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  floatingContact.appendChild(topItem);
}

// 初始化交互功能
function initInteractions() {
  // 移动端菜单切换
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('show') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });

  // 点击导航链接关闭移动端菜单
  navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navMenu.classList.remove('show');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // 导航栏滚动效果
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 图片预览弹窗关闭
  const imageModal = document.getElementById('image-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  function closeImageModal() {
    imageModal.classList.remove('show');
  }

  modalOverlay.addEventListener('click', closeImageModal);
  modalClose.addEventListener('click', closeImageModal);

  // ESC键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (imageModal.classList.contains('show')) closeImageModal();
      if (studentModal.classList.contains('show')) closeStudentModal();
      if (eventModal.classList.contains('show')) closeEventModal();
    }
  });

  // 点击页面其他地方关闭微信二维码弹窗
  document.addEventListener('click', (e) => {
    const qrPopup = document.querySelector('.qr-popup');
    const wechatItem = document.querySelector('.float-item.wechat');
    if (qrPopup && !wechatItem.contains(e.target)) {
      qrPopup.classList.remove('show');
    }
  });

  // 学员详情弹窗关闭
  const studentModal = document.getElementById('student-modal');
  const studentModalOverlay = document.getElementById('student-modal-overlay');
  const studentModalClose = document.getElementById('student-modal-close');

  function closeStudentModal() {
    studentModal.classList.remove('show');
  }

  studentModalOverlay.addEventListener('click', closeStudentModal);
  studentModalClose.addEventListener('click', closeStudentModal);

  // 活动详情弹窗关闭
  const eventModal = document.getElementById('event-modal');
  const eventModalOverlay = document.getElementById('event-modal-overlay');
  const eventModalClose = document.getElementById('event-modal-close');

  function closeEventModal() {
    eventModal.classList.remove('show');
  }

  eventModalOverlay.addEventListener('click', closeEventModal);
  eventModalClose.addEventListener('click', closeEventModal);
}

// 打开图片预览弹窗
function openImageModal(src, alt) {
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  
  modalImage.src = src;
  modalImage.alt = alt;
  imageModal.classList.add('show');
}

// 打开学员详情弹窗
function openStudentModal(student) {
  const modal = document.getElementById('student-modal');
  const body = document.getElementById('student-modal-body');
  
  const milestonesHtml = student.milestones && student.milestones.length > 0 
    ? student.milestones.map(m => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${m.date}</div>
        <div class="timeline-title">${m.title}</div>
        <div class="timeline-description">${m.description}</div>
      </div>
    `).join('')
    : '<p class="no-data">暂无里程碑记录</p>';
  
  const achievementsHtml = student.achievements && student.achievements.length > 0
    ? student.achievements.map(a => `
      <li>
        <span class="achievement-title">${a.title}</span>
        <span class="achievement-award">${a.award}</span>
      </li>
    `).join('')
    : '<li class="no-data">暂无成绩记录</li>';
  
  body.innerHTML = `
    <div class="student-modal-header">
      <div class="student-modal-avatar">
        <img src="${student.image}" alt="${student.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-user placeholder\'></i>';">
      </div>
      <div class="student-modal-info">
        <h2>${student.name}</h2>
        <div class="student-modal-meta">
          <span><i class="fas fa-birthday-cake"></i> ${student.age}岁</span>
          <span><i class="fas fa-trophy"></i> ${student.level}</span>
        </div>
      </div>
    </div>
    
    <div class="student-modal-section">
      <h3><i class="fas fa-route"></i> 成长路径</h3>
      <div class="timeline">
        ${milestonesHtml}
      </div>
    </div>
    
    <div class="student-modal-section">
      <h3><i class="fas fa-award"></i> 取得成绩</h3>
      <ul class="achievements-list">
        ${achievementsHtml}
      </ul>
    </div>
  `;
  
  modal.classList.add('show');
}

// 打开活动详情弹窗
function openEventModal(event) {
  const modal = document.getElementById('event-modal');
  const body = document.getElementById('event-modal-body');
  
  // 多图片轮播HTML
  const imagesHtml = event.images && event.images.length > 0 
    ? `
      <div class="event-images-carousel">
        <div class="carousel-slide" id="event-carousel-slide">
          ${event.images.map(img => `
            <div class="carousel-item">
              <img src="${img}" alt="${event.title}" onclick="openImageModal('${img}', '${event.title}')" style="cursor: zoom-in;">
            </div>
          `).join('')}
        </div>
        <button class="carousel-prev" onclick="carouselPrev()"><i class="fas fa-chevron-left"></i></button>
        <button class="carousel-next" onclick="carouselNext()"><i class="fas fa-chevron-right"></i></button>
        <div class="carousel-dots">
          ${event.images.map((_, i) => `
            <button class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToCarousel(${i})"></button>
          `).join('')}
        </div>
      </div>
      <script>
        // 活动图片轮播逻辑
        let eventCarouselIndex = 0;
        const eventTotalSlides = ${event.images.length};
        
        function goToCarousel(index) {
          eventCarouselIndex = index;
          document.getElementById('event-carousel-slide').style.transform = \`translateX(-\${eventCarouselIndex * 100}%)\`;
          document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === eventCarouselIndex);
          });
        }
        
        function carouselPrev() {
          eventCarouselIndex = (eventCarouselIndex - 1 + eventTotalSlides) % eventTotalSlides;
          goToCarousel(eventCarouselIndex);
        }
        
        function carouselNext() {
          eventCarouselIndex = (eventCarouselIndex + 1) % eventTotalSlides;
          goToCarousel(eventCarouselIndex);
        }
      </script>
    `
    : '';
  
  // 里程碑HTML
  const milestonesHtml = event.milestones && event.milestones.length > 0
    ? `
      <div class="event-modal-section">
        <h3><i class="fas fa-route"></i> 活动里程碑</h3>
        <div class="timeline">
          ${event.milestones.map(m => `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">${m.date}</div>
              <div class="timeline-title">${m.title}</div>
              <div class="timeline-description">${m.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `
    : '';
  
  // 比赛成果HTML（已移除所属队伍列）
  const resultsHtml = event.results && event.results.length > 0
    ? event.results.map(r => `
      <tr>
        <td>${r.category}</td>
        <td>${r.winner}</td>
        <td class="achievement">${r.achievement}</td>
      </tr>
    `).join('')
    : '<tr><td colspan="3" class="no-data">暂无比赛成果</td></tr>';
  
  const highlightsHtml = event.highlights && event.highlights.length > 0
    ? event.highlights.map(h => `
      <li>${h}</li>
    `).join('')
    : '<li class="no-data">暂无精彩亮点</li>';
  
  body.innerHTML = `
    <div class="event-modal-header">
      ${imagesHtml}
      <h2>${event.title}</h2>
      <div class="event-modal-date">
        <i class="fas fa-calendar"></i>
        ${event.date}
      </div>
      <div class="event-modal-location">
        <i class="fas fa-map-marker-alt"></i>
        ${event.location}
      </div>
      <div class="event-modal-description">${event.description}</div>
    </div>
    
    ${milestonesHtml}
    
    <div class="event-modal-section">
      <h3><i class="fas fa-medal"></i> 比赛成果</h3>
      <table class="event-results-table">
        <thead>
          <tr>
            <th>组别</th>
            <th>获奖选手</th>
            <th>成绩</th>
          </tr>
        </thead>
        <tbody>
          ${resultsHtml}
        </tbody>
      </table>
    </div>
    
    <div class="event-modal-section">
      <h3><i class="fas fa-star"></i> 精彩亮点</h3>
      <ul class="event-highlights-list">
        ${highlightsHtml}
      </ul>
    </div>
  `;
  
  modal.classList.add('show');
}
