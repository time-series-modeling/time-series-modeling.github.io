export const en = {
  lang: 'en',
  dir: 'ltr',
  // Site meta
  siteTitle: 'Time Series with PyTorch',
  siteDescription:
    'A comprehensive guide to time series forecasting and analysis using PyTorch and deep learning.',

  // Navigation
  nav: {
    home: 'Home',
    authors: 'Authors',
    erratum: 'Erratum',
    feedback: 'Feedback',
  },

  // Hero / Book intro
  hero: {
    badge: 'Now Available',
    title: 'Time Series with PyTorch',
    subtitle:
      'Master time series analysis and forecasting using PyTorch. From classical methods to state-of-the-art deep learning architectures.',
    buyNow: 'Buy Now',
    learnMore: 'Learn More',
    publisherLabel: 'Published by',
    publisher: 'Packt Publishing',
  },

  // Book description
  book: {
    sectionTitle: 'About the Book',
    sectionSubtitle:
      'A hands-on journey through modern time series analysis with deep learning',
    description: `Time Series with PyTorch is your definitive guide to building powerful forecasting and analysis systems using PyTorch. Whether you are a data scientist, machine learning engineer, or researcher, this book provides the theoretical foundations and practical skills to tackle real-world time series challenges.`,
    description2: `Starting from the fundamentals of time series analysis, the book progressively introduces deep learning architectures — from recurrent networks (RNNs, LSTMs) to transformer-based models and neural ordinary differential equations — giving you a complete toolkit for modern time series work.`,
    features: [
      {
        icon: '📈',
        title: 'Classical & Modern Methods',
        desc: 'From ARIMA and exponential smoothing to Transformers and Neural ODEs.',
      },
      {
        icon: '🔥',
        title: 'Hands-on PyTorch',
        desc: 'All examples implemented in PyTorch with clean, reproducible code.',
      },
      {
        icon: '🧠',
        title: 'Deep Learning Architectures',
        desc: 'RNNs, LSTMs, GRUs, Temporal CNNs, Attention and Transformer models.',
      },
      {
        icon: '📊',
        title: 'Real-world Datasets',
        desc: 'Practice with financial, energy, weather, and sensor datasets.',
      },
      {
        icon: '⚙️',
        title: 'Production-ready Code',
        desc: 'Learn best practices for deploying time series models.',
      },
      {
        icon: '🔬',
        title: 'Research-grade Techniques',
        desc: 'Explore cutting-edge methods used in top research papers.',
      },
    ],
  },

  // Purchase
  purchase: {
    sectionTitle: 'Get Your Copy',
    sectionSubtitle: 'Available in print and digital formats',
    options: [
      {
        name: 'Packt Publishing',
        description: 'Official publisher — print & eBook',
        icon: '📦',
        url: '#',
        primary: true,
      },
      {
        name: 'Amazon',
        description: 'Paperback and Kindle editions',
        icon: '🛒',
        url: '#',
        primary: false,
      },
      {
        name: 'Google Books',
        description: 'Digital edition',
        icon: '📖',
        url: '#',
        primary: false,
      },
    ],
  },

  // Authors page
  authors: {
    sectionTitle: 'About the Authors',
    sectionSubtitle: 'Meet the experts behind this book',
    expertiseLabel: 'Expertise',
    learnMoreAbout: 'Learn more about the authors',
    list: [
      {
        name: 'Graeme Davidson',
        title: 'Data Scientist & ML Engineer',
        bio: `Graeme Davidson is an experienced data scientist and machine learning engineer who specialises in time series forecasting for industry applications. With a background spanning finance, energy, and manufacturing, Graeme brings practical insights into building robust, production-ready forecasting systems using modern deep learning techniques.`,
        expertise: ['Time Series Forecasting', 'Production ML', 'Data Engineering', 'PyTorch', 'Statistical Modeling'],
        links: {
          github: '',
          twitter: '',
          website: '',
        },
        avatar: '👨‍🔬',
      },
      {
        name: 'Lei Ma',
        title: 'Machine Learning Researcher & Author',
        bio: `Lei Ma is a machine learning researcher and educator with expertise in deep learning, time series analysis, and scientific computing. He has contributed to open-source projects and research in neural networks applied to physical and temporal data. Lei is passionate about making advanced machine learning concepts accessible through clear explanations and practical examples.`,
        expertise: ['Deep Learning', 'Time Series Analysis', 'Neural ODEs', 'PyTorch', 'Scientific ML'],
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
    sectionTitle: 'Erratum',
    sectionSubtitle: 'Corrections and updates to the published text',
    intro:
      'We strive for accuracy in all our work. Below you will find any known errors in the published editions along with their corrections. If you believe you have found an error not listed here, please use the Feedback page to let us know.',
    noErrors: 'No errors have been reported yet for this edition.',
    submitNote:
      'Found an error? Please submit it via our ',
    submitLink: 'feedback page',
    submitSuffix: '.',
    table: {
      edition: 'Edition',
      page: 'Page',
      location: 'Location',
      error: 'Error',
      correction: 'Correction',
      reported: 'Reported',
    },
    entries: [
      // Example entry — remove when real errata are available
      // {
      //   edition: '1st',
      //   page: '42',
      //   location: 'Code listing 3.2',
      //   error: 'Variable `x` should be `y`.',
      //   correction: 'Replace `x` with `y` in the function body.',
      //   reported: '2025-01-15',
      // },
    ] as Array<{
      edition: string;
      page: string;
      location: string;
      error: string;
      correction: string;
      reported: string;
    }>,
  },

  // Feedback
  feedback: {
    sectionTitle: 'Feedback',
    sectionSubtitle: 'We would love to hear from you',
    intro:
      'Have a question, found an error, or want to share your experience with the book? Reach out to us through any of the channels below.',
    channels: [
      {
        icon: '🐛',
        title: 'Report an Error',
        desc: 'Found a mistake in the book? Please open a GitHub issue so we can track and correct it.',
        linkText: 'Open GitHub Issue',
        url: 'https://github.com/time-series-modeling/time-series-modeling.github.io/issues/new',
      },
      {
        icon: '💬',
        title: 'General Discussion',
        desc: 'Questions, ideas, or general discussion about the book content.',
        linkText: 'GitHub Discussions',
        url: 'https://github.com/time-series-modeling/time-series-modeling.github.io/discussions',
      },
      {
        icon: '📧',
        title: 'Email the Authors',
        desc: 'For private inquiries, you can reach the authors directly.',
        linkText: 'Contact Us',
        url: 'mailto:contact@example.com',
      },
    ],
    social: {
      title: 'Follow Us',
      links: [
        { name: 'GitHub', icon: '⚡', url: 'https://github.com/time-series-modeling' },
        { name: 'Twitter / X', icon: '🐦', url: '#' },
      ],
    },
  },

  // Footer
  footer: {
    rights: '© 2025 Lei Ma & Graeme Davidson. All rights reserved.',
    builtWith: 'Built with',
    navigation: 'Navigation',
  },
};

export type Translations = typeof en;
