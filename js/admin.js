// 管理后台主脚本
// 处理学员和活动的增删改查，数据存储在 localStorage

let students = [];
let events = [];
let currentEditingStudent = null;
let currentEditingEvent = null;
let deleteCallback = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  // 加载数据
  loadData();

  // 初始化导航切换
  initNavigation();

  // 初始化学员管理
  initStudentManagement();

  // 初始化活动管理
  initEventManagement();

  // 初始化弹窗关闭事件
  initModalClose();

  // 初始化确认弹窗
  initConfirmModal();
});

// 加载数据（从 config.js 加载）
function loadData() {
  students = CONFIG.students || [];
  events = CONFIG.events || [];

  renderStudentsTable();
  renderEventsTable();
}

// 保存数据（仅更新内存中的数据，需导出配置文件才能持久化）
function saveData() {
  showToast('数据已保存，记得导出配置文件');
}

// 导出完整配置文件
function exportConfig() {
  // 创建新的配置对象，包含当前数据
  const newConfig = {
    ...CONFIG,
    students: students,
    events: events
  };

  // 生成 config.js 内容
  const content = `// 乒奥乒乓球俱乐部官网配置文件
// 修改此文件即可更新网站内容，无需修改其他代码

const CONFIG = ${JSON.stringify(newConfig, null, 2)};`;

  // 创建下载链接
  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('配置文件已导出');
}

// 导出学员数据
function exportStudents() {
  const content = JSON.stringify(students, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'students.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('学员数据已导出');
}

// 导出活动数据
function exportEvents() {
  const content = JSON.stringify(events, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'events.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('活动数据已导出');
}

// 导航切换
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      item.classList.add('active');
      const tabId = item.dataset.tab;
      document.getElementById(`tab-${tabId}`).classList.add('active');
    });
  });
}

// 学员管理初始化
function initStudentManagement() {
  // 添加学员按钮
  document.getElementById('add-student-btn').addEventListener('click', () => {
    openStudentModal(null);
  });

  // 添加里程碑按钮
  document.getElementById('add-student-milestone').addEventListener('click', () => {
    addStudentMilestoneItem();
  });

  // 添加成绩按钮
  document.getElementById('add-student-achievement').addEventListener('click', () => {
    addStudentAchievementItem();
  });

  // 取消按钮
  document.getElementById('student-cancel-btn').addEventListener('click', closeStudentModal);

  // 表单提交
  document.getElementById('student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveStudent();
  });

  // 搜索
  document.getElementById('search-btn').addEventListener('click', () => {
    renderStudentsTable();
  });

  document.getElementById('student-search').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      renderStudentsTable();
    }
  });
}

// 活动管理初始化
function initEventManagement() {
  // 添加活动按钮
  document.getElementById('add-event-btn').addEventListener('click', () => {
    openEventModal(null);
  });

  // 添加里程碑按钮
  document.getElementById('add-event-milestone').addEventListener('click', () => {
    addEventMilestoneItem();
  });

  // 添加成果按钮
  document.getElementById('add-event-result').addEventListener('click', () => {
    addEventResultItem();
  });

  // 添加亮点按钮
  document.getElementById('add-event-highlight').addEventListener('click', () => {
    addEventHighlightItem();
  });

  // 取消按钮
  document.getElementById('event-cancel-btn').addEventListener('click', closeEventModal);

  // 表单提交
  document.getElementById('event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    saveEvent();
  });

  // 搜索
  document.getElementById('event-search-btn').addEventListener('click', () => {
    renderEventsTable();
  });

  document.getElementById('event-search').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      renderEventsTable();
    }
  });
}

// 渲染学员表格
function renderStudentsTable() {
  const tbody = document.getElementById('students-tbody');
  const search = document.getElementById('student-search').value.toLowerCase();
  
  const filtered = students.filter(s => s.name.toLowerCase().includes(search));
  
  tbody.innerHTML = filtered.map(student => `
    <tr>
      <td>
        <div class="avatar-container">
          ${student.image ? `<img src="${student.image}" alt="${student.name}" class="table-avatar" onerror="handleImageError(this);">` : '<i class="fas fa-user table-avatar-placeholder"></i>'}
        </div>
      </td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.level}</td>
      <td>${student.milestones?.length || 0}</td>
      <td>${student.achievements?.length || 0}</td>
      <td>
        <button class="btn-edit" onclick="editStudent(${student.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-delete" onclick="deleteStudent(${student.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// 渲染活动表格
function renderEventsTable() {
  const tbody = document.getElementById('events-tbody');
  const search = document.getElementById('event-search').value.toLowerCase();
  
  const filtered = events.filter(e => e.title.toLowerCase().includes(search));
  
  tbody.innerHTML = filtered.map(event => `
    <tr>
      <td>
        <div class="avatar-container">
          ${event.images && event.images.length > 0 ? `<img src="${event.images[0]}" alt="${event.title}" class="table-avatar" onerror="handleImageError(this);">` : '<i class="fas fa-image table-avatar-placeholder"></i>'}
        </div>
      </td>
      <td>${event.title}</td>
      <td>${event.date}</td>
      <td>${event.location}</td>
      <td>${event.images?.length || 0}</td>
      <td>${event.milestones?.length || 0}</td>
      <td>${event.results?.length || 0}</td>
      <td>
        <button class="btn-edit" onclick="editEvent(${event.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-delete" onclick="deleteEvent(${event.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// 打开学员编辑弹窗
function openStudentModal(student) {
  currentEditingStudent = student;
  const modal = document.getElementById('student-modal');
  const overlay = document.getElementById('student-modal-overlay');
  
  if (student) {
    document.getElementById('student-modal-title').textContent = '编辑学员';
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-age').value = student.age;
    document.getElementById('student-level').value = student.level;
    document.getElementById('student-image').value = student.image || '';
    
    // 渲染现有里程碑
    document.getElementById('student-milestones-list').innerHTML = (student.milestones || []).map((m, i) => `
      <div class="milestone-item">
        <input type="date" class="milestone-date" value="${m.date}">
        <input type="text" class="milestone-title" placeholder="标题" value="${m.title}">
        <input type="text" class="milestone-desc" placeholder="描述" value="${m.description}">
        <button class="btn-remove" onclick="removeMilestone(this)">删除</button>
      </div>
    `).join('');
    
    // 渲染现有成绩
    document.getElementById('student-achievements-list').innerHTML = (student.achievements || []).map((a, i) => `
      <div class="achievement-item">
        <input type="text" class="achievement-title" placeholder="赛事名称" value="${a.title}">
        <input type="text" class="achievement-award" placeholder="获奖情况" value="${a.award}">
        <button class="btn-remove" onclick="removeAchievement(this)">删除</button>
      </div>
    `).join('');
  } else {
    document.getElementById('student-modal-title').textContent = '添加学员';
    document.getElementById('student-form').reset();
    document.getElementById('student-id').value = '';
    document.getElementById('student-milestones-list').innerHTML = '';
    document.getElementById('student-achievements-list').innerHTML = '';
  }
  
  modal.classList.add('show');
  overlay.classList.add('show');
}

// 关闭学员编辑弹窗
function closeStudentModal() {
  const modal = document.getElementById('student-modal');
  const overlay = document.getElementById('student-modal-overlay');
  
  modal.classList.remove('show');
  overlay.classList.remove('show');
  currentEditingStudent = null;
}

// 添加学员里程碑项
function addStudentMilestoneItem(date, title, desc) {
  const container = document.getElementById('student-milestones-list');
  const item = document.createElement('div');
  item.className = 'milestone-item';
  item.innerHTML = `
    <input type="date" class="milestone-date" value="${date || ''}">
    <input type="text" class="milestone-title" placeholder="标题" value="${title || ''}">
    <input type="text" class="milestone-desc" placeholder="描述" value="${desc || ''}">
    <button class="btn-remove" onclick="removeMilestone(this)">删除</button>
  `;
  container.appendChild(item);
}

// 添加学员成绩项
function addStudentAchievementItem(title, award) {
  const container = document.getElementById('student-achievements-list');
  const item = document.createElement('div');
  item.className = 'achievement-item';
  item.innerHTML = `
    <input type="text" class="achievement-title" placeholder="赛事名称" value="${title || ''}">
    <input type="text" class="achievement-award" placeholder="获奖情况" value="${award || ''}">
    <button class="btn-remove" onclick="removeAchievement(this)">删除</button>
  `;
  container.appendChild(item);
}

// 保存学员
function saveStudent() {
  const id = document.getElementById('student-id').value;
  const name = document.getElementById('student-name').value;
  const age = parseInt(document.getElementById('student-age').value);
  const level = document.getElementById('student-level').value;
  const image = document.getElementById('student-image').value;
  
  // 获取里程碑
  const milestoneItems = document.querySelectorAll('#student-milestones-list .milestone-item');
  const milestones = Array.from(milestoneItems).map(item => ({
    date: item.querySelector('.milestone-date').value,
    title: item.querySelector('.milestone-title').value,
    description: item.querySelector('.milestone-desc').value
  })).filter(m => m.date && m.title);
  
  // 获取成绩
  const achievementItems = document.querySelectorAll('#student-achievements-list .achievement-item');
  const achievements = Array.from(achievementItems).map(item => ({
    title: item.querySelector('.achievement-title').value,
    award: item.querySelector('.achievement-award').value
  })).filter(a => a.title && a.award);
  
  if (id) {
    // 编辑
    const index = students.findIndex(s => s.id == id);
    if (index !== -1) {
      students[index] = { ...students[index], name, age, level, image, milestones, achievements };
    }
  } else {
    // 新增
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    students.push({ id: newId, name, age, level, image, milestones, achievements });
  }
  
  saveData();
  renderStudentsTable();
  closeStudentModal();
}

// 编辑学员
function editStudent(id) {
  const student = students.find(s => s.id == id);
  if (student) {
    openStudentModal(student);
  }
}

// 删除学员
function deleteStudent(id) {
  deleteCallback = () => {
    students = students.filter(s => s.id != id);
    saveData();
    renderStudentsTable();
  };
  showConfirm('确定要删除该学员吗？');
}

// 打开活动编辑弹窗
function openEventModal(event) {
  currentEditingEvent = event;
  const modal = document.getElementById('event-modal');
  const overlay = document.getElementById('event-modal-overlay');
  
  if (event) {
    document.getElementById('event-modal-title').textContent = '编辑活动';
    document.getElementById('event-id').value = event.id;
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-location').value = event.location;
    document.getElementById('event-images').value = (event.images || []).join(',');
    document.getElementById('event-description').value = event.description || '';
    
    // 渲染现有里程碑
    document.getElementById('event-milestones-list').innerHTML = (event.milestones || []).map(m => `
      <div class="milestone-item">
        <input type="date" class="milestone-date" value="${m.date}">
        <input type="text" class="milestone-title" placeholder="标题" value="${m.title}">
        <input type="text" class="milestone-desc" placeholder="描述" value="${m.description}">
        <button class="btn-remove" onclick="removeEventMilestone(this)">删除</button>
      </div>
    `).join('');
    
    // 渲染现有成果
    document.getElementById('event-results-list').innerHTML = (event.results || []).map(r => `
      <div class="result-item">
        <input type="text" class="result-category" placeholder="组别" value="${r.category}">
        <input type="text" class="result-winner" placeholder="获奖选手" value="${r.winner}">
        <input type="text" class="result-achievement" placeholder="成绩" value="${r.achievement}">
        <button class="btn-remove" onclick="removeEventResult(this)">删除</button>
      </div>
    `).join('');
    
    // 渲染现有亮点
    document.getElementById('event-highlights-list').innerHTML = (event.highlights || []).map(h => `
      <div class="highlight-item">
        <input type="text" class="highlight-text" placeholder="亮点内容" value="${h}">
        <button class="btn-remove" onclick="removeEventHighlight(this)">删除</button>
      </div>
    `).join('');
  } else {
    document.getElementById('event-modal-title').textContent = '添加活动';
    document.getElementById('event-form').reset();
    document.getElementById('event-id').value = '';
    document.getElementById('event-milestones-list').innerHTML = '';
    document.getElementById('event-results-list').innerHTML = '';
    document.getElementById('event-highlights-list').innerHTML = '';
  }
  
  modal.classList.add('show');
  overlay.classList.add('show');
}

// 关闭活动编辑弹窗
function closeEventModal() {
  const modal = document.getElementById('event-modal');
  const overlay = document.getElementById('event-modal-overlay');
  
  modal.classList.remove('show');
  overlay.classList.remove('show');
  currentEditingEvent = null;
}

// 添加活动里程碑项
function addEventMilestoneItem(date, title, desc) {
  const container = document.getElementById('event-milestones-list');
  const item = document.createElement('div');
  item.className = 'milestone-item';
  item.innerHTML = `
    <input type="date" class="milestone-date" value="${date || ''}">
    <input type="text" class="milestone-title" placeholder="标题" value="${title || ''}">
    <input type="text" class="milestone-desc" placeholder="描述" value="${desc || ''}">
    <button class="btn-remove" onclick="removeEventMilestone(this)">删除</button>
  `;
  container.appendChild(item);
}

// 添加活动成果项
function addEventResultItem(category, winner, achievement) {
  const container = document.getElementById('event-results-list');
  const item = document.createElement('div');
  item.className = 'result-item';
  item.innerHTML = `
    <input type="text" class="result-category" placeholder="组别" value="${category || ''}">
    <input type="text" class="result-winner" placeholder="获奖选手" value="${winner || ''}">
    <input type="text" class="result-achievement" placeholder="成绩" value="${achievement || ''}">
    <button class="btn-remove" onclick="removeEventResult(this)">删除</button>
  `;
  container.appendChild(item);
}

// 添加活动亮点项
function addEventHighlightItem(text) {
  const container = document.getElementById('event-highlights-list');
  const item = document.createElement('div');
  item.className = 'highlight-item';
  item.innerHTML = `
    <input type="text" class="highlight-text" placeholder="亮点内容" value="${text || ''}">
    <button class="btn-remove" onclick="removeEventHighlight(this)">删除</button>
  `;
  container.appendChild(item);
}

// 保存活动
function saveEvent() {
  const id = document.getElementById('event-id').value;
  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const location = document.getElementById('event-location').value;
  const imagesStr = document.getElementById('event-images').value;
  const description = document.getElementById('event-description').value;
  
  // 解析图片数组
  const images = imagesStr ? imagesStr.split(',').map(s => s.trim()).filter(s => s) : [];
  
  // 获取里程碑
  const milestoneItems = document.querySelectorAll('#event-milestones-list .milestone-item');
  const milestones = Array.from(milestoneItems).map(item => ({
    date: item.querySelector('.milestone-date').value,
    title: item.querySelector('.milestone-title').value,
    description: item.querySelector('.milestone-desc').value
  })).filter(m => m.date && m.title);
  
  // 获取成果
  const resultItems = document.querySelectorAll('#event-results-list .result-item');
  const results = Array.from(resultItems).map(item => ({
    category: item.querySelector('.result-category').value,
    winner: item.querySelector('.result-winner').value,
    achievement: item.querySelector('.result-achievement').value
  })).filter(r => r.category && r.winner);
  
  // 获取亮点
  const highlightItems = document.querySelectorAll('#event-highlights-list .highlight-item');
  const highlights = Array.from(highlightItems).map(item => item.querySelector('.highlight-text').value).filter(h => h);
  
  if (id) {
    // 编辑
    const index = events.findIndex(e => e.id == id);
    if (index !== -1) {
      events[index] = { ...events[index], title, date, location, images, description, milestones, results, highlights };
    }
  } else {
    // 新增
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    events.push({ id: newId, title, date, location, images, description, milestones, results, highlights });
  }
  
  saveData();
  renderEventsTable();
  closeEventModal();
}

// 编辑活动
function editEvent(id) {
  const event = events.find(e => e.id == id);
  if (event) {
    openEventModal(event);
  }
}

// 删除活动
function deleteEvent(id) {
  deleteCallback = () => {
    events = events.filter(e => e.id != id);
    saveData();
    renderEventsTable();
  };
  showConfirm('确定要删除该活动吗？');
}

// 删除通用函数
function removeMilestone(btn) {
  btn.parentElement.remove();
}

function removeAchievement(btn) {
  btn.parentElement.remove();
}

function removeEventMilestone(btn) {
  btn.parentElement.remove();
}

function removeEventResult(btn) {
  btn.parentElement.remove();
}

function removeEventHighlight(btn) {
  btn.parentElement.remove();
}

// 初始化弹窗关闭
function initModalClose() {
  // 学员弹窗
  document.getElementById('student-modal-close').addEventListener('click', closeStudentModal);
  document.getElementById('student-modal-overlay').addEventListener('click', closeStudentModal);
  
  // 活动弹窗
  document.getElementById('event-modal-close').addEventListener('click', closeEventModal);
  document.getElementById('event-modal-overlay').addEventListener('click', closeEventModal);
  
  // 确认弹窗
  document.getElementById('confirm-modal-close').addEventListener('click', closeConfirmModal);
  document.getElementById('confirm-modal-overlay').addEventListener('click', closeConfirmModal);
}

// 确认弹窗
function initConfirmModal() {
  document.getElementById('confirm-cancel-btn').addEventListener('click', closeConfirmModal);
  document.getElementById('confirm-ok-btn').addEventListener('click', () => {
    if (deleteCallback) {
      deleteCallback();
    }
    closeConfirmModal();
  });
}

function showConfirm(message) {
  document.getElementById('confirm-message').textContent = message;
  document.getElementById('confirm-modal').classList.add('show');
  document.getElementById('confirm-modal-overlay').classList.add('show');
}

function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('show');
  document.getElementById('confirm-modal-overlay').classList.remove('show');
  deleteCallback = null;
}

// 图片加载错误处理（防止闪烁）
function handleImageError(img) {
  // 检查是否已经处理过，防止重复触发
  if (img.dataset.errorHandled) {
    return;
  }
  img.dataset.errorHandled = 'true';
  
  // 隐藏图片，显示占位图标
  img.style.display = 'none';
  const container = img.parentElement;
  const icon = document.createElement('i');
  icon.className = 'fas fa-user table-avatar-placeholder';
  container.appendChild(icon);
}

// Toast 提示
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
