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
    // Pages are printed page numbers in the 1st edition PDF.
    entries: [
      {
        edition: '1st',
        page: '31',
        location: "Ch 2, Figure 2.15 (sales by day of week)",
        error: "Days are ordered by first appearance in the data, so the week starts on Tuesday.",
        correction: "Add order=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] to sns.boxplot(...).",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '32',
        location: "Ch 2, Figure 2.17 (sales by year)",
        error: "Title and x-axis label read ‘Day of Week’ on a by-year plot.",
        correction: "Title should read ‘Sales Distribution by Year’ and the x-axis label ‘Year’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '37',
        location: "Ch 2, Partial autocorrelation",
        error: "‘Any significant spikes at lag k in a PACF plot suggest that a lagged term should be used.’",
        correction: "Replace with: ‘Significant spikes at lag k in a PACF plot suggest that a lagged term may be useful, although a seasonal spike (e.g., lag 7 in daily retail data) is often better handled with day-of-week features.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '41',
        location: "Ch 2, Stationarity",
        error: "‘...shows that the data is not normally distributed because of its strong seasonal and trend components.’",
        correction: "Replace with: ‘...shows that the data is not normally distributed.’ Trend and seasonality make the series non-stationary; they don't by themselves determine its distribution.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '57',
        location: "Ch 3, Partitioning data",
        error: "‘We may use OSS testing...’",
        correction: "Replace ‘OSS’ with ‘OOS’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '69',
        location: "Ch 3, Error metrics",
        error: "‘...problematic for sparse data (intermittent demand), where the median does not represent the distribution well.’",
        correction: "Replace ‘where the median does not represent the distribution well’ with ‘where the median can be zero’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '71',
        location: "Ch 3, Absolute percentage error",
        error: "The MAPE code uses yt_actuals, yt_A and yt_B, but the code that creates them isn't shown.",
        correction: "Add before the code: t = np.linspace(0, 2, 3); yt_actuals = 0.01 + 0.1 * t; yt_A = 0.02 + 0.1 * t; yt_B = 0.01005 + 0.135 * t + 0.005 * t**2",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '73',
        location: "Ch 3, sMAPE callout",
        error: "sMAPE is used throughout the book but never defined.",
        correction: "Add to the callout: ‘sMAPE = (100/n) Σ 2|y_t − ŷ_t| / (|y_t| + |ŷ_t|).’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '75',
        location: "Ch 3, Squared error",
        error: "‘...minimizing the SE implicitly assumes that errors follow a Gaussian distribution, which may not be the case.’",
        correction: "Replace with: ‘...minimizing the SE doesn't assume Gaussian errors; it targets the conditional mean whatever the distribution, and a few large errors can pull that mean around.’ Start a new paragraph at ‘Unlike some normalized metrics’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '76',
        location: "Ch 3, Variations (NRMSE)",
        error: "The NRMSE formula prints as raw equation markup.",
        correction: "NRMSE = RMSE / (max(y) − min(y)) = √((1/n) Σ (y_i − ŷ_i)²) / (max(y) − min(y))",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '78',
        location: "Ch 3, Extrinsic metrics (seasonal naive)",
        error: "‘We use a rolling projection of the last 28 days of the training data...’",
        correction: "Replace ‘28 days’ with ‘14 days’; the code and results use a 14-day season.",
        reported: '2026-11',
      },
      {
        edition: '1st',
        page: '78',
        location: "Ch 3, Extrinsic metrics (MASE, MdMASE, RMSSE)",
        error: "y_t indexes test values in the numerators (t = 1..h) and training values in the denominators (t = 2..T). Labels print twice (‘MASE - MASE =’).",
        correction: "Add to the ‘Where’ list: ‘Numerators sum over the h test periods; denominators sum over the T training observations.’ Read ‘MASE - MASE =’ as ‘MASE =’ (likewise MdMASE and RMSSE).",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '79',
        location: "Ch 3, calculate_scaled_metrics()",
        error: "‘rmsse = np.sqrt(np.mean(squared_errors)) / in_sample_mae’ divides by the in-sample MAE rather than the in-sample MSE.",
        correction: "Replace with: rmsse = np.sqrt(np.mean(squared_errors) / np.mean(np.diff(training_data) ** 2))",
        reported: '2026-11',
      },
      {
        edition: '1st',
        page: '80',
        location: "Ch 3, Metric interpretation (RMSSE)",
        error: "RMSSE is printed as 1.1335 and read as the seasonal naive doing worse than the naive forecast.",
        correction: "RMSSE should be 0.8742. Replace the bullet with: ‘RMSSE = 0.8742: Below 1, so on squared errors the seasonal naive forecast's test error is smaller than the in-sample one-step naive error.’",
        reported: '2026-11',
      },
      {
        edition: '1st',
        page: '80',
        location: "Ch 3, Metric interpretation (MASE)",
        error: "‘An MASE less than 1 indicates that this forecast is performing better than the average naive forecast.’",
        correction: "Replace with: ‘An MASE less than 1 indicates that this forecast's MAE is lower than the in-sample one-step naive MAE on the training data. It doesn't mean it beats our naive forecast over the test period; the relative MAE (1.2753) shows it doesn't.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '83',
        location: "Ch 3, Length of evaluation",
        error: "‘...we test this logic next, with a simple naive forecast.’",
        correction: "Replace ‘a simple naive forecast’ with ‘an exponential smoothing (Holt-Winters) forecast’, as shown in Figure 3.19.",
        reported: '2026-11',
      },
      {
        edition: '1st',
        page: '101',
        location: "Ch 4, Understanding computational graphs",
        error: "Symbols are missing (‘The variables , and are created...’) and the variable names don't match Figure 4.3.",
        correction: "Replace ‘(i.e. x, w1, w2, w01, b1, and b0)’ with ‘(i.e. x1, w1–w6, and b1–b4)’, and the next sentence with: ‘The variables h1, h2, h3, and y are created as a result of mathematical operations, whereas x1 and the weights and biases are initialized by the user.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '103',
        location: "Ch 4, Chain rule revisited / Backpropagation",
        error: "Symbols are missing: ‘the derivative of with respect to into’, ‘For a parameter with learning rate η’, ‘the gradient tells us’, ‘with a learning rate.’",
        correction: "Read: ‘the derivative of y with respect to x into’, ‘For a parameter w_i with learning rate η’, ‘the gradient ∂L/∂w_i tells us’, ‘with a learning rate (η).’ Figure 4.4 is greyscale: blue is the solid line and orange the dashed line.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '104',
        location: "Ch 4, Backpropagation calculations",
        error: "The gradients use w_o1–w_o3, b_o and x, unlike Figure 4.3, and the last line treats b1 as shared by all three hidden nodes.",
        correction: "Read w_o1, w_o2, w_o3, b_o as w4, w5, w6, b4, and x as x1. The last line should be ∂L/∂b1 = 2(y − y_true) · w4, since b1 feeds only h1.",
        reported: '2026-11',
      },
      {
        edition: '1st',
        page: '105',
        location: "Ch 4, A brief look at autograd",
        error: "Symbols are missing: ‘Here, represents loss, is the model's output, and represents the parameters...’ and ‘The partial derivative encapsulates..., while holds...’",
        correction: "Read: ‘Here, L represents loss, y is the model's output, and x represents the parameters...’ and ‘The partial derivative ∂L/∂y encapsulates..., while ∂y/∂x holds...’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '129',
        location: "Ch 5, Table 5.1",
        error: "Row label reads ‘MAPE 5’.",
        correction: "Replace with ‘MAPE’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '129',
        location: "Ch 5, Single-neuron results",
        error: "‘...or applying a log transformation (which drops error)...’",
        correction: "Replace ‘(which drops error)’ with ‘(with a bias adjustment when back-transforming)’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '151-153',
        location: "Ch 6, Figures 6.4, 6.6 and 6.7 (tanh, ReLU, Leaky ReLU)",
        error: "Derivative curves are wrong: x.grad isn't reset between plots, so each plot adds the earlier functions' gradients (the ReLU derivative peaks near 2.25). Figure 6.6 caption reads ‘RfeLU’.",
        correction: "In plot_activation_fn_and_derivative(), start with x = x.detach().requires_grad_(True), as in the companion repo. Correct derivatives: tanh peaks at 1; ReLU is 0 for x < 0 and 1 for x > 0; Leaky ReLU is 0.1 and 1. Caption: ‘The ReLU activation function’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '155',
        location: "Ch 6, Trainable activation functions",
        error: "‘There are a plethora of activation functions in PyTorch we could you that you can look over here’",
        correction: "Replace with: ‘There are plenty of activation functions in PyTorch; you can look over them here’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '174',
        location: "Ch 6, Figures 6.15 and 6.16 (optimizers)",
        error: "Line styles differ between the two figures, and Adagrad is missing from Figure 6.16.",
        correction: "Each optimizer should use the same line style in both figures, and Figure 6.16 should include Adagrad's validation loss.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '195',
        location: "Ch 7, Intuition behind conformal prediction",
        error: "‘...absolute error (AE = y − ŷ)...’",
        correction: "Replace with ‘AE = |y − ŷ|’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '197',
        location: "Ch 7, Formal definition (prediction set Γ)",
        error: "‘a set of paired training values’ is ambiguous, and the set in Γ is garbled: ‘|{n | i = 1, …, n : f̂_i < f̂_n}|/n < δ’.",
        correction: "Replace ‘paired training values’ with ‘observed (calibration) pairs’, and the condition with ‘|{i ∈ {0, …, n−1} : f_i < f_n}| / n < δ’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '200',
        location: "Ch 7, Conformal intervals with quartiles",
        error: "‘...the upper and lower bounds of an interval, that deem acceptable.’",
        correction: "Replace with ‘...the upper and lower bounds of an interval that we deem acceptable.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '207',
        location: "Ch 7, EnbPI steps 6 and 7",
        error: "Step 6 implies the aggregated predictions give the prediction intervals, before the quantile is selected in step 7.",
        correction: "Replace steps 6 and 7 with: ‘6. Select the (1 − α) quantile of the out-of-sample errors. 7. Construct prediction intervals by adding and subtracting this quantile from the aggregated predictions.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '207',
        location: "Ch 7, Figure 7.10",
        error: "The legend (‘Can predict (OOB)’, ‘Trained on (excluded)’) belongs to Figure 7.9, and α isn't subscripted in q1-α.",
        correction: "Ignore the legend. Read ‘q1-α’ as q₁₋α (the 1 − α quantile).",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '208',
        location: "Ch 7, EnbPI",
        error: "The first paragraph on p.208 repeats the end of the previous paragraph.",
        correction: "Delete the paragraph beginning ‘EnbPI achieves approximate exchangeability...’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '222',
        location: "Ch 8, Equation 8.1",
        error: "W_i, W_h and b are never defined (also used in Equation 8.2).",
        correction: "Add after Equation 8.1: ‘where W_i is the input weight matrix, W_h the hidden-to-hidden weight matrix, and b the bias.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '223',
        location: "Ch 8, RNNs and differential equations",
        error: "The derivative is written d(t)/dt in the text and in Equation 8.2.",
        correction: "Replace with dh(t)/dt in both places.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '237',
        location: "Ch 8, Forecasting using RNNs",
        error: "‘With all the ingredients prepared, we instantiate our model:’ is printed inside the code block.",
        correction: "It's body text, not code.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '241',
        location: "Ch 8, RNN vs last-observation metrics",
        error: "MAPE and sMAPE are reported for a sine wave that crosses zero.",
        correction: "Ignore the MAPE and sMAPE rows; percentage errors aren't meaningful when actuals cross zero. Compare on MAE and MSE.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '323',
        location: "Ch 11, Pretraining with external data",
        error: "‘...the M4 monthly dataset (...), which is retail data.’",
        correction: "Replace ‘which is retail data’ with ‘which mixes demographic, finance, industry, macro, micro, and other series’.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '383',
        location: "Ch 13, Table 13.1",
        error: "MAPE and sMAPE are reported for a sine wave oscillating between −1 and 1.",
        correction: "Ignore the MAPE and sMAPE rows; percentage errors aren't meaningful when actuals cross zero. Compare on MAE and MSE.",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '391',
        location: "Ch 14, Distance output dictionary",
        error: "WDTW appears in the output without being defined.",
        correction: "Add after the output: ‘WDTW is weighted DTW (Jeong et al., 2011), which replaces the hard window with a logistic penalty on off-diagonal alignments; g (0.1 here) controls how strongly they are penalized.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '391',
        location: "Ch 14, Distance output dictionary",
        error: "The values are presented side by side as if comparable.",
        correction: "Add: ‘These values aren't on a common scale (aeon's DTW is an accumulated squared cost, Euclidean is an L2 norm, and WDTW's weights shrink every cost), so compare a measure across series, not measures against each other.’",
        reported: '2026-08',
      },
      {
        edition: '1st',
        page: '391',
        location: "Ch 14, Distance output dictionary",
        error: "The output compares s1 with its half-amplitude copy (s3), a difference DTW can't correct.",
        correction: "Use the phase-shifted series instead: calculate_distances(s1, s2) gives Euclidean 8.33, DTW 7.12, DTW (window=5%) 23.68, DTW (window=10%) 7.12, WDTW 0.058.",
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
