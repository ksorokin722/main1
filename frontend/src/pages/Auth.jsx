import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Mail, Lock, User, Phone, Sparkles, Youtube, MessageCircle, Video, Users, TrendingUp, DollarSign, Star, CheckCircle } from 'lucide-react';

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'verify'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    socialAccounts: []
  });
  const [step, setStep] = useState(1);
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const socialPlatforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600', followers: '0' },
    { id: 'telegram', name: 'Telegram', icon: MessageCircle, color: 'from-blue-500 to-blue-600', followers: '0' },
    { id: 'rutube', name: 'RuTube', icon: Video, color: 'from-purple-500 to-purple-600', followers: '0' },
    { id: 'vk', name: 'ВКонтакте', icon: Users, color: 'from-indigo-500 to-indigo-600', followers: '0' }
  ];

  const [selectedSocials, setSelectedSocials] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialToggle = (platform) => {
    setSelectedSocials(prev => {
      const exists = prev.find(s => s.id === platform.id);
      if (exists) {
        return prev.filter(s => s.id !== platform.id);
      } else {
        return [...prev, { 
          ...platform, 
          followers: Math.floor(Math.random() * 50000) + Math.floor(Math.random() * 150000) + 1000 // Реалистичные числа для РФ
        }];
      }
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userData = { ...formData };
    await login(userData);
    navigate('/dashboard');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // Only proceed if we're on the final step
    if (step !== 3) return;
    
    const userData = { ...formData, socialAccounts: selectedSocials };
    await register(userData);
    navigate('/dashboard');
  };

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-2">С возвращением!</h2>
        <p className="text-gray-400">Войдите в свой аккаунт и продолжайте зарабатывать</p>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="email"
            name="email"
            placeholder="Ваш email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            required
          />
        </div>
        
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-full transform hover:scale-105 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Входим...' : 'Войти в аккаунт'}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setMode('register')}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Нет аккаунта? Зарегистрироваться
        </button>
      </div>
    </div>
  );

  const renderRegisterStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm font-medium text-green-300">Шаг 1 из 3</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Создайте аккаунт</h2>
        <p className="text-gray-400">Начните зарабатывать уже сегодня!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
          <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-sm text-gray-300">До 500K ₽/мес</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
          <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-sm text-gray-300">Рост аудитории</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-sm text-gray-300">Премиум бренды</div>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleInputChange}
            className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            required
          />
        </div>
        
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="email"
            name="email"
            placeholder="Ваш email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            required
          />
        </div>
        
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="password"
            name="password"
            placeholder="Создайте пароль"
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            required
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="tel"
            name="phone"
            placeholder="+7 (номер телефона)"
            value={formData.phone}
            onChange={handleInputChange}
            className="pl-10 bg-slate-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-full transform hover:scale-105 transition-all duration-200"
        >
          Продолжить →
        </Button>
      </form>
    </div>
  );

  const renderRegisterStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-4">
          <Users className="w-4 h-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-300">Шаг 2 из 3</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Подключите соцсети</h2>
        <p className="text-gray-400">Выберите российские платформы, на которых вы ведете блог</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedSocials.find(s => s.id === platform.id);
          
          return (
            <div
              key={platform.id}
              onClick={() => handleSocialToggle(platform)}
              className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                isSelected 
                  ? `bg-gradient-to-br ${platform.color} border-white/20` 
                  : 'bg-slate-800/50 border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-white/20' : `bg-gradient-to-br ${platform.color}`
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{platform.name}</h3>
                  <p className="text-sm text-gray-300">
                    {isSelected ? `${isSelected.followers.toLocaleString()} подписчиков` : 'Подключить'}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle className="w-6 h-6 text-white" />
                )}
              </div>
              
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedSocials.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
          <p className="text-green-300 text-sm text-center">
            Выбрано платформ: {selectedSocials.length} | 
            Общая российская аудитория: {selectedSocials.reduce((sum, s) => sum + s.followers, 0).toLocaleString()} подписчиков
          </p>
        </div>
      )}

      <div className="flex space-x-4">
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          ← Назад
        </Button>
        <Button
          onClick={() => setStep(3)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
          disabled={selectedSocials.length === 0}
        >
          Продолжить →
        </Button>
      </div>
    </div>
  );

  const renderRegisterStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-4">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm font-medium text-green-300">Шаг 3 из 3</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Почти готово!</h2>
        <p className="text-gray-400">Проверьте данные и завершите регистрацию</p>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-gray-600">
          <h3 className="text-lg font-bold text-white mb-4">Личные данные</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Имя:</span>
              <span className="text-white">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Телефон:</span>
              <span className="text-white">{formData.phone}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-2xl border border-gray-600">
          <h3 className="text-lg font-bold text-white mb-4">Подключенные соцсети (РФ)</h3>
          <div className="grid grid-cols-2 gap-3">
            {selectedSocials.map((social) => {
              const Icon = social.icon;
              return (
                <div key={social.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{social.name}</div>
                    <div className="text-xs text-gray-400">{social.followers.toLocaleString()} подписчиков</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Потенциал дохода в РФ</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-green-400">{Math.floor(selectedSocials.reduce((sum, s) => sum + s.followers, 0) * 0.08).toLocaleString()} ₽</div>
              <div className="text-xs text-gray-400">В месяц</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400">{selectedSocials.length * 4}</div>
              <div className="text-xs text-gray-400">Кампаний</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400">Premium</div>
              <div className="text-xs text-gray-400">Статус</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleRegisterSubmit}>
        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={() => setStep(2)}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            ← Назад
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold transform hover:scale-105 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Создаем аккаунт...' : 'Завершить регистрацию'} ✨
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${30 + mousePosition.y * 0.02}%`,
          }}
        ></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Russian Blogger Illustrations */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1683721003111-070bcc053d8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8fDE3NTkyMjU2ODd8MA&ixlib=rb-4.1.0&q=85" 
          alt="Social Media" 
          className="absolute top-20 left-20 w-32 h-32 object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1726066012749-f81bf4422d4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb258ZW58MHx8fHwxNzU5MjcyMTE2fDA&ixlib=rb-4.1.0&q=85" 
          alt="Content Creation" 
          className="absolute bottom-32 right-24 w-40 h-32 object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxibG9nZ2VyfGVufDB8fHx8MTc1OTMwODUxOXww&ixlib=rb-4.1.0&q=85" 
          alt="Russian Blogger" 
          className="absolute top-1/2 right-20 w-36 h-28 object-cover rounded-2xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 bg-slate-800/40 backdrop-blur-xl border border-gray-700/50">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>На главную</span>
          </button>

          {mode === 'login' && renderLoginForm()}
          {mode === 'register' && step === 1 && renderRegisterStep1()}
          {mode === 'register' && step === 2 && renderRegisterStep2()}
          {mode === 'register' && step === 3 && renderRegisterStep3()}

          {mode === 'login' && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setMode('register')}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Нет аккаунта? Зарегистрироваться →
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Auth;
