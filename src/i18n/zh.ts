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
          twitter: '',
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
          twitter: '',
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
        icon: '🐛',
        title: '报告错误',
        desc: '在书中发现错误？请提交 GitHub Issue，以便我们跟踪和更正。',
        linkText: '提交 GitHub Issue',
        url: 'https://github.com/time-series-modeling/time-series-modeling.github.io/issues/new',
      },
      {
        icon: '💬',
        title: '综合讨论',
        desc: '关于书中内容的问题、想法或综合讨论。',
        linkText: 'GitHub 讨论区',
        url: 'https://github.com/time-series-modeling/time-series-modeling.github.io/discussions',
      },
      {
        icon: '📧',
        title: '发邮件给作者',
        desc: '如有私密咨询，您可以直接联系作者。',
        linkText: '联系我们',
        url: 'mailto:contact@example.com',
      },
    ],
    social: {
      title: '关注我们',
      links: [
        { name: 'GitHub', icon: '⚡', url: 'https://github.com/time-series-modeling' },
        { name: 'Twitter / X', icon: '🐦', url: '#' },
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
