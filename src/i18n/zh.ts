import type { Translations } from './en';

export const zh: Translations = {
  lang: 'zh',
  dir: 'ltr',
  // Site meta
  siteTitle: 'Time Series with PyTorch',
  siteDescription: 'Modern Deep Learning Toolkit for Real-World Forecasting Challenges.',

  // Navigation
  nav: {
    home: '首页',
    authors: '作者',
    erratum: '勘误',
    feedback: '反馈',
  },

  // Hero / Book intro
  hero: {
    badge: '现已上市',
    title: 'Time Series with PyTorch',
    subtitle:
      'Modern Deep Learning Toolkit for Real-World Forecasting Challenges.',
    buyNow: '立即购买',
    learnMore: '了解更多',
    publisherLabel: '出版社',
    publisher: 'Packt Publishing',
  },

  // Book description
  book: {
    sectionTitle: '关于本书',
    sectionSubtitle: '使用深度学习进行现代时间序列分析的实践之旅',
    description:
      '《Time Series with PyTorch》是您使用 PyTorch 构建强大预测和分析系统的权威指南。无论您是数据科学家、机器学习工程师还是研究人员，本书都提供了应对现实世界时间序列挑战所需的理论基础和实践技能。',
    description2:
      '本书从时间序列分析的基础知识入手，逐步介绍深度学习架构——从循环网络（RNN、LSTM）到基于 Transformer 的模型和神经常微分方程——为您提供现代时间序列工作的完整工具包。',
    features: [
      {
        icon: '📈',
        title: '经典与现代方法',
        desc: '从 ARIMA 和指数平滑到 Transformer 和神经 ODE。',
      },
      {
        icon: '🔥',
        title: '实战 PyTorch',
        desc: '所有示例均使用 PyTorch 实现，代码清晰、可复现。',
      },
      {
        icon: '🧠',
        title: '深度学习架构',
        desc: 'RNN、LSTM、GRU、时序 CNN、注意力机制和 Transformer 模型。',
      },
      {
        icon: '📊',
        title: '真实世界数据集',
        desc: '使用金融、能源、气象和传感器数据集进行实践。',
      },
      {
        icon: '⚙️',
        title: '生产就绪代码',
        desc: '学习部署时间序列模型的最佳实践。',
      },
      {
        icon: '🔬',
        title: '研究级技术',
        desc: '探索顶级研究论文中使用的前沿方法。',
      },
    ],
  },

  // Content map
  roadmap: {
    badge: '学习路径',
    sectionTitle: '内容可视化地图',
    sectionSubtitle: '不用读冗长目录，也能快速看清这本书讲什么',
    intro:
      '全书按实践路径展开：先打基础，再进入预测架构，再到泛化与表示学习，最后拓展到预测之外的任务。',
    outcomesLabel: '你将获得',
    stages: [
      {
        phase: '阶段 1',
        title: '时间序列基础',
        summary:
          '理解时间序列数据的本质、其内在挑战，以及在动手建模前如何构建可靠的评估体系。',
        chapters: ['第1章 · 时间序列入门', '第2章 · 时间序列的挑战', '第3章 · 评估时间序列模型'],
        outcomes: [
          '建立对时间结构、模式与时序数据独特陷阱的直觉认知',
          '理解分解、平稳性与多元预测的挑战',
          '在建立第一个模型前就构建可靠的训验划分与交叉验证方案',
          '针对具体问题选择并解读合适的评估指标（MAE、RMSE、MASE、分组指标）',
        ],
      },
      {
        phase: '阶段 2',
        title: 'PyTorch 与神经网络基础',
        summary:
          '从零学 PyTorch，构建并训练神经网络，深入理解支撑它们运作的优化机制。',
        chapters: ['第4章 · PyTorch 基础', '第5章 · 简单神经架构', '第6章 · 优化'],
        outcomes: [
          '流畅使用 PyTorch 张量、计算图与自动微分',
          '从零实现、训练并调试基于 PyTorch 模块的神经网络',
          '理解激活函数、损失函数与正则化技术',
          '应用梯度下降及其变体有效优化网络参数',
        ],
      },
      {
        phase: '阶段 3',
        title: 'Conformal 预测方法与神经预测架构',
        summary:
          '系统掌握主流神经预测架构，并将 Conformal 预测作为与模型无关的方法，为任意预测器生成经过校准的不确定性区间。',
        chapters: ['第7章 · Conformal 预测', '第8章 · 循环神经网络', '第9章 · Transformer', '第10章 · 其他神经结构'],
        outcomes: [
          '使用 Conformal 预测生成与分布无关的可靠预测区间',
          '用 RNN、LSTM、GRU 建模序列依赖关系',
          '实现并应用 Transformer 架构进行时序预测',
          '探索 MLP、图神经网络、KAN 与基础模型等备选方案',
          '根据数据结构与任务需求选择合适的架构类型',
        ],
      },
      {
        phase: '阶段 4',
        title: '全局模型、合成数据与概率预测',
        summary:
          '突破单序列建模的局限 — 跨序列集合训练全局模型，用 VAE 生成合成数据，并通过扩散模型输出完整的预测分布。',
        chapters: ['第11章 · 迁移学习与全局建模', '第12章 · 合成时间序列数据', '第13章 · 扩散模型'],
        outcomes: ['构建能在多条相关序列间泛化的全局预测模型', '生成逼真的合成时序数据，用于数据增强与测试', '将扩散模型作为概率预测方法，输出完整的预测分布而非单点预测'],
      },
      {
        phase: '阶段 5',
        title: '超越预测',
        summary:
          '将完整工具箱应用于分类、聚类、异常检测、嵌入表示与自监督表示学习。',
        chapters: ['第14章 · 时间序列分类', '第15章 · 时间序列聚类', '第16章 · 时序嵌入', '第17章 · 异常检测', '第18章 · 自监督学习'],
        outcomes: [
          '使用基于距离、基于特征与深度学习的方法对时间序列进行分类',
          '结合 TSCL 流程对时间序列进行聚类，并评估聚类质量',
          '学习并应用能捕捉时序动态特征的嵌入表示，支撑下游任务',
          '用监督与无监督方法检测异常，涵盖隔离森林、自适应阈值到“预测优先”异常检测等多种方法',
          '将自监督学习（对比预测编码）应用于构建无需标签的强大序列表示',
        ],
      },
    ],
  },

  // Purchase
  purchase: {
    sectionTitle: '购买本书',
    sectionSubtitle: '提供纸质版和数字版',
    options: [
      {
        name: 'Packt Publishing',
        description: '官方出版社 — 纸质书 & 电子书',
        icon: '📦',
        url: 'https://www.packtpub.com/en-de/product/time-series-with-pytorch-9781805120421',
        cta: '购买 / 访问',
        primary: true,
      },
      {
        name: 'Amazon.de',
        description: '德国站',
        icon: '🛒',
        url: 'https://amzn.eu/d/0gLhZ3LZ',
        cta: '购买',
        primary: false,
      },
      {
        name: 'Amazon.com',
        description: '美国站',
        icon: '🛒',
        url: 'https://a.co/d/03W7fd52',
        cta: '购买',
        primary: false,
      },
      {
        name: 'Amazon.co.uk',
        description: '英国站',
        icon: '🛒',
        url: 'https://amzn.eu/d/0eJoFEzT',
        cta: '购买',
        primary: false,
      },
      {
        name: "O'Reilly",
        description: 'O\'Reilly 在线数字版',
        icon: '📖',
        url: 'https://www.oreilly.com/library/view/time-series-with/9781805128182/',
        cta: '访问',
        primary: false,
      },
      {
        name: '代码仓库',
        description: 'Packt 官方配套代码仓库',
        icon: '💻',
        url: 'https://github.com/PacktPublishing/Time-Series-with-PyTorch',
        cta: '查看代码',
        primary: false,
      },
    ],
  },

  // Authors page
  authors: {
    sectionTitle: '作者介绍',
    sectionSubtitle: '认识本书背后的专家',
    expertiseLabel: '专业领域',
    learnMoreAbout: '了解更多关于作者',
    list: [
      {
        name: 'Graeme Davidson',
        title: '数据科学家 & 机器学习工程师',
        bio: 'Graeme Davidson 是 Retail Express 的首席数据科学家，在那里他依据当代统计学习实践重新设计了公司的需求预测框架。他的经历横跨认知神经科学（研究内隐奖赏加工与人类决策）、广告分析，以及以研究为导向的需求预测。他活跃于多个数据科学 Slack 和 Discord 社区，偶尔参加预测竞赛。Packt 于 2022 年底联系他撰写这本书，这正是他当年一头扎进 ARIMA 的“兔子洞”时希望就存在的书，当时他在追寻超市究竟如何进行需求预测，以及量化研究者如何建模金融市场的答案。',
        expertise: ['时间序列预测', '生产级机器学习', '数据工程', 'PyTorch', '统计建模'],
        links: {
          github: '',
          website: '',
        },
        avatar: '👨‍🔬',
      },
      {
        name: '马磊（Lei Ma）',
        title: '机器学习研究员 & 作者',
        bio: '马磊（Lei Ma）是一位由物理学家转型的数据科学家，专注于时间序列预测。他偏重理论研究，但也在住房、物流、电商和制造等多个行业应对过真实世界的预测挑战。马磊主导并交付了众多预测项目，将构建先进时间序列模型的深厚能力与面向业务全局洞察的战略方法相结合。他在线创作时间序列预测教程，并在 Graeme 邀请下加入本书合作。',
        expertise: ['深度学习', '时间序列分析', '神经 ODE', 'PyTorch', '科学机器学习'],
        links: {
          github: 'https://github.com/emptymalei',
          website: '',
        },
        avatar: '👨‍💻',
      },
    ],
  },

  // Erratum
  erratum: {
    sectionTitle: '勘误',
    sectionSubtitle: '已出版文本的更正和更新',
    intro:
      '我们努力确保所有内容的准确性。以下是已出版版本中已知的错误及其更正。如果您认为发现了未在此处列出的错误，请通过反馈页面告知我们。',
    noErrors: '此版本尚未报告任何错误。',
    submitNote: '发现错误？请通过我们的',
    submitLink: '反馈页面',
    submitSuffix: '提交。',
    table: {
      edition: '版次',
      page: '页码',
      location: '位置',
      error: '错误',
      correction: '更正',
      reported: '报告日期',
    },
    entries: [],
  },

  // Feedback
  feedback: {
    sectionTitle: '反馈',
    sectionSubtitle: '我们期待听到您的声音',
    intro:
      '有问题、发现错误或想分享您对本书的体验？请通过以下任一渠道与我们联系。',
    channels: [
      {
        icon: '💬',
        title: '综合讨论',
        desc: '关于书中内容的问题、想法或综合讨论。',
        links: [
          { name: 'GitHub 讨论区', url: 'https://github.com/orgs/time-series-modeling/discussions' },
        ],
      },
      {
        icon: '🐙',
        title: '作者 GitHub 主页',
        desc: '可通过 GitHub 直接与作者联系。',
        links: [
          { name: 'Graeme (AugustComte)', url: 'https://github.com/AugustComte' },
          { name: 'Lei (emptymalei)', url: 'https://github.com/emptymalei' },
        ],
      },
      {
        icon: '💼',
        title: '作者 LinkedIn 主页',
        desc: '可通过 LinkedIn 与作者建立联系。',
        links: [
          { name: 'Graeme Davidson', url: 'https://linkedin.com/in/graeme-r-davidson' },
          { name: 'Lei Ma', url: 'https://linkedin.com/in/leima137' },
        ],
      },
    ],
    social: {
      title: '关注我们',
      links: [
        { name: 'GitHub', icon: '⚡', url: 'https://github.com/time-series-modeling' },
      ],
    },
  },

  // Footer
  footer: {
    rights: '© 2026 Graeme Davidson & 马磊。保留所有权利。',
    builtWith: '使用',
    navigation: '导航',
  },
};
