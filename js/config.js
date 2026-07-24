// 乒奥乒乓球俱乐部官网配置文件
// 修改此文件即可更新网站内容，无需修改其他代码

const CONFIG = {
  // 网站基本信息
  site: {
    title: '乒奥乒乓球俱乐部',
    slogan: '专业训练，成就梦想',
    phone: '18144025330',
    address: '福建省福州市仓山区金洲南路2号',
    qq: '88888888',
    wechat: 'lihao960123'
  },

  // 导航菜单
  nav: [
    { name: '首页', href: '#home' },
    { name: '教练简介', href: '#coaches' },
    { name: '学员风采', href: '#academies' },
    { name: '活动日历', href: '#events' },
    { name: '课程介绍', href: '#courses' },
    { name: '联系我们', href: '#contact' }
  ],

  // 轮播图配置
  banner: [
    {
      title: '专业乒乓球培训',
      subtitle: '国家级教练团队，科学训练体系',
      image: 'images/banner1.jpg'
    },
    {
      title: '青少年培训基地',
      subtitle: '培养未来之星，成就体育梦想',
      image: 'images/banner2.jpg'
    },
    {
      title: '室内恒温场馆',
      subtitle: '专业场地，舒适环境',
      image: 'images/banner3.jpg'
    }
  ],

  // 教练简介
  coaches: [
    {
      name: '康教练',
      title: '省队退役运动员',
      experience: '15年教学经验',
      specialty: '技术全面，擅长正手进攻和反手防守训练',
      image: 'images/coach1.jpg'
    },
    {
      name: '李教练',
      title: '省队退役运动员',
      experience: '15年教学经验',
      specialty: '技术全面，擅长正手进攻和反手防守训练',
      image: 'images/coach2.jpg'
    },
    {
      name: '张教练',
      title: '高级教练',
      experience: '12年教学经验',
      specialty: '专注于基本功训练，注重学员动作规范性',
      image: 'images/coach3.jpg'
    },
    {
      name: '刘教练',
      title: '青年教练',
      experience: '8年教学经验',
      specialty: '亲和力强，擅长与儿童沟通，激发学习兴趣',
      image: 'images/coach4.jpg'
    }
  ],

  // 学员风采（扁平列表，可由管理后台编辑）
  students: [],

  // 活动日历（可由管理后台编辑）
  events: [],

  // 课程介绍
  courses: [
    {
      name: '少儿启蒙班',
      age: '4-8岁',
      duration: '60分钟/节',
      price: '150',
      description: '培养孩子对乒乓球的兴趣，学习基本握拍姿势和发球动作',
      features: ['基础握拍教学', '简单发球技巧', '趣味游戏训练', '培养运动兴趣']
    },
    {
      name: '青少年提高班',
      age: '9-14岁',
      duration: '90分钟/节',
      price: '200',
      description: '系统学习乒乓球技术，提升实战能力',
      features: ['正反手技术训练', '步伐移动训练', '实战对抗练习', '战术意识培养']
    },
    {
      name: '私教一对一',
      age: '不限',
      duration: '60分钟/节',
      price: '300',
      description: '个性化定制训练方案，针对性提升技术水平',
      features: ['专属训练计划', '技术细节纠正', '快速提升技巧', '灵活预约时间']
    }
  ],

  // 悬浮联系栏配置
  floatingContact: {
    phone: '18144025330',
    wechatQRCode: 'images/wechat-qr.jpg',
    qq: '88888888'
  }
};
