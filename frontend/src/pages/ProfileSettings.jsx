import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { 
  User, Settings, CreditCard, Phone, Mail, Globe, 
  Save, AlertCircle, CheckCircle, Star, Youtube, 
  MessageCircle, Video, Users, Gift
} from 'lucide-react';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    contactInfo: user?.contactInfo || {
      telegram: '',
      whatsapp: '',
      vk: ''
    },
    payoutInfo: user?.payoutInfo || {
      method: 'card',
      cardNumber: '',
      bankName: '',
      accountHolder: ''
    }
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async (section) => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      updateUser(formData);
      setIsSaving(false);
    }, 1000);
  };

  const getLoyaltyLevel = (points) => {
    if (points >= 1000) return { level: 'Платиновый', color: 'from-purple-500 to-purple-600', next: null };
    if (points >= 500) return { level: 'Золотой', color: 'from-yellow-500 to-yellow-600', next: { level: 'Платиновый', needed: 1000 - points } };
    if (points >= 200) return { level: 'Серебряный', color: 'from-gray-400 to-gray-500', next: { level: 'Золотой', needed: 500 - points } };
    return { level: 'Бронзовый', color: 'from-amber-600 to-amber-700', next: { level: 'Серебряный', needed: 200 - points } };
  };

  const loyaltyInfo = getLoyaltyLevel(user?.loyaltyPoints || 0);

  const socialPlatforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { id: 'telegram', name: 'Telegram', icon: MessageCircle, color: 'text-blue-500' },
    { id: 'rutube', name: 'RuTube', icon: Video, color: 'text-purple-500' },
    { id: 'vk', name: 'ВКонтакте', icon: Users, color: 'text-indigo-500' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Настройки профиля</h1>
          <p className="text-gray-400 mt-2">Управляйте своими данными и предпочтениями</p>
        </div>
        <div className="flex items-center space-x-2">
          <Gift className="w-5 h-5 text-purple-400" />
          <div className="text-right">
            <div className={`text-sm font-bold bg-gradient-to-r ${loyaltyInfo.color} bg-clip-text text-transparent`}>
              {loyaltyInfo.level}
            </div>
            <div className="text-xs text-gray-400">{user?.loyaltyPoints || 0} баллов</div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full bg-slate-800/50 border border-gray-700">
          <TabsTrigger value="personal" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Личные данные
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Globe className="w-4 h-4 mr-2" />
            Соцсети
          </TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Phone className="w-4 h-4 mr-2" />
            Контакты
          </TabsTrigger>
          <TabsTrigger value="payout" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Выплаты
          </TabsTrigger>
        </TabsList>

        {/* Personal Data Tab */}
        <TabsContent value="personal" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Личная информация</h3>
              {!user?.isVerified && (
                <div className="flex items-center space-x-2 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">Требуется верификация</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                  placeholder="+7 (900) 123-45-67"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => handleSave('personal')}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isSaving ? 'Сохранение...' : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Подключенные социальные сети</h3>
            
            <div className="space-y-4">
              {socialPlatforms.map(platform => {
                const connectedAccount = user?.socialAccounts?.find(acc => acc.id === platform.id);
                const Icon = platform.icon;
                
                return (
                  <div key={platform.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-slate-600 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${platform.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{platform.name}</h4>
                        {connectedAccount ? (
                          <p className="text-sm text-gray-400">{connectedAccount.followers.toLocaleString()} подписчиков</p>
                        ) : (
                          <p className="text-sm text-gray-500">Не подключено</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {connectedAccount ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Подключено</Badge>
                        </>
                      ) : (
                        <Button variant="outline" className="border-gray-600 text-gray-300">
                          Подключить
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Contact Info Tab */}
        <TabsContent value="contacts" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Контактная информация</h3>
            <p className="text-gray-400 mb-6">Укажите удобные способы связи для рекламодателей</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telegram</label>
                <Input
                  value={formData.contactInfo.telegram}
                  onChange={(e) => handleInputChange('contactInfo.telegram', e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                  placeholder="@your_telegram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                <Input
                  value={formData.contactInfo.whatsapp}
                  onChange={(e) => handleInputChange('contactInfo.whatsapp', e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                  placeholder="+7 (900) 123-45-67"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ВКонтакте</label>
                <Input
                  value={formData.contactInfo.vk}
                  onChange={(e) => handleInputChange('contactInfo.vk', e.target.value)}
                  className="bg-slate-700/50 border-gray-600 text-white"
                  placeholder="vk.com/your_profile"
                />
              </div>
              <Button
                onClick={() => handleSave('contacts')}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {isSaving ? 'Сохранение...' : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить контакты
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Payout Info Tab */}
        <TabsContent value="payout" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Настройки выплат</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Способ выплаты</label>
                <select 
                  value={formData.payoutInfo.method}
                  onChange={(e) => handleInputChange('payoutInfo.method', e.target.value)}
                  className="w-full p-3 bg-slate-700/50 border border-gray-600 text-white rounded-lg focus:border-purple-500"
                >
                  <option value="card">Банковская карта</option>
                  <option value="sbp">СБП</option>
                  <option value="qiwi">QIWI</option>
                  <option value="yoomoney">ЮMoney</option>
                </select>
              </div>
              
              {formData.payoutInfo.method === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Номер карты</label>
                    <Input
                      value={formData.payoutInfo.cardNumber}
                      onChange={(e) => handleInputChange('payoutInfo.cardNumber', e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Название банка</label>
                    <Input
                      value={formData.payoutInfo.bankName}
                      onChange={(e) => handleInputChange('payoutInfo.bankName', e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white"
                      placeholder="Сбербанк"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Держатель карты</label>
                    <Input
                      value={formData.payoutInfo.accountHolder}
                      onChange={(e) => handleInputChange('payoutInfo.accountHolder', e.target.value)}
                      className="bg-slate-700/50 border-gray-600 text-white"
                      placeholder="IVAN PETROV"
                    />
                  </div>
                </>
              )}
              
              <Button
                onClick={() => handleSave('payout')}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                {isSaving ? 'Сохранение...' : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить реквизиты
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Loyalty Program */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Gift className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Программа лояльности</h3>
              <p className="text-gray-300">Зарабатывайте баллы за активность</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-black bg-gradient-to-r ${loyaltyInfo.color} bg-clip-text text-transparent`}>
              {user?.loyaltyPoints || 0}
            </div>
            <div className="text-sm text-gray-400">баллов</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Текущий статус</h4>
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${loyaltyInfo.color} text-white font-semibold`}>
              <Star className="w-4 h-4 mr-2" />
              {loyaltyInfo.level}
            </div>
            {loyaltyInfo.next && (
              <p className="text-sm text-gray-400 mt-2">
                До уровня "{loyaltyInfo.next.level}" осталось: {loyaltyInfo.next.needed} баллов
              </p>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">Как заработать баллы</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Завершение кампании: +50 баллов</li>
              <li>• Высокий рейтинг (5 звезд): +25 баллов</li>
              <li>• Верификация профиля: +100 баллов</li>
              <li>• Подключение соцсети: +20 баллов</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSettings;
