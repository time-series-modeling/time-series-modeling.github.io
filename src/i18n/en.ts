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
    workshop: 'Workshop',
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
        title: 'Lead Data Scientist, Orion Engineered Carbons',
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
    // Pages refer to the PDF the reporter reviewed and may differ slightly by printing.
    entries: [
      // Chapter 2
      {
        edition: '1st',
        page: '37',
        location: 'Ch 2, Partial autocorrelation',
        error: "States that any significant PACF spike at lag k means a lagged term should be used.",
        correction: "Too absolute. A significant spike suggests a lag may help, but other features can do the same job. In retail, a lag-7 spike is usually a day-of-week effect and is often better handled with day-of-week dummies.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '41',
        location: 'Ch 2, Stationarity (air passengers histogram)',
        error: "Says the data is not normally distributed because of its strong seasonal and trend components.",
        correction: "Trend and seasonality don't by themselves rule out a normal marginal distribution. The histogram simply isn't normal; the trend and seasonality are why the series is non-stationary.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '-',
        location: 'Ch 2, Fig 2.17 (sales by year boxplot)',
        error: "Title and x-axis label read ‘Day of Week’ on a by-year plot.",
        correction: "Title should read ‘Sales Distribution by Year’ and the x-axis label ‘Year’.",
        reported: '2026-08',
      },
      // Chapter 3
      {
        edition: '1st',
        page: '57',
        location: 'Ch 3, Partitioning data',
        error: "Out-of-sample abbreviated as ‘OSS’.",
        correction: "Should read ‘OOS’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '69',
        location: 'Ch 3, Error metrics',
        error: "Says absolute-error metrics struggle with intermittent demand because the median ‘does not represent the distribution well’.",
        correction: "The concrete problem: the median of an intermittent series can be zero, so minimising absolute error can favour a forecast of all zeros. See Kolassa (2020), International Journal of Forecasting.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '71',
        location: 'Ch 3, Absolute percentage error (MAPE code)',
        error: "The MAPE code uses yt_actuals, yt_A and yt_B, but the code that creates them isn't printed.",
        correction: "Run this first: t = np.linspace(0, 2, 3); yt_actuals = 0.01 + 0.1 * t; yt_A = 0.02 + 0.1 * t; yt_B = 0.01005 + 0.135 * t + 0.005 * t**2",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '-',
        location: 'Ch 3, Absolute percentage error (+1 shift)',
        error: "Adding 1 to actuals and forecasts reads as a fix for MAPE. ‘Boomtown! Or maybe not...’ moves on to a different problem and never withdraws it.",
        correction: "The +1 shift is a hack, not a fix. The constant is arbitrary, and on low-volume or intermittent data changing it can change which model wins. If used at all, apply it as a modelling transform and invert it before evaluation, never inside the metric.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '73',
        location: 'Ch 3, sMAPE callout',
        error: "sMAPE is referred to throughout the book but never defined.",
        correction: "sMAPE = (100/n) Σ 2|y_t − ŷ_t| / (|y_t| + |ŷ_t|). It is bounded at 200%, undefined when actual and forecast are both zero, and penalises under-forecasts more than over-forecasts.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '75',
        location: 'Ch 3, Squared error',
        error: "States that minimising squared error implicitly assumes errors follow a Gaussian distribution.",
        correction: "Wrong. Minimising squared error targets the conditional mean whatever the error distribution. Gaussian errors make least squares the maximum-likelihood estimator, which is a separate point. The scale-dependence point in the same paragraph is unrelated.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '78',
        location: 'Ch 3, Extrinsic metrics (MASE, MdMASE, RMSSE formulas)',
        error: "y_t is used for both test observations (numerator, t = 1..h) and training observations (denominator, t = 2..T). Labels also print twice, e.g. ‘MASE - MASE =’.",
        correction: "The numerator runs over the h test periods. The denominator is the mean one-step naive difference over the T training observations: (1/(T−1)) Σ_{j=2..T} |y_j − y_{j−1}|. Ignore the duplicated labels.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '80',
        location: 'Ch 3, Interpreting the metrics (MASE)',
        error: "Says a MASE below 1 means the forecast beats ‘the average naive forecast’.",
        correction: "The denominator is the in-sample one-step naive MAE on the training data. MASE < 1 means the out-of-sample MAE is below that in-sample naive MAE, which is usually a harder bar than beating a naive forecast over the same test period.",
        reported: '2026-08',
      },
      // Chapter 4
      {
        edition: '1st',
        page: '103',
        location: 'Ch 4, Chain rule callout',
        error: "× is used for scalar multiplication, which reads as a cross product; the following page uses ·.",
        correction: "Read × as ordinary multiplication, the same as ·.",
        reported: '2026-08',
      },
      // Chapter 5
      {
        edition: '1st',
        page: '-',
        location: 'Ch 5, Table 5.1',
        error: "Column header reads ‘MAPE 5’.",
        correction: "Should read ‘MAPE’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '-',
        location: 'Ch 5, Fig 5.5 (single-neuron air passengers forecast)',
        error: "Gaps between the in-sample, validation and test predictions aren't explained (text reads ‘gapos caused by lags’).",
        correction: "Each split loses its first 12 observations to the lag window, so no prediction is made for them. The text should read ‘gaps caused by lags’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '129',
        location: 'Ch 5, Single-neuron results',
        error: "Says applying a log transformation ‘drops error’.",
        correction: "A log transform can help, but back-transformed forecasts estimate the median, not the mean. If you evaluate with squared error, bias-adjust when back-transforming. The same applies to Box-Cox in Chapter 2.",
        reported: '2026-08',
      },
      // Chapter 6
      {
        edition: '1st',
        page: '155',
        location: 'Ch 6, Trainable activation functions note',
        error: "‘There are a plethora of activation functions in pytorch we could you that you can look over here’.",
        correction: "‘There are plenty of activation functions in PyTorch; you can look over them here’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '-',
        location: 'Ch 6, Figs 6.15 and 6.16 (optimiser comparison)',
        error: "Line colours differ between the two figures and Adagrad is missing from Fig 6.16.",
        correction: "Each optimiser should keep the same colour in both figures, and Fig 6.16 should include Adagrad.",
        reported: '2026-08',
      },
      // Chapter 7
      {
        edition: '1st',
        page: '195',
        location: 'Ch 7, Intuition behind conformal prediction',
        error: "Absolute error written as AE = y − ŷ.",
        correction: "AE = |y − ŷ|.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '196',
        location: 'Ch 7, Intuition (confidence threshold)',
        error: "Says δ = 0.8 includes ‘values within the top 80% of our ranking ladder’.",
        correction: "It includes the 80% of values with the lowest non-conformity scores, i.e. below the 0.8 threshold; values above it are non-conforming. This matches the later statement in the same chapter.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '197',
        location: 'Ch 7, Formal definition of the prediction set Γ',
        error: "Γ is hard to follow and the ‘paired training values’ (x_i, y_i) are ambiguous.",
        correction: "(x_0, y_0) ... (x_{n−1}, y_{n−1}) are the n observed (calibration) pairs. f_n(y) is the non-conformity score of test point x_n paired with candidate label y. Γ = { y : |{ i < n : f_i < f_n(y) }| / n < δ }, i.e. every candidate whose score exceeds fewer than a fraction δ of the observed scores.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '200',
        location: 'Ch 7, Conformal intervals with quartiles',
        error: "‘the upper and lower bounds of an interval, that deem acceptable’.",
        correction: "‘the upper and lower bounds of an interval that we deem acceptable’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '207',
        location: 'Ch 7, EnbPI process steps',
        error: "Step 6 implies the aggregated ensemble predictions give the prediction intervals.",
        correction: "The aggregated predictions are the point forecast. The interval comes in the next step, by adding and subtracting the (1 − α) quantile of the out-of-bag residuals.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '207-208',
        location: 'Ch 7, EnbPI',
        error: "The sentence on EnbPI achieving approximate exchangeability is repeated across the page break.",
        correction: "Ignore the second occurrence.",
        reported: '2026-08',
      },
      // Chapter 8
      {
        edition: '1st',
        page: '223',
        location: 'Ch 8, RNN and differential equations callout (incl. Eq 8.2)',
        error: "Derivative written as d(t)/dt.",
        correction: "Should be dh(t)/dt.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '-',
        location: 'Ch 8, Eq 8.2',
        error: "W_i is not defined.",
        correction: "W_i is the input weight matrix, W_h the recurrent (hidden-to-hidden) weight matrix and b the bias, as in Eq 8.1.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '237',
        location: 'Ch 8, Forecasting using RNN',
        error: "‘With all the ingradients prepared...’ is formatted as code.",
        correction: "Should be body text, and ‘ingredients’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '241',
        location: 'Ch 8, RNN vs naive forecaster metrics',
        error: "MAPE is reported for a sine wave oscillating around zero.",
        correction: "MAPE (and sMAPE) isn't meaningful when actuals cross zero. Compare on MAE and MSE.",
        reported: '2026-08',
      },
      // Chapter 11
      {
        edition: '1st',
        page: '323',
        location: 'Ch 11, Pretraining with external data',
        error: "The M4 monthly dataset is described as retail data.",
        correction: "M4 monthly mixes demographic, finance, industry, macro, micro and other series. It isn't a retail dataset.",
        reported: '2026-08',
      },
      // Chapter 13
      {
        edition: '1st',
        page: '-',
        location: 'Ch 13, Table 13.1',
        error: "MAPE and sMAPE are reported for a sine wave oscillating between −1 and 1.",
        correction: "Not meaningful when actuals cross zero. Compare on MAE and MSE only.",
        reported: '2026-08',
      },
      // Chapter 14
      {
        edition: '1st',
        page: '391',
        location: 'Ch 14, Distance comparison (calculate_distances output)',
        error: "WDTW appears in the code and results without being defined.",
        correction: "WDTW is weighted DTW (Jeong et al., 2011). Instead of a hard Sakoe-Chiba band it multiplies each pointwise cost by a logistic penalty w(|i − j|) = 1 / (1 + e^(−g(|i − j| − m/2))), so off-diagonal alignments cost more. g sets the penalty (0.1 here); m is the series length.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '391',
        location: 'Ch 14, Distance comparison (calculate_distances output)',
        error: "The distance values are printed side by side as if they were comparable.",
        correction: "They aren't on a common scale. aeon returns accumulated squared cost for DTW but the L2 norm for Euclidean (3.518² = 12.38 > 8.68), and WDTW with m = 100, g = 0.1 scales near-diagonal costs by about 0.0067. Compare each measure across series, not measures against each other.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '391',
        location: 'Ch 14, Distance comparison (calculate_distances output)',
        error: "The pair shown is the original series against a half-amplitude copy (s1 vs s3).",
        correction: "DTW can't correct an amplitude difference; warping the time axis does nothing about a vertical rescale. The phase-shifted pair (s1 vs s2: Euclidean 8.33, DTW 7.12, DTW 5% window 23.68) is the one that shows what DTW is for.",
        reported: '2026-08',
      },
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

  // Workshops
  workshop: {
    navTitle: 'Workshop',
    title: 'Packt Nov 2026 · Day 2: visual companion',
    subtitle:
      'Neural networks, foundation models and advanced topics for retail demand forecasting. Packt forecasting bootcamp, 28–29 November 2026.',
    intro:
      'Short animations and interactive figures that go with the Day 2 labs. All numbers come from the reference run of the workshop notebooks on the full dataset (all 17,241 eligible series).',
    videosTitle: 'Animations',
    explore: 'Explore the interactive figures',
    back: 'Back to the Day 2 overview',
    pages: {
      data: { title: 'Day 2 · The data', lede: "Two years of a retailer's weekly sales: 17,241 series with prices, promotions and a five-level product hierarchy. Every lab uses all of them.", card: 'Weekly totals and the train / test split, one example series per demand type with real forecasts, demand types, velocity classes and the hierarchy.' },
      methods: { title: 'Day 2 · The methods', lede: 'One idea per widget. Move the sliders before you read the takeaway. These widgets use simulated or simplified data.', card: 'Rolling-origin evaluation, RMSSE, global training windows, NHITS stacks, quantile loss, the conformal coverage cap, reconciliation, Elo ratings and ensembles.' },
      models: { title: 'Day 2 · The models', lede: 'How each model in the workshop works, one interactive widget per model. Real series from the workshop data where possible; illustrations are labelled.', card: 'Naive and SeasonalNaive, AutoETS, LightGBM with its monotone constraint, N-BEATS, NHITS, DLinear, how covariates enter, Chronos-2 and TimesFM.' },
      results: { title: 'Day 2 · The results', lede: 'Reference-run numbers from the workshop notebooks (all 17,241 series). Mean RMSSE unless noted; lower is better. Differences below about 0.02 are within seed noise.', card: 'The final leaderboard, every metric for every model, the day as a journey, and one chart per lab: training cost, tuning, promotions, foundation models, reconciliation, interval coverage and model selection.' },
      embedding: { title: 'Day 2 · Bonus: delay embeddings', lede: "Takens' theorem and its tools (mutual information, false nearest neighbours, recurrence plots, simplex and S-map forecasting) tried on all 17,241 workshop series, with an honest verdict on what they show.", card: 'Build a delay embedding of a real series, choose τ and m, read a recurrence plot, test for nonlinearity against surrogates, and see how embedding-based forecasts compare with the workshop models.' },
    },
    footnote: 'Reference run on the full dataset (17,241 series), 21 November 2026: neuralforecast 3.2.2, mlforecast 1.1.0, statsforecast 2.1.1, hierarchicalforecast 1.5.3. Lab 04 (Chronos-2 through timecopilot, TimesFM 2.5 200M) ran on the same data the same day, on CPU.',
    videos: [
      { file: '01_dataset_tour.mp4', title: 'The dataset', desc: 'Two years of weekly sales for the whole store (18,692 series, 17,241 of them modelled), the train / validation / test split, and one series of each demand type.' },
      { file: '03_nhits_stacks.mp4', title: 'NHITS, stack by stack', desc: 'The first stack draws the slow shape with a few points; later stacks add finer detail until the stacks sum to the series.' },
      { file: '02_conformal_cap.mp4', title: 'Why per-series conformal tops out near 75 %', desc: 'With only three calibration errors per series, no margin can promise 80 %. More scores, or pooling them across series, fixes it.' },
      { file: '04_reconciliation.mp4', title: 'Reconciliation', desc: 'Item and total forecasts that disagree, made to add up three ways: BottomUp, TopDown and MinTrace.' },
    ],
  },

  // Footer
  footer: {
    rights: '© 2026 Lei Ma & Graeme Davidson. All rights reserved.',
    builtWith: 'Built with',
    navigation: 'Navigation',
  },
};

export type Translations = typeof en;
