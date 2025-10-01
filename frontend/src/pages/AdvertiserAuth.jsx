import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Building2, Mail, Lock, User, Phone, 
  ArrowRight, Eye, EyeOff, Globe, Users, Target
} from 'lucide-react';

const AdvertiserAuth = () => {
  const [mode, setMode] = useState('login'); // login or register
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    contactName: '',
    phone: '',
    website: '',
    industry: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Advertiser auth:', mode, formData);
    // Here would be actual authentication logic
    navigate('/advertiser/dashboard');
  };

  const industries = [
    'Технологии и IT',
    'Мода и красота', 
    'Еда и напитки',
    'Автомобили',
    'Финансы и банки',
    'Недвижимость',
    'Образование',
    'Здравоохранение',
    'Спорт и фитнес',
    'Путешествия',
    'Развлечения',
    'Другое'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Info */}
        <div className="text-center lg:text-left">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Ublogger для{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Рекламодателей
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Найдите идеальных блогеров для продвижения вашего бренда на российском рынке
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">20+ тысяч блогеров</h3>
                <p className="text-gray-400">Каталог верифицированных создателей контента</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Точный таргетинг</h3>
                <p className="text-gray-400">Фильтры по аудитории, тематике и географии</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Прозрачность</h3>
                <p className="text-gray-400">Полная аналитика и контроль ROI кампаний</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <Card className="p-8 bg-slate-900/80 backdrop-blur-md border border-gray-700">
          <div className="text-center mb-8">
            <Badge className="bg-blue-500 text-white mb-4">
              {mode === 'login' ? 'Вход' : 'Регистрация'} рекламодателя
            </Badge>
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Войти в кабинет' : 'Создать аккаунт'}
            </h2>
            <p className="text-gray-400">
              {mode === 'login' 
                ? 'Войдите в личный кабинет рекламодателя' 
                : 'Зарегистрируйтесь и получите доступ к каталогу блогеров'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {mode === 'register' && (
              <>
                {/* Company Name */}
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Название компании"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Contact Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="contactName"
                    placeholder="Контактное лицо"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Industry */}
                <div className="relative">
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                    required
                  >
                    <option value="">Выберите отрасль</option>
                    {industries.map((industry, index) => (
                      <option key={index} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (900) 123-45-67"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Website */}
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    placeholder="https://yourcompany.ru"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email компании"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-11 pr-12 py-3 bg-slate-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {mode === 'register' && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-blue-300">
                  ✓ Доступ к каталогу блогеров<br/>
                  ✓ Расширенные фильтры поиска<br/>
                  ✓ Аналитика кампаний<br/>
                  ✓ Техническая поддержка
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 text-lg font-semibold"
            >
              {mode === 'login' ? 'Войти в кабинет' : 'Создать аккаунт рекламодателя'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                {mode === 'login' 
                  ? 'Нет аккаунта? Зарегистрироваться как рекламодатель' 
                  : 'Уже есть аккаунт? Войти'
                }
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-gray-300 text-sm"
              >
                ← Вернуться на главную
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdvertiserAuth;