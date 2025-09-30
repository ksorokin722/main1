// Mock data for Ublogger platform

export const stats = {
  totalBloggers: '1,250,000',
  totalBrands: '450',
  totalEarnings: '12.5 млрд ₽',
  exclusiveProjects: '89',
  averageCPV: '0.65 ₽',
  successfulCampaigns: '15,647'
};

export const topBloggers = [
  {
    id: 1,
    name: 'Анна Блогова',
    username: '@anna_blogova',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400&h=400&fit=crop&crop=face',
    category: 'Lifestyle',
    followers: '1.2M',
    earnings: '385,000 ₽',
    growth: '+25%',
    verified: true
  },
  {
    id: 2,
    name: 'Макс Техно',
    username: '@max_techno',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    category: 'Tech',
    followers: '850K',
    earnings: '267,500 ₽',
    growth: '+18%',
    verified: true
  },
  {
    id: 3,
    name: 'Елена Фитнес',
    username: '@elena_fitness',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    category: 'Health & Fitness',
    followers: '675K',
    earnings: '198,750 ₽',
    growth: '+32%',
    verified: true
  },
  {
    id: 4,
    name: 'Дмитрий Кулинар',
    username: '@dmitry_cook',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    category: 'Food & Cooking',
    followers: '590K',
    earnings: '156,800 ₽',
    growth: '+22%',
    verified: false
  }
];

export const brands = [
  {
    id: 1,
    name: 'TechNova',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
    category: 'Technology',
    campaigns: 15,
    budget: '2.5M ₽'
  },
  {
    id: 2,
    name: 'FashionSpace',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    category: 'Fashion',
    campaigns: 28,
    budget: '4.1M ₽'
  },
  {
    id: 3,
    name: 'HealthyLife',
    logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop',
    category: 'Health',
    campaigns: 22,
    budget: '3.2M ₽'
  },
  {
    id: 4,
    name: 'FoodieHub',
    logo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
    category: 'Food & Beverage',
    campaigns: 19,
    budget: '1.8M ₽'
  }
];

export const campaigns = [
  {
    id: 1,
    title: 'Новая линейка смартфонов TechNova X1',
    brand: 'TechNova',
    category: 'Technology',
    budget: '500,000 ₽',
    deadline: '2025-02-15',
    requirements: 'Tech-блогеры с аудиторией 50K+',
    reward: '15,000 ₽',
    status: 'active',
    participants: 45,
    maxParticipants: 100
  },
  {
    id: 2,
    title: 'Весенняя коллекция FashionSpace',
    brand: 'FashionSpace',
    category: 'Fashion',
    budget: '750,000 ₽',
    deadline: '2025-03-01',
    requirements: 'Fashion-блогеры, женская аудитория',
    reward: '20,000 ₽',
    status: 'active',
    participants: 67,
    maxParticipants: 80
  },
  {
    id: 3,
    title: 'Здоровый образ жизни с HealthyLife',
    brand: 'HealthyLife',
    category: 'Health',
    budget: '400,000 ₽',
    deadline: '2025-02-28',
    requirements: 'Health & Fitness блогеры',
    reward: '12,500 ₽',
    status: 'active',
    participants: 32,
    maxParticipants: 60
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Анна Блогова',
    username: '@anna_blogova',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400&h=400&fit=crop&crop=face',
    text: 'Ublogger изменил мою жизнь! За 6 месяцев я заработала больше, чем за весь прошлый год. Платформа предоставляет лучшие бренды и отличную поддержку.',
    earnings: '385,000 ₽',
    rating: 5
  },
  {
    id: 2,
    name: 'Макс Техно',
    username: '@max_techno',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    text: 'Аналитика на Ublogger просто потрясающая! Я могу отслеживать каждый клик, каждую конверсию. Это помогает мне оптимизировать контент и увеличивать доходы.',
    earnings: '267,500 ₽',
    rating: 5
  },
  {
    id: 3,
    name: 'Елена Фитнес',
    username: '@elena_fitness',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    text: 'Автоматизация процессов на Ublogger экономит мне часы каждый день. Могу сосредоточиться на создании качественного контента вместо рутины.',
    earnings: '198,750 ₽',
    rating: 5
  }
];

export const features = [
  {
    id: 1,
    title: 'AI-Аналитика',
    description: 'Умная система анализа аудитории и прогнозирования результатов кампаний',
    icon: 'BarChart3',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'Автоматизация',
    description: 'Полная автоматизация процессов от поиска брендов до выплат',
    icon: 'Zap',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Мгновенные выплаты',
    description: 'Получайте деньги сразу после выполнения кампании',
    icon: 'CreditCard',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    title: 'Smart Matching',
    description: 'ИИ подбирает идеальные пары блогер-бренд автоматически',
    icon: 'Users',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Реальная статистика',
    description: 'Прозрачная отчетность в реальном времени без скрытых метрик',
    icon: 'TrendingUp',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 6,
    title: 'Правовая защита',
    description: 'Автоматическая маркировка и полное соответствие законодательству',
    icon: 'Shield',
    color: 'from-teal-500 to-green-500'
  }
];

export const bloggerCategories = [
  'Lifestyle',
  'Tech',
  'Fashion',
  'Beauty',
  'Health & Fitness',
  'Food & Cooking',
  'Travel',
  'Gaming',
  'Education',
  'Business',
  'Entertainment',
  'Sports'
];

export const platformStats = {
  dailyEarnings: '2.1M ₽',
  activeCampaigns: 156,
  completedCampaigns: 15647,
  averageRating: 4.9,
  topCategory: 'Lifestyle',
  growthRate: '+47%'
};
