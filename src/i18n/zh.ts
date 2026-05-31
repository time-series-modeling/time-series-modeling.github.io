import type { Translations } from './en';

export const zh: Translations = {
  lang: 'zh',
  dir: 'ltr',
  // Site meta
  siteTitle: 'PyTorch 时间序列',
  siteDescription: '使用 PyTorch 和深度学习进行时间序列预测与分析的全面指南。',

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
    title: 'PyTorch 时间序列',
    subtitle:
      '使用 PyTorch 掌握时间序列分析与预测。从经典方法到最前沿的深度学习架构，一网打尽。',
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
      '《PyTorch 时间序列》是您使用 PyTorch 构建强大预测和分析系统的权威指南。无论您是数据科学家、机器学习工程师还是研究人员，本书都提供了应对现实世界时间序列挑战所需的理论基础和实践技能。',
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
        url: '#',
        primary: true,
      },
      {
        name: 'Amazon',
        description: '平装本和 Kindle 版',
        icon: '🛒',
        url: '#',
        primary: false,
      },
      {
        name: 'Google Books',
        description: '数字版',
        icon: '📖',
        url: '#',
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
        name: '马磊（Lei Ma）',
        title: '机器学习研究员 & 作者',
        bio: '马磊是一位专注于深度学习、时间序列分析和科学计算的机器学习研究员和教育者。他为神经网络在物理和时序数据中应用的开源项目和研究做出了贡献。马磊热衷于通过清晰的解释和实际示例，让高级机器学习概念变得易于理解。',
        expertise: ['深度学习', '时间序列分析', '神经 ODE', 'PyTorch', '科学机器学习'],
        links: {
          github: 'https://github.com/emptymalei',
          twitter: '',
          website: '',
        },
        avatar: '👨‍💻',
      },
      {
        name: 'Graeme Davidson',
        title: '数据科学家 & 机器学习工程师',
        bio: 'Graeme Davidson 是一位经验丰富的数据科学家和机器学习工程师，专注于行业应用中的时间序列预测。凭借横跨金融、能源和制造业的背景，Graeme 为使用现代深度学习技术构建稳健、生产就绪的预测系统带来了实践洞见。',
        expertise: ['时间序列预测', '生产级机器学习', '数据工程', 'PyTorch', '统计建模'],
        links: {
          github: '',
          twitter: '',
          website: '',
        },
        avatar: '👨‍🔬',
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
    rights: '© 2025 马磊 & Graeme Davidson。保留所有权利。',
    builtWith: '使用',
    navigation: '导航',
  },
};
