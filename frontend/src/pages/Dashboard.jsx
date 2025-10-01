import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  User, Settings, LogOut, TrendingUp, DollarSign, Users, 
  MessageCircle, Youtube, Video, Bell, Award, CheckCircle, 
  AlertCircle, Sparkles, Target, BarChart3, Calendar,
  PlayCircle, Eye, Heart, Share2, Clock, ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'campaign', title: 'Новая кампания TechNova', message: 'Подходящая кампания для вашей аудитории', time: '5 мин назад', unread: true },
    { id: 2, type: 'payment', title: 'Выплата получена', message: '15,000 ₽ зачислено на ваш счет', time: '1 час назад', unread: true },
    { id: 3, type: 'milestone', title: 'Поздравляем!', message: 'Вы достигли 10K подписчиков!', time: '3 часа назад', unread: false }
  ]);

  const [campaigns] = useState([
    {
      id: 1,
      title: 'Новая линейка смартфонов TechNova X1',
      brand: 'TechNova',
      reward: '15,000 ₽',
      deadline: '15 фев 2025',
      status: 'available',
      description: 'Обзор новых функций смартфона для Tech-аудитории',
      requirements: 'Tech-блогеры с аудиторией 50K+',
      platforms: ['youtube', 'telegram']
    },
    {
      id: 2,
      title: 'Весенняя коллекция FashionSpace',
      brand: 'FashionSpace',
      reward: '20,000 ₽',
      deadline: '1 мар 2025',
      status: 'applied',
      description: 'Демонстрация новой коллекции весна-лето',
      requirements: 'Fashion-блогеры, женская аудитория',
      platforms: ['instagram', 'vk']
    },
    {
      id: 3,
      title: 'Здоровый образ жизни с HealthyLife',
      brand: 'HealthyLife',
      reward: '12,500 ₽',
      deadline: '28 фев 2025',
      status: 'completed',
      description: 'Продвижение продуктов здорового питания',
      requirements: 'Health & Fitness блогеры',
      platforms: ['youtube', 'rutube']
    }
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleVerification = () => {
    // Simulate verification process
    setTimeout(() => {
      updateUser({ isVerified: true });
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-400';
      case 'applied': return 'text-yellow-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Доступна';
      case 'applied': return 'Заявка подана';
      case 'completed': return 'Завершена';
      default: return 'Неизвестно';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube': return Youtube;
      case 'telegram': return MessageCircle;
      case 'rutube': return Video;
      case 'vk': return Users;
      default: return MessageCircle;
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Добро пожаловать, {user.name}!</h2>
            <p className="text-gray-300">Готовы зарабатывать больше? Вот ваша статистика</p>
          </div>
          {!user.isVerified && (
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Верификация не пройдена</span>
              </div>
              <Button 
                onClick={handleVerification}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                Пройти верификацию
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-green-400">127,500 ₽</div>
            <div className="text-sm text-gray-400">Заработано за месяц</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-blue-400">12</div>
            <div className="text-sm text-gray-400">Активных кампаний</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-purple-400">+47%</div>
            <div className="text-sm text-gray-400">Рост за месяц</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-black text-yellow-400">Premium</div>
            <div className="text-sm text-gray-400">Ваш статус</div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-slate-800/50 border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Bell className="w-5 h-5 mr-2 text-purple-400" />
              Уведомления
            </h3>
            <Badge className="bg-purple-500">{notifications.filter(n => n.unread).length}</Badge>
          </div>
          <div className="space-y-4">
            {notifications.slice(0, 3).map(notification => (
              <div key={notification.id} className={`p-4 rounded-xl border ${
                notification.unread ? 'bg-purple-500/10 border-purple-500/20' : 'bg-slate-700/50 border-gray-600'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{notification.title}</h4>
                    <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
              Статистика
            </h3>
            <Badge className="bg-green-500">↑ +23%</Badge>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-green-400" />
                <span className="text-white">Просмотры</span>
              </div>
              <span className="text-green-400 font-bold">2.3M</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-xl">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-blue-400" />
                <span className="text-white">Лайки</span>
              </div>
              <span className="text-blue-400 font-bold">156K</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-xl">
              <div className="flex items-center space-x-3">
                <Share2 className="w-5 h-5 text-purple-400" />
                <span className="text-white">Репосты</span>
              </div>
              <span className="text-purple-400 font-bold">23K</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Кампании</h2>
        <div className="flex space-x-2">
          <Badge className="bg-green-500">{campaigns.filter(c => c.status === 'available').length} доступно</Badge>
          <Badge className="bg-yellow-500">{campaigns.filter(c => c.status === 'applied').length} в работе</Badge>
          <Badge className="bg-blue-500">{campaigns.filter(c => c.status === 'completed').length} завершено</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map(campaign => (
          <Card key={campaign.id} className="p-6 bg-slate-800/50 border-gray-700 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{campaign.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{campaign.brand}</p>
                <p className="text-sm text-gray-300">{campaign.description}</p>
              </div>
              <Badge className={`ml-4 ${getStatusColor(campaign.status)}`}>
                {getStatusText(campaign.status)}
              </Badge>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Вознаграждение:</span>
                <span className="text-green-400 font-bold">{campaign.reward}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Дедлайн:</span>
                <span className="text-white">{campaign.deadline}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Требования:</span>
                <p className="text-white text-sm mt-1">{campaign.requirements}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {campaign.platforms.map(platform => {
                  const Icon = getPlatformIcon(platform);
                  return (
                    <div key={platform} className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                  );
                })}
              </div>
              
              {campaign.status === 'available' && (
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Подать заявку
                </Button>
              )}
              {campaign.status === 'applied' && (
                <Button variant="outline" className="border-yellow-500 text-yellow-400">
                  <Clock className="w-4 h-4 mr-2" />
                  Ожидание
                </Button>
              )}
              {campaign.status === 'completed' && (
                <Button variant="outline" className="border-blue-500 text-blue-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Завершено
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-lg border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Ublogger
                    </h1>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-xl"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <div className="flex items-center space-x-1">
                      {user.isVerified ? (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-yellow-400" />
                      )}
                      <p className="text-xs text-gray-400">
                        {user.isVerified ? 'Верифицирован' : 'Требуется верификация'}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-slate-800/30 border-b border-gray-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'overview', label: 'Обзор', icon: BarChart3 },
                { id: 'campaigns', label: 'Кампании', icon: Target },
                { id: 'analytics', label: 'Аналитика', icon: TrendingUp },
                { id: 'settings', label: 'Настройки', icon: Settings }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'analytics' && (
            <div className="text-center py-20">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Аналитика</h2>
              <p className="text-gray-400">Раздел в разработке</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-20">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Настройки</h2>
              <p className="text-gray-400">Раздел в разработке</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
