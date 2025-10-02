import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  X, Plus, Target, DollarSign, Users, 
  FileText, Shield, AlertCircle, CheckCircle
} from 'lucide-react';

const CreateCampaignModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    product: '',
    description: '',
    paymentModel: '',
    paymentAction: '',
    customPaymentAction: '',
    requirements: '',
    allowed: '',
    forbidden: '',
    targetAudience: '',
    platforms: [],
    budget: '',
    deadline: '',
    geo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const paymentModels = [
    { id: 'cpp', name: 'CPP - Cost Per Post', description: 'Оплата за публикацию' },
    { id: 'cpa', name: 'CPA - Cost Per Action', description: 'Оплата за действие' }
  ];

  const paymentActions = [
    'За первый заказ',
    'За установку приложения', 
    'За покупку',
    'За активацию аккаунта',
    'За выдачу карты',
    'За регистрацию',
    'За подписку',
    'Другое'
  ];

  const platformOptions = [
    { id: 'youtube', name: 'YouTube', icon: '📹' },
    { id: 'telegram', name: 'Telegram', icon: '📱' },
    { id: 'rutube', name: 'RuTube', icon: '🎬' },
    { id: 'vk', name: 'ВКонтакте', icon: '🔵' },
    { id: 'dzen', name: 'Дзен', icon: '📰' }
  ];

  const steps = [
    { id: 1, title: 'Основная информация', icon: FileText },
    { id: 2, title: 'Модель оплаты', icon: DollarSign },
    { id: 3, title: 'Требования и таргетинг', icon: Target }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Создание рекламной кампании</h2>
            <p className="text-gray-300">Шаг {currentStep} из {steps.length}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center px-6 py-4 bg-slate-800/50">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  currentStep === step.id 
                    ? 'bg-purple-500 text-white' 
                    : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Шаг 1: Основная информация */}
          {currentStep === 1 && (
            <div className="p-6 space-y-6">
              <div>
                <label className="text-white font-semibold mb-2 block">Название кампании *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Например: Продвижение нового смартфона TechNova X1"
                  className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-white font-semibold mb-2 block">Рекламируемый продукт *</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  placeholder="Например: Смартфон TechNova X1 256GB"
                  className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-white font-semibold mb-2 block">Описание кампании *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Опишите цели кампании, ключевые преимущества продукта, целевую аудиторию..."
                  rows={4}
                  className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white font-semibold mb-2 block">Бюджет кампании</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="1000000"
                    className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white font-semibold mb-2 block">Дедлайн</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Шаг 2: Модель оплаты */}
          {currentStep === 2 && (
            <div className="p-6 space-y-6">
              <div>
                <label className="text-white font-semibold mb-4 block">Модель оплаты *</label>
                <div className="space-y-3">
                  {paymentModels.map(model => (
                    <Card 
                      key={model.id} 
                      className={`p-4 cursor-pointer transition-colors ${
                        formData.paymentModel === model.id 
                          ? 'bg-purple-500/20 border-purple-500' 
                          : 'bg-slate-800/50 border-gray-700 hover:border-purple-500/50'
                      }`}
                      onClick={() => handleInputChange('paymentModel', model.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.paymentModel === model.id 
                            ? 'bg-purple-500 border-purple-500' 
                            : 'border-gray-500'
                        }`} />
                        <div>
                          <h4 className="font-bold text-white">{model.name}</h4>
                          <p className="text-gray-400 text-sm">{model.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {formData.paymentModel === 'cpa' && (
                <div>
                  <label className="text-white font-semibold mb-2 block">Тип действия для CPA *</label>
                  <select
                    value={formData.paymentAction}
                    onChange={(e) => handleInputChange('paymentAction', e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    required
                  >
                    <option value="">Выберите тип действия</option>
                    {paymentActions.map(action => (
                      <option key={action} value={action}>{action}</option>
                    ))}
                  </select>
                  
                  {formData.paymentAction === 'Другое' && (
                    <input
                      type="text"
                      value={formData.customPaymentAction}
                      onChange={(e) => handleInputChange('customPaymentAction', e.target.value)}
                      placeholder="Опишите свой тип действия"
                      className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none mt-3"
                    />
                  )}
                </div>
              )}

              <div>
                <label className="text-white font-semibold mb-2 block">Платформы для размещения *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {platformOptions.map(platform => (
                    <Card
                      key={platform.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        formData.platforms.includes(platform.id)
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-slate-800/50 border-gray-700 hover:border-purple-500/50'
                      }`}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{platform.icon}</div>
                        <div className="text-sm font-medium text-white">{platform.name}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Шаг 3: Требования и таргетинг */}
          {currentStep === 3 && (
            <div className="p-6 space-y-6">
              <div>
                <label className="text-white font-semibold mb-2 block">Требования к публикациям *</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="Например: Минимум 50K подписчиков, российская аудитория, тематика Tech/Lifestyle..."
                  rows={3}
                  className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-white font-semibold mb-2 block flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Что разрешено
                  </label>
                  <textarea
                    value={formData.allowed}
                    onChange={(e) => handleInputChange('allowed', e.target.value)}
                    placeholder="Например: Личное мнение, демонстрация функций, сравнение с конкурентами..."
                    rows={4}
                    className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-red-400" />
                    Что запрещено
                  </label>
                  <textarea
                    value={formData.forbidden}
                    onChange={(e) => handleInputChange('forbidden', e.target.value)}
                    placeholder="Например: Упоминание конкурентов, негативные отзывы, размещение без маркировки..."
                    rows={4}
                    className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-white font-semibold mb-2 block">Целевая аудитория и таргетинг</label>
                <textarea
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  placeholder="Например: Мужчины и женщины 25-45 лет, интересы: технологии, гаджеты; География: Москва, СПб, крупные города..."
                  rows={3}
                  className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white font-semibold mb-2 block">География</label>
                <input
                  type="text"
                  value={formData.geo}
                  onChange={(e) => handleInputChange('geo', e.target.value)}
                  placeholder="Например: Россия, Москва, СПб, крупные города"
                  className="w-full p-3 bg-slate-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          )}

        </form>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 bg-slate-800/50">
          <div className="flex items-center justify-between">
            <div>
              {currentStep > 1 && (
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="border-gray-600 text-gray-300"
                >
                  ← Назад
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
                Отменить
              </Button>
              
              {currentStep < steps.length ? (
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Далее →
                </Button>
              ) : (
                <Button 
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  🚀 Создать кампанию
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;