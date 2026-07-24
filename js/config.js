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
  students: [
    {
      id: 1,
      name: '张明',
      age: 12,
      level: '业余二段',
      image: 'images/student1.jpg',
      milestones: [
        { date: '2023-03', title: '加入俱乐部', description: '开始系统训练' },
        { date: '2023-06', title: '首次参赛', description: '获得区赛第三名' },
        { date: '2023-12', title: '晋升业余一段', description: '技术水平大幅提升' },
        { date: '2024-05', title: '市赛冠军', description: '获得福州市青少年组冠军' },
        { date: '2024-08', title: '晋升业余二段', description: '进入精英学院' }
      ],
      achievements: [
        { title: '2024年福州市青少年乒乓球锦标赛', award: '男子甲组冠军' },
        { title: '2024年福建省青少年乒乓球联赛', award: '男子甲组季军' },
        { title: '2023年仓山区乒乓球比赛', award: '男子组第三名' }
      ]
    },
    {
      id: 2,
      name: '李婷',
      age: 10,
      level: '业余一段',
      image: 'images/student2.jpg',
      milestones: [
        { date: '2023-05', title: '加入俱乐部', description: '开始学习乒乓球' },
        { date: '2023-10', title: '首次参赛', description: '获得校赛第二名' },
        { date: '2024-03', title: '晋升业余一段', description: '通过段位考核' },
        { date: '2024-06', title: '区赛亚军', description: '获得仓山区青少年组亚军' }
      ],
      achievements: [
        { title: '2024年仓山区青少年乒乓球比赛', award: '女子乙组亚军' },
        { title: '2024年校乒乓球锦标赛', award: '女子组冠军' }
      ]
    },
    {
      id: 3,
      name: '王浩',
      age: 8,
      level: '业余初段',
      image: 'images/student3.jpg',
      milestones: [
        { date: '2024-01', title: '加入俱乐部', description: '开始启蒙训练' },
        { date: '2024-04', title: '握拍姿势定型', description: '掌握正确握拍方法' },
        { date: '2024-07', title: '首次上台', description: '完成第一次实战练习' }
      ],
      achievements: [
        { title: '2024年俱乐部内部友谊赛', award: '儿童组优秀奖' }
      ]
    },
    {
      id: 4,
      name: '陈雨萱',
      age: 7,
      level: '业余初段',
      image: 'images/student4.jpg',
      milestones: [
        { date: '2024-02', title: '加入俱乐部', description: '开始乒乓球学习' },
        { date: '2024-05', title: '学会发球', description: '掌握3种发球技巧' },
        { date: '2024-08', title: '晋升业余初段', description: '通过基础考核' }
      ],
      achievements: [
        { title: '2024年俱乐部夏季联赛', award: '儿童组第三名' }
      ]
    },
    {
      id: 5,
      name: '刘建国',
      age: 35,
      level: '业余二段',
      image: 'images/student5.jpg',
      milestones: [
        { date: '2023-06', title: '加入俱乐部', description: '开始业余训练' },
        { date: '2023-11', title: '晋升业余一段', description: '完成基础训练' },
        { date: '2024-04', title: '晋升业余二段', description: '技术全面提升' },
        { date: '2024-07', title: '参加成人联赛', description: '首次参加正式比赛' }
      ],
      achievements: [
        { title: '2024年福州市成人乒乓球联赛', award: '男子组第五名' },
        { title: '2024年俱乐部成人邀请赛', award: '亚军' }
      ]
    },
    {
      id: 6,
      name: '赵丽',
      age: 28,
      level: '业余一段',
      image: 'images/student6.jpg',
      milestones: [
        { date: '2023-09', title: '加入俱乐部', description: '开始学习乒乓球' },
        { date: '2024-02', title: '晋升业余初段', description: '掌握基础技术' },
        { date: '2024-06', title: '晋升业余一段', description: '技术稳步提升' }
      ],
      achievements: [
        { title: '2024年俱乐部女子挑战赛', award: '第三名' }
      ]
    }
  ],

  // 活动日历（可由管理后台编辑）
  events: [
    {
      id: 1,
      date: '2024-01-15',
      title: '福州市青少年乒乓球锦标赛',
      location: '福州市体育馆',
      description: '年度重要赛事，吸引全市各俱乐部优秀选手参赛',
      images: ['images/event1-1.jpg', 'images/event1-2.jpg', 'images/event1-3.jpg'],
      milestones: [
        { date: '2024-01-10', title: '赛前集训', description: '为期一周的封闭式训练' },
        { date: '2024-01-15', title: '比赛日', description: '全天激烈角逐' },
        { date: '2024-01-16', title: '颁奖典礼', description: '获得优异成绩' }
      ],
      results: [
        { category: '男子甲组', winner: '张明', achievement: '冠军' },
        { category: '女子乙组', winner: '李婷', achievement: '亚军' },
        { category: '男子乙组', winner: '王浩', achievement: '第五名' }
      ],
      highlights: [
        '张明以3:0完胜对手夺冠',
        '李婷逆转翻盘获得亚军',
        '俱乐部共获得1金1银的优异成绩'
      ]
    },
    {
      id: 2,
      date: '2024-03-20',
      title: '福建省青少年乒乓球联赛',
      location: '厦门市体育中心',
      description: '省级高水平赛事，检验全省青少年选手实力',
      images: ['images/event2-1.jpg', 'images/event2-2.jpg'],
      milestones: [
        { date: '2024-03-15', title: '出征厦门', description: '全体队员出发' },
        { date: '2024-03-20', title: '比赛开始', description: '首日比赛' },
        { date: '2024-03-22', title: '圆满收官', description: '载誉归来' }
      ],
      results: [
        { category: '男子甲组', winner: '张明', achievement: '季军' },
        { category: '女子甲组', winner: '陈雨萱', achievement: '第八名' }
      ],
      highlights: [
        '张明首次参加省级比赛获得铜牌',
        '陈雨萱进入前八，创造个人最佳'
      ]
    },
    {
      id: 3,
      date: '2024-05-10',
      title: '仓山区乒乓球友谊赛',
      location: '仓山区文体中心',
      description: '区内俱乐部交流赛事，增进友谊，切磋技艺',
      images: ['images/event3-1.jpg', 'images/event3-2.jpg', 'images/event3-3.jpg'],
      milestones: [
        { date: '2024-05-08', title: '赛前准备', description: '热身训练' },
        { date: '2024-05-10', title: '友谊赛', description: '快乐乒乓' }
      ],
      results: [
        { category: '儿童组', winner: '王浩', achievement: '冠军' },
        { category: '少年组', winner: '李婷', achievement: '冠军' },
        { category: '成人组', winner: '刘建国', achievement: '亚军' }
      ],
      highlights: [
        '包揽儿童组和少年组冠军',
        '刘建国惜败获得亚军'
      ]
    },
    {
      id: 4,
      date: '2024-06-15',
      title: '俱乐部内部联赛',
      location: '乒奥乒乓球俱乐部',
      description: '俱乐部内部年度赛事，检验学员训练成果',
      images: ['images/event4-1.jpg', 'images/event4-2.jpg'],
      milestones: [
        { date: '2024-06-01', title: '报名启动', description: '全员参与' },
        { date: '2024-06-15', title: '决赛日', description: '巅峰对决' }
      ],
      results: [
        { category: '精英组', winner: '张明', achievement: '冠军' },
        { category: '新星组', winner: '陈雨萱', achievement: '冠军' },
        { category: '成人组', winner: '刘建国', achievement: '冠军' }
      ],
      highlights: [
        '各学院冠军产生，竞争激烈',
        '学员整体水平明显提升'
      ]
    },
    {
      id: 5,
      date: '2024-08-25',
      title: '福州市成人乒乓球联赛',
      location: '福州市体育馆',
      description: '福州市成人业余最高水平赛事',
      images: ['images/event5-1.jpg', 'images/event5-2.jpg'],
      milestones: [
        { date: '2024-08-20', title: '备战训练', description: '针对性练习' },
        { date: '2024-08-25', title: '比赛日', description: '展现风采' }
      ],
      results: [
        { category: '男子组', winner: '刘建国', achievement: '第五名' },
        { category: '女子组', winner: '赵丽', achievement: '第七名' }
      ],
      highlights: [
        '刘建国首次进入全市前六',
        '赵丽表现出色，创造个人最佳'
      ]
    },
    {
      id: 6,
      date: '2024-10-01',
      title: '国庆亲子乒乓球活动',
      location: '乒奥乒乓球俱乐部',
      description: '亲子互动活动，增进家庭感情，推广乒乓球运动',
      images: ['images/event6-1.jpg', 'images/event6-2.jpg', 'images/event6-3.jpg'],
      milestones: [
        { date: '2024-09-28', title: '活动筹备', description: '场地布置' },
        { date: '2024-10-01', title: '活动举办', description: '欢乐时光' }
      ],
      results: [
        { category: '亲子组', winner: '王浩家庭', achievement: '冠军' },
        { category: '趣味组', winner: '李婷家庭', achievement: '亚军' }
      ],
      highlights: [
        '活动参与人数创历史新高',
        '家长和孩子共同享受运动乐趣'
      ]
    }
  ],

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
