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
        icon: '🧠',
        title: 'Build Genuine Understanding',
        desc: 'Grasp core concepts through clear explanations that develop intuition, not just surface familiarity.',
      },
      {
        icon: '📊',
        title: 'Learn with Realistic Data',
        desc: 'Work with practical datasets and develop judgement for selecting the right approach to each problem.',
      },
      {
        icon: '🚀',
        title: 'Progress Across the Full Stack',
        desc: 'Move from neural network fundamentals to advanced techniques across diverse time-series challenges.',
      },
      {
        icon: '⚙️',
        title: 'Build, Tune, and Evaluate in PyTorch',
        desc: 'Train robust models with practical code, Bayesian optimization, and reliable validation strategies.',
      },
      {
        icon: '🔁',
        title: 'Global Models, Transfer, and Representation Learning',
        desc: 'Apply cross-series transfer learning, diffusion-based synthetic generation, and self-supervised methods.',
      },
      {
        icon: '🌐',
        title: 'Beyond Forecasting Tasks',
        desc: 'Use modern time-series techniques for classification, clustering, anomaly detection, and embeddings.',
      },
    ],
  },

  // Content map
  roadmap: {
    badge: 'Roadmap',
    sectionTitle: 'Visual Content Map',
    sectionSubtitle: 'See what you will learn without reading a long table of contents',
    intro:
      'The book is organized as a practical progression: foundations, forecasting architectures, advanced generalization techniques, and beyond-forecasting applications.',
    outcomesLabel: 'What you gain',
    stages: [
      {
        phase: 'Stage 1',
        title: 'Time Series Foundations',
        summary:
          'Understand what time-series data is, the challenges it presents, and how to evaluate models reliably before building anything.',
        chapters: ['1 · Time Series for Everyone', '2 · The Challenge of Time Series', '3 · Evaluating Time-Series Models'],
        outcomes: [
          'Build grounded intuition about temporal structure, patterns, and the unique pitfalls of time-series data',
          'Understand decomposition, stationarity, and multivariate forecasting challenges',
          'Set up trustworthy train/validation splits and cross-validation schemes before the first model',
          'Choose and interpret error metrics (MAE, RMSE, MASE, grouped metrics) appropriate to each problem',
        ],
      },
      {
        phase: 'Stage 2',
        title: 'PyTorch and Neural Fundamentals',
        summary:
          'Learn PyTorch from scratch, build and train neural networks, and develop deep understanding of the optimization mechanics behind them.',
        chapters: ['4 · PyTorch Fundamentals', '5 · Simple Neural Architecture', '6 · Optimization'],
        outcomes: [
          'Work fluently with PyTorch tensors, computational graphs, and autograd',
          'Implement, train, and debug neural networks from scratch using PyTorch modules',
          'Understand activation functions, loss functions, and regularization techniques',
          'Apply gradient descent and its variants to optimize network parameters effectively',
        ],
      },
      {
        phase: 'Stage 3',
        title: 'Conformal Prediction and Neural Forecasting Architectures',
        summary:
          'Progress through the major neural forecasting architectures and learn conformal prediction as a model-agnostic method for producing calibrated uncertainty estimates.',
        chapters: ['7 · Conformal Prediction', '8 · Recurrent Neural Networks', '9 · Transformers', '10 · Other Neural Structures'],
        outcomes: [
          'Produce reliable, distribution-free prediction intervals with conformal prediction',
          'Model sequential dependencies with RNNs, LSTMs, and GRUs',
          'Implement and apply the Transformer architecture for time-series forecasting',
          'Explore MLP, graph neural network, KAN, and foundation model alternatives',
          'Select the right architectural family based on data structure and task requirements',
        ],
      },
      {
        phase: 'Stage 4',
        title: 'Global Models, Synthetic Data and Probabilistic Forecasting',
        summary:
          'Go beyond single-series modeling — train across collections of series, generate synthetic data with VAEs, and produce full forecast distributions with diffusion models.',
        chapters: ['11 · Transfer Learning and Global Modelling', '12 · Synthetic Time Series Data', '13 · Diffusion Models'],
        outcomes: ['Build global forecasting models that generalize across many related series', 'Generate realistic synthetic time-series data for augmentation and testing', 'Apply diffusion models as a probabilistic forecasting method to produce full forecast distributions'],
      },
      {
        phase: 'Stage 5',
        title: 'Beyond Forecasting',
        summary:
          'Apply the full toolkit to classification, clustering, anomaly detection, embeddings, and self-supervised representation learning.',
        chapters: ['14 · Time Series Classification', '15 · Time Series Clustering', '16 · Embeddings for Time Series', '17 · Anomaly Detection', '18 · Self-Supervised Learning'],
        outcomes: [
          'Classify time series using distance-based, feature-based, and deep learning approaches',
          'Cluster time series with the TSCL pipeline and evaluate cluster quality',
          'Learn and apply embeddings that capture temporal dynamics for downstream tasks',
          'Detect anomalies with both supervised and unsupervised methods, from isolation forests to forecast-first detection',
          'Apply self-supervised learning (contrastive predictive coding) to build powerful representations without labels',
        ],
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
        url: 'https://www.packtpub.com/en-de/product/time-series-with-pytorch-9781805120421',
        cta: 'Buy / Access',
        primary: true,
      },
      {
        name: 'Amazon.de',
        description: 'German storefront',
        icon: '🛒',
        url: 'https://amzn.eu/d/0gLhZ3LZ',
        cta: 'Buy',
        primary: false,
      },
      {
        name: 'Amazon.com',
        description: 'US storefront',
        icon: '🛒',
        url: 'https://a.co/d/03W7fd52',
        cta: 'Buy',
        primary: false,
      },
      {
        name: 'Amazon.co.uk',
        description: 'UK storefront',
        icon: '🛒',
        url: 'https://amzn.eu/d/0eJoFEzT',
        cta: 'Buy',
        primary: false,
      },
      {
        name: "O'Reilly",
        description: 'Digital library edition',
        icon: '📖',
        url: 'https://www.oreilly.com/library/view/time-series-with/9781805128182/',
        cta: 'Access',
        primary: false,
      },
      {
        name: 'Codebase',
        description: 'Official Packt companion repository',
        icon: '💻',
        url: 'https://github.com/PacktPublishing/Time-Series-with-PyTorch',
        cta: 'View Code',
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
        title: 'Lead Data Scientist, Retail Express',
        bio: `Graeme Davidson is a Lead Data Scientist at Retail Express, where he redesigned the company's demand forecasting framework in line with contemporary statistical learning practices. His background spans cognitive neuroscience, researching implicit reward processing and human decision-making, through advertising analytics to research-focused demand forecasting. He is an active contributor to several data science Slack and Discord communities, an occasional competitor in forecasting competitions, and was approached by Packt in late 2022 to write the book he wished had existed when he first fell down an ARIMA rabbit hole chasing answers about how supermarkets actually forecast demand, and how a quantitative researcher models financial markets.`,
        expertise: ['Time Series Forecasting', 'Production ML', 'Data Engineering', 'PyTorch', 'Statistical Modeling'],
        links: {
          github: 'https://github.com/AugustComte',
          linkedin: 'https://linkedin.com/in/graeme-r-davidson',
          website: '',
        },
        avatar: '👨‍🔬',
      },
      {
        name: 'Lei Ma',
        title: 'Physicist-Turned Time Series Data Scientist',
        bio: `Lei Ma is a physicist-turned data scientist specializing in time series forecasting. He is a theorist but has tackled real-world forecasting challenges across a variety of industries like housing, logistics, ecommerce, and manufacturing. Lei has led and delivered numerous forecasting projects where he combines deep expertise in building advanced time series models with a strategic approach to delivering holistic business insights. Lei creates time series forecasting tutorials online and joined the venture when Graeme approached him to collaborate on this book.`,
        expertise: ['Deep Learning', 'Time Series Analysis', 'Neural ODEs', 'PyTorch', 'Scientific ML'],
        links: {
          github: 'https://github.com/emptymalei',
          linkedin: 'https://linkedin.com/in/leima137',
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
        icon: '💬',
        title: 'General Discussion',
        desc: 'Questions, ideas, or general discussion about the book content.',
        links: [
          { name: 'GitHub Discussions', url: 'https://github.com/orgs/time-series-modeling/discussions' },
        ],
      },
      {
        icon: '🐙',
        title: 'Author GitHub Profiles',
        desc: 'Connect with the authors directly on GitHub.',
        links: [
          { name: 'Graeme (AugustComte)', url: 'https://github.com/AugustComte' },
          { name: 'Lei (emptymalei)', url: 'https://github.com/emptymalei' },
        ],
      },
      {
        icon: '💼',
        title: 'Author LinkedIn Profiles',
        desc: 'Connect with the authors on LinkedIn.',
        links: [
          { name: 'Graeme Davidson', url: 'https://linkedin.com/in/graeme-r-davidson' },
          { name: 'Lei Ma', url: 'https://linkedin.com/in/leima137' },
        ],
      },
    ],
    social: {
      title: 'Follow Us',
      links: [
        { name: 'GitHub', icon: '⚡', url: 'https://github.com/time-series-modeling' },
      ],
    },
  },

  // Footer
  footer: {
    rights: '© 2026 Lei Ma & Graeme Davidson. All rights reserved.',
    builtWith: 'Built with',
    navigation: 'Navigation',
  },
};

export type Translations = typeof en;
