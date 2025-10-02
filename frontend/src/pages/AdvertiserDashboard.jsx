import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import ThemeToggle from '../components/ThemeToggle';
import CreateCampaignModal from '../components/CreateCampaignModal';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Users, Filter, ShoppingCart, Eye, Star, MapPin, 
  TrendingUp, Heart, MessageCircle, Share2, Plus,
  Settings, LogOut, BarChart3, Target, Zap, Award,
  Search, Calendar, DollarSign, CheckCircle, Clock
} from 'lucide-react';

const AdvertiserDashboard = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedBloggers, setSelectedBloggers] = useState([]);
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    minFollowers: 0,
    maxPrice: 100000,
    gender: 'all',
    ageRange: 'all',
    geo: 'all'
  });

  const { getThemeColors } = useTheme();
  const colors = getThemeColors();

  // Mock data - 20 блогеров
  const bloggers = [
    {
      id: 1,
      name: 'Анна Петрова',
      username: '@anna_beauty',
      category: 'beauty',
      followers: 125000,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400',
      description: 'Beauty блогер, делюсь секретами красоты и ухода',
      engagement: 8.5,
      ctr: 3.2,
      reach: 95000,
      price: 25000,
      audience: { female: 85, male: 15, age: '25-35', geo: 'Москва, СПб' }
    },
    {
      id: 2,
      name: 'Игорь Новиков',
      username: '@tech_igor',
      category: 'tech',
      followers: 89000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Обзоры техники и гаджетов для российского рынка',
      engagement: 6.7,
      ctr: 2.8,
      reach: 67000,
      price: 18000,
      audience: { female: 25, male: 75, age: '18-35', geo: 'Москва, Екатеринбург' }
    },
    {
      id: 3,
      name: 'Мария Волкова',
      username: '@maria_travel',
      category: 'travel',
      followers: 156000,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description: 'Путешествия по России и зарубежью',
      engagement: 9.2,
      ctr: 4.1,
      reach: 120000,
      price: 35000,
      audience: { female: 68, male: 32, age: '25-45', geo: 'По всей России' }
    },
    {
      id: 4,
      name: 'Дмитрий Кулинар',
      username: '@dmitry_food',
      category: 'food',
      followers: 78000,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      description: 'Рецепты русской и мировой кухни',
      engagement: 7.8,
      ctr: 3.5,
      reach: 58000,
      price: 15000,
      audience: { female: 72, male: 28, age: '30-50', geo: 'Москва, Казань' }
    },
    {
      id: 5,
      name: 'Екатерина Фитнес',
      username: '@katya_fit',
      category: 'fitness',
      followers: 134000,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      description: 'Здоровый образ жизни и фитнес программы',
      engagement: 8.9,
      ctr: 3.8,
      reach: 105000,
      price: 28000,
      audience: { female: 78, male: 22, age: '20-40', geo: 'Москва, СПб, Сочи' }
    },
    {
      id: 6,
      name: 'Максим Гейминг',
      username: '@max_gamer',
      category: 'gaming',
      followers: 167000,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      description: 'Обзоры игр и киберспорт',
      engagement: 12.1,
      ctr: 5.2,
      reach: 145000,
      price: 40000,
      audience: { female: 15, male: 85, age: '16-30', geo: 'По всей России' }
    },
    {
      id: 7,
      name: 'София Мода',
      username: '@sofia_style',
      category: 'fashion',
      followers: 201000,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      description: 'Модные тренды и стильные образы',
      engagement: 9.7,
      ctr: 4.3,
      reach: 178000,
      price: 45000,
      audience: { female: 89, male: 11, age: '18-35', geo: 'Москва, СПб' }
    },
    {
      id: 8,
      name: 'Артем Авто',
      username: '@artem_cars',
      category: 'automotive',
      followers: 112000,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400',
      description: 'Обзоры автомобилей российского рынка',
      engagement: 6.4,
      ctr: 2.9,
      reach: 89000,
      price: 22000,
      audience: { female: 8, male: 92, age: '25-45', geo: 'Москва, Казань' }
    },
    {
      id: 9,
      name: 'Ольга Дом',
      username: '@olga_home',
      category: 'lifestyle',
      followers: 95000,
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      description: 'Дизайн интерьера и уютный дом',
      engagement: 7.6,
      ctr: 3.4,
      reach: 73000,
      price: 19000,
      audience: { female: 81, male: 19, age: '25-50', geo: 'Москва, СПб, Краснодар' }
    },
    {
      id: 10,
      name: 'Владимир Бизнес',
      username: '@vlad_business',
      category: 'business',
      followers: 67000,
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400',
      description: 'Бизнес и инвестиции в России',
      engagement: 5.8,
      ctr: 2.1,
      reach: 52000,
      price: 16000,
      audience: { female: 35, male: 65, age: '25-45', geo: 'Москва, СПб' }
    },
    // Добавлю еще 10 блогеров...
    {
      id: 11,
      name: 'Лиза Дети',
      username: '@liza_kids',
      category: 'parenting',
      followers: 143000,
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
      description: 'Материнство и детское развитие',
      engagement: 8.3,
      ctr: 3.7,
      reach: 118000,
      price: 30000,
      audience: { female: 93, male: 7, age: '25-40', geo: 'По всей России' }
    },
    {
      id: 12,
      name: 'Никита Музыка',
      username: '@nikita_music',
      category: 'music',
      followers: 187000,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      description: 'Музыкальные обзоры и российская сцена',
      engagement: 11.2,
      ctr: 4.8,
      reach: 159000,
      price: 38000,
      audience: { female: 45, male: 55, age: '16-35', geo: 'Москва, СПб, Казань' }
    },
    {
      id: 13,
      name: 'Алина Образование',
      username: '@alina_edu',
      category: 'education',
      followers: 76000,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400',
      description: 'Онлайн образование и саморазвитие',
      engagement: 6.9,
      ctr: 2.7,
      reach: 61000,
      price: 14000,
      audience: { female: 67, male: 33, age: '20-35', geo: 'Москва, СПб, Нижний Новгород' }
    },
    {
      id: 14,
      name: 'Роман Спорт',
      username: '@roman_sport',
      category: 'sports',
      followers: 129000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Профессиональный спорт и тренировки',
      engagement: 9.4,
      ctr: 4.2,
      reach: 112000,
      price: 26000,
      audience: { female: 28, male: 72, age: '18-40', geo: 'По всей России' }
    },
    {
      id: 15,
      name: 'Валентина Книги',
      username: '@valya_books',
      category: 'books',
      followers: 58000,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description: 'Обзоры книг и литературные рецензии',
      engagement: 7.1,
      ctr: 3.1,
      reach: 46000,
      price: 12000,
      audience: { female: 74, male: 26, age: '20-50', geo: 'Москва, СПб, Екатеринбург' }
    },
    {
      id: 16,
      name: 'Григорий Наука',
      username: '@grisha_science',
      category: 'science',
      followers: 92000,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      description: 'Популярная наука и технологии',
      engagement: 6.2,
      ctr: 2.4,
      reach: 74000,
      price: 17000,
      audience: { female: 42, male: 58, age: '20-40', geo: 'Москва, СПб, Новосибирск' }
    },
    {
      id: 17,
      name: 'Кристина Психология',
      username: '@kristina_psy',
      category: 'psychology',
      followers: 114000,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      description: 'Практическая психология и саморазвитие',
      engagement: 8.7,
      ctr: 3.9,
      reach: 97000,
      price: 24000,
      audience: { female: 79, male: 21, age: '25-45', geo: 'По всей России' }
    },
    {
      id: 18,
      name: 'Денис Крипто',
      username: '@denis_crypto',
      category: 'crypto',
      followers: 84000,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      description: 'Криптовалюты и блокчейн технологии',
      engagement: 7.3,
      ctr: 3.0,
      reach: 68000,
      price: 20000,
      audience: { female: 18, male: 82, age: '22-40', geo: 'Москва, СПб' }
    },
    {
      id: 19,
      name: 'Юлия Животные',
      username: '@yulia_pets',
      category: 'pets',
      followers: 106000,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      description: 'Уход за домашними животными',
      engagement: 10.1,
      ctr: 4.5,
      reach: 89000,
      price: 21000,
      audience: { female: 76, male: 24, age: '20-50', geo: 'По всей России' }
    },
    {
      id: 20,
      name: 'Сергей DIY',
      username: '@sergey_diy',
      category: 'diy',
      followers: 71000,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400',
      description: 'Своими руками и рукоделие',
      engagement: 6.8,
      ctr: 2.9,
      reach: 57000,
      price: 13000,
      audience: { female: 51, male: 49, age: '25-50', geo: 'Москва, СПб, Казань' }
    }
  ];

  const categories = [
    { id: 'all', name: 'Все категории', count: 20 },
    { id: 'beauty', name: 'Красота', count: 1 },
    { id: 'tech', name: 'Технологии', count: 1 },
    { id: 'travel', name: 'Путешествия', count: 1 },
    { id: 'food', name: 'Еда', count: 1 },
    { id: 'fitness', name: 'Фитнес', count: 1 },
    { id: 'gaming', name: 'Игры', count: 1 },
    { id: 'fashion', name: 'Мода', count: 1 },
    { id: 'automotive', name: 'Авто', count: 1 },
    { id: 'lifestyle', name: 'Лайфстайл', count: 1 },
    { id: 'business', name: 'Бизнес', count: 1 }
  ];

  const filteredBloggers = bloggers.filter(blogger => {
    return (filters.category === 'all' || blogger.category === filters.category) &&
           blogger.followers >= filters.minFollowers &&
           blogger.price <= filters.maxPrice;
  });

  const addToBag = (blogger) => {
    if (!selectedBloggers.find(b => b.id === blogger.id)) {
      setSelectedBloggers([...selectedBloggers, blogger]);
    }
  };

  const removeFromBag = (bloggerId) => {
    setSelectedBloggers(selectedBloggers.filter(b => b.id !== bloggerId));
  };

  const totalCampaignCost = selectedBloggers.reduce((sum, blogger) => sum + blogger.price, 0);
  const totalReach = selectedBloggers.reduce((sum, blogger) => sum + blogger.reach, 0);

  const handleCreateCampaign = (campaignData) => {
    console.log('Создание кампании:', campaignData);
    // Здесь будет логика создания кампании
    alert('Кампания успешно создана!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ublogger
              </h1>
              <Badge className="bg-blue-500 text-white">Рекламодатель</Badge>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle size="sm" />
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Settings className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Настройки</span>
                <span className="sm:hidden">⚙️</span>
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Выход</span>
                <span className="sm:hidden">🚪</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-gray-700">
            <TabsTrigger value="catalog" className="data-[state=active]:bg-purple-500">
              <Users className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Каталог блогеров</span>
              <span className="sm:hidden text-xs">👥</span>
            </TabsTrigger>
            <TabsTrigger value="bag" className="data-[state=active]:bg-purple-500 relative">
              <ShoppingCart className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Корзина</span>
              <span className="sm:hidden text-xs">🛒</span>
              {selectedBloggers.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {selectedBloggers.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-500">
              <Target className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Мои кампании</span>
              <span className="sm:hidden text-xs">🎯</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500">
              <BarChart3 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Аналитика</span>
              <span className="sm:hidden text-xs">📊</span>
            </TabsTrigger>
          </TabsList>

          {/* Каталог блогеров */}
          <TabsContent value="catalog" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Фильтры */}
              <Card className="lg:col-span-1 p-6 bg-slate-800/50 border-gray-700 h-fit">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Фильтры
                </h3>
                
                <div className="space-y-6">
                  {/* Категория */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Тематика</label>
                    <select 
                      className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white"
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                      ))}
                    </select>
                  </div>

                  {/* Подписчики */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Минимум подписчиков: {filters.minFollowers.toLocaleString()}
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="200000" 
                      step="10000"
                      value={filters.minFollowers}
                      onChange={(e) => setFilters({...filters, minFollowers: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  {/* Стоимость */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Максимальная стоимость: {filters.maxPrice.toLocaleString()} ₽
                    </label>
                    <input 
                      type="range" 
                      min="5000" 
                      max="100000" 
                      step="5000"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300"
                    onClick={() => setFilters({
                      category: 'all',
                      minFollowers: 0,
                      maxPrice: 100000,
                      gender: 'all',
                      ageRange: 'all',
                      geo: 'all'
                    })}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              </Card>

              {/* Список блогеров */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Найдено блогеров: {filteredBloggers.length}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBloggers.map(blogger => (
                    <Card key={blogger.id} className="p-6 bg-slate-800/50 border-gray-700 hover:border-purple-500/50 transition-colors">
                      
                      {/* Avatar and basic info */}
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={blogger.avatar} 
                          alt={blogger.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{blogger.name}</h3>
                          <p className="text-purple-400 text-sm">{blogger.username}</p>
                          <Badge className="bg-purple-500/20 text-purple-400 text-xs mt-1">
                            {blogger.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-4">{blogger.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                        <div className="bg-slate-700/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-white">{(blogger.followers/1000).toFixed(0)}K</div>
                          <div className="text-xs text-gray-400">Подписчики</div>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400">{blogger.engagement}%</div>
                          <div className="text-xs text-gray-400">ER</div>
                        </div>
                      </div>

                      {/* Audience */}
                      <div className="mb-4 p-3 bg-slate-700/30 rounded-lg">
                        <div className="text-xs text-gray-400 mb-2">Аудитория:</div>
                        <div className="flex justify-between text-xs text-gray-300">
                          <span>👩 {blogger.audience.female}%</span>
                          <span>👨 {blogger.audience.male}%</span>
                          <span>🎂 {blogger.audience.age}</span>
                        </div>
                        <div className="text-xs text-gray-300 mt-1">📍 {blogger.audience.geo}</div>
                      </div>

                      {/* Price and actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-400">{blogger.price.toLocaleString()} ₽</div>
                          <div className="text-xs text-gray-400">за публикацию</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-600 text-gray-300"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => addToBag(blogger)}
                            disabled={selectedBloggers.find(b => b.id === blogger.id)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Корзина */}
          <TabsContent value="bag" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Список выбранных блогеров */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Выбранные блогеры ({selectedBloggers.length})
                </h2>
                
                {selectedBloggers.length === 0 ? (
                  <Card className="p-8 bg-slate-800/50 border-gray-700 text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-300 mb-2">Корзина пуста</h3>
                    <p className="text-gray-400">Добавьте блогеров из каталога для создания кампании</p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedBloggers.map(blogger => (
                      <Card key={blogger.id} className="p-4 bg-slate-800/50 border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={blogger.avatar} 
                              alt={blogger.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-bold text-white">{blogger.name}</h4>
                              <p className="text-purple-400 text-sm">{blogger.username}</p>
                              <div className="text-xs text-gray-400">
                                {(blogger.followers/1000).toFixed(0)}K подписчиков • {blogger.engagement}% ER
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-400">{blogger.price.toLocaleString()} ₽</div>
                              <div className="text-xs text-gray-400">{(blogger.reach/1000).toFixed(0)}K охват</div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => removeFromBag(blogger.id)}
                              className="border-red-500 text-red-400 hover:bg-red-500/10"
                            >
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Сводка по кампании */}
              <div className="lg:col-span-1">
                <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 sticky top-24">
                  <h3 className="text-xl font-bold text-white mb-4">Сводка по кампании</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Блогеров выбрано:</span>
                      <span className="text-white font-bold">{selectedBloggers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Общий охват:</span>
                      <span className="text-green-400 font-bold">{(totalReach/1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Стоимость кампании:</span>
                      <span className="text-yellow-400 font-bold">{totalCampaignCost.toLocaleString()} ₽</span>
                    </div>
                  </div>

                  {selectedBloggers.length > 0 && (
                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Создать кампанию
                      </Button>
                      <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                        Отправить запрос
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Заглушки для других табов */}
          <TabsContent value="campaigns" className="mt-6">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Мои кампании</h2>
                  <p className="text-gray-400">Управление активными рекламными кампаниями</p>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать кампанию
                </Button>
              </div>

              {/* Активная кампания: TechNova X1 */}
              <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Новая линейка смартфонов TechNova X1</h3>
                      <Badge className="bg-green-500 text-white">Активная</Badge>
                    </div>
                    <p className="text-gray-300 mb-4">Продвижение революционных смартфонов для российского рынка</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-blue-400">12</p>
                        <p className="text-xs text-gray-400">Заявок получено</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-400">8</p>
                        <p className="text-xs text-gray-400">Одобрено</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-yellow-400">3</p>
                        <p className="text-xs text-gray-400">На модерации</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-400">1.2M</p>
                        <p className="text-xs text-gray-400">Охват</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-2">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Управлять
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      Статистика
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Блогеры по кампании TechNova */}
              <Card className="p-6 bg-slate-800/50 border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Блогеры в кампании TechNova X1</h3>
                
                <div className="space-y-4">
                  
                  {/* Одобренный блогер */}
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                          alt="Игорь Новиков"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-white">Игорь Новиков</h4>
                          <p className="text-green-400 text-sm">@tech_igor • 89K подписчиков</p>
                          <p className="text-xs text-gray-400">Контент опубликован • 67K просмотров</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-500 text-white">✓ Одобрено</Badge>
                        <Button size="sm" variant="outline" className="border-green-500 text-green-400">
                          <Eye className="w-4 h-4 mr-1" />
                          Посмотреть пост
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Блогер на модерации */}
                  <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=50&h=50&fit=crop&crop=face"
                          alt="Анна Петрова"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-white">Анна Петрова</h4>
                          <p className="text-yellow-400 text-sm">@anna_beauty • 125K подписчиков</p>
                          <p className="text-xs text-gray-400">Контент загружен • Ожидает модерации</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-yellow-500 text-black">⏳ Модерация</Badge>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          ✓ Принять
                        </Button>
                        <Button size="sm" className="bg-red-500 hover:bg-red-600">
                          ✗ Отклонить
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                          💬 Комментарий
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Блогер с требованием доработки */}
                  <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face"
                          alt="Максим Гейминг"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-white">Максим Гейминг</h4>
                          <p className="text-orange-400 text-sm">@max_gamer • 167K подписчиков</p>
                          <p className="text-xs text-gray-400">Требует доработки • "Добавьте больше информации о камере"</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-orange-500 text-white">🔄 Доработка</Badge>
                        <Button size="sm" variant="outline" className="border-orange-500 text-orange-400">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Написать
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Новая заявка */}
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
                          alt="Мария Волкова"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-white">Мария Волкова</h4>
                          <p className="text-blue-400 text-sm">@maria_travel • 156K подписчиков</p>
                          <p className="text-xs text-gray-400">Новая заявка • 2 часа назад</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-500 text-white">🆕 Новая заявка</Badge>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          ✓ Принять
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                          ✗ Отклонить
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Прогресс кампании</p>
                      <p className="text-sm text-gray-400">8 из 12 блогеров одобрены</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-400">67%</p>
                      <p className="text-xs text-gray-400">готовности</p>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              
              {/* Header с кнопками экспорта */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Аналитика кампаний</h2>
                  <p className="text-gray-400">Подробная статистика по всем рекламным кампаниям</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-green-500 text-green-400">
                    📊 Excel
                  </Button>
                  <Button variant="outline" className="border-red-500 text-red-400">
                    📄 PDF
                  </Button>
                </div>
              </div>

              {/* Основные метрики */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 text-sm font-medium">Просмотры</p>
                      <p className="text-2xl font-bold text-white">2.4M</p>
                      <p className="text-xs text-green-400">+12.5% за месяц</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300 text-sm font-medium">Клики</p>
                      <p className="text-2xl font-bold text-white">156K</p>
                      <p className="text-xs text-green-400">+8.3% за месяц</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-300 text-sm font-medium">Лиды</p>
                      <p className="text-2xl font-bold text-white">3,847</p>
                      <p className="text-xs text-green-400">+15.7% за месяц</p>
                    </div>
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-300 text-sm font-medium">CTR</p>
                      <p className="text-2xl font-bold text-white">6.5%</p>
                      <p className="text-xs text-green-400">+2.1% за месяц</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                  </div>
                </Card>
              </div>

              {/* Статусы заявок */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <Card className="p-6 bg-slate-800/50 border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Статус заявок блогеров</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-green-300 font-medium">Одобрены</span>
                      </div>
                      <span className="text-white font-bold">24</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-300 font-medium">Ожидают</span>
                      </div>
                      <span className="text-white font-bold">8</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-red-300 font-medium">Отклонены</span>
                      </div>
                      <span className="text-white font-bold">3</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">Итого: 35 заявок</p>
                      <p className="text-sm text-gray-300">Процент одобрения: 68.6%</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-800/50 border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Финансовые показатели</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <span className="text-blue-300 font-medium">Потрачено</span>
                      <span className="text-white font-bold">847,500 ₽</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <span className="text-green-300 font-medium">Конверсии</span>
                      <span className="text-white font-bold">2,156</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <span className="text-purple-300 font-medium">CPA</span>
                      <span className="text-white font-bold">393 ₽</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <span className="text-yellow-300 font-medium">ROI</span>
                      <span className="text-white font-bold">240%</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-400">Прибыль: 2,034,000 ₽</p>
                      <p className="text-sm text-gray-300">За текущий период</p>
                    </div>
                  </div>
                </Card>

              </div>

              {/* График эффективности кампаний */}
              <Card className="p-6 bg-slate-800/50 border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Эффективность кампаний по месяцам</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl">
                    <p className="text-2xl font-bold text-blue-400">12</p>
                    <p className="text-sm text-gray-400">Активных кампаний</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl">
                    <p className="text-2xl font-bold text-green-400">156</p>
                    <p className="text-sm text-gray-400">Блогеров участвует</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl">
                    <p className="text-2xl font-bold text-purple-400">4.2M</p>
                    <p className="text-sm text-gray-400">Общий охват</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-900/50 to-slate-800/50 rounded-xl p-4 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">График будет добавлен в следующем обновлении</p>
                </div>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;