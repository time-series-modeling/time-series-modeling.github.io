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
      'Modern Deep Learning Toolkit for Real-World Forecasting Challenges.',
    buyNow: 'Buy Now',
    learnMore: 'Learn More',
    publisherLabel: 'Published by',
    publisher: 'Packt Publishing',
  },

  // Book description
  book: {
    sectionTitle: 'About the Book',
    sectionSubtitle:
      'A theory-grounded, intuition-first guide with high-quality practical PyTorch code',
    description: `Neural networks are powerful tools for time-series forecasting, but applying them effectively requires both practical experience and a clear understanding of architectures, training strategies, and evaluation methods. This book brings these ideas together in a structured and practical way. Starting with PyTorch fundamentals, you will build neural networks from scratch and progress through recurrent networks, attention mechanisms, and transformers before exploring forecasting architectures such as N-BEATS, N-HiTS, and the Temporal Fusion Transformer.`,
    description2: `Along the way, you will learn robust hyperparameter tuning, conformal prediction for uncertainty estimation, and reliable evaluation practices. Unlike most forecasting books, this text also explores transfer learning across collections of series, synthetic data generation with diffusion models, and self-supervised representation learning. Beyond forecasting, later chapters cover classification, clustering, anomaly detection, and embeddings for large-scale time-series modeling, with theory reinforced through hands-on experimentation and implementation.`,
    features: [
      {
        icon: '🧱',
        title: 'From PyTorch Basics to Transformers',
        desc: 'Build networks from scratch and progress through RNNs, attention, and transformer models.',
      },
      {
        icon: '📚',
        title: 'Modern Forecasting Architectures',
        desc: 'Deep dives into N-BEATS, N-HiTS, and the Temporal Fusion Transformer.',
      },
      {
        icon: '🎯',
        title: 'Reliable Model Development',
        desc: 'Learn robust tuning, conformal prediction, and trustworthy evaluation workflows.',
      },
      {
        icon: '🔁',
        title: 'Transfer Learning Across Series',
        desc: 'Adapt models across related time-series collections to improve reuse and performance.',
      },
      {
        icon: '🧪',
        title: 'Synthetic Data and Self-Supervision',
        desc: 'Explore diffusion-based generation and self-supervised representation learning.',
      },
      {
        icon: '🌐',
        title: 'Beyond Forecasting',
        desc: 'Apply time-series methods to classification, clustering, anomaly detection, and embeddings.',
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
        bio: `Graeme Davidson is a Lead Data Scientist at Retail Express, where he redesigned the company's demand forecasting framework in line with contemporary statistical learning practices. His background spans cognitive neuroscience, researching implicit reward processing and human decision-making, through advertising analytics to research-focused demand forecasting. He is an active contributor to several data science Slack and Discord communities, an occasional competitor in forecasting competitions, and was approached by Packt in late 2022 to write the book he wished had existed when he first fell down an ARIMA rabbit hole chasing answers about how supermarkets actually forecast demand, and how a quantitative researcher models financial markets.`,
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
        bio: `Lei Ma is a physicist-turned data scientist specializing in time series forecasting. He is a theorist but has tackled real-world forecasting challenges across a variety of industries like housing, logistics, ecommerce, and manufacturing. Lei has led and delivered numerous forecasting projects where he combines deep expertise in building advanced time series models with a strategic approach to delivering holistic business insights. Lei creates time series forecasting tutorials online and joined the venture when Graeme approached him to collaborate on this book.`,
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
