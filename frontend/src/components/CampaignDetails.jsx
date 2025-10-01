import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  X, Copy, Download, Eye, FileText, 
  Gift, AlertCircle, Shield, Ban,
  CheckCircle, ExternalLink
} from 'lucide-react';

const CampaignDetails = ({ campaign, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [copiedText, setCopiedText] = useState('');

  if (!isOpen || !campaign) return null;

  // Генерируем детальную информацию для каждой кампании
  const getCampaignDetails = (campaignId) => {
    const details = {
      // TechNova кампания
      '1': {
        promotion: {
          title: "Акция для ваших подписчиков",
          description: "Эксклюзивная акция для российских Tech-блогеров",
          offer: "Ваши подписчики получают промокод TECHNOVA30 для скидки 30% на новый смартфон TechNova X1 при покупке в официальных магазинах или на сайте technova.ru",
          conditions: "Акция действует на все модели TechNova X1 (128GB, 256GB, 512GB) в период с 1 февраля по 15 февраля 2025. Скидка не распространяется на аксессуары и товары других брендов. Промокод можно использовать один раз на один номер телефона.",
          participation: "Акция доступна для подписчиков, которые перейдут по вашей уникальной ссылке и введут промокод TECHNOVA30 при оформлении заказа. Статистика переходов и покупок отслеживается в личном кабинете.",
          registration: "Для участия в программе партнёрства зарегистрируйтесь на partner.technova.ru, получите уникальную ссылку и промокод для ваших подписчиков."
        },
        requirements: "Расскажите о революционных возможностях смартфона TechNova X1 и его инновационных функциях для российских пользователей. Подчеркните высокое качество камеры, мощный процессор и длительность работы батареи. Анонсируйте эксклюзивную акцию со скидкой 30% для ваших подписчиков. Поделитесь личным опытом использования устройства, покажите основные функции в действии. Не забудьте упомянуть о российской гарантии и сервисных центрах по всей стране. Создавайте engaging контент: unboxing, сравнение с предыдущими моделями, демонстрация камеры и игр. Используйте хештеги #TechNovaX1 #РоссийскиеТехнологии #ИнновацииРФ",
        important: [
          "Вознаграждение начисляется только с покупок по вашей уникальной партнёрской ссылке",
          "Обязательно указывайте промокод TECHNOVA30 в видимом месте",
          "Статистика отслеживается в реальном времени в партнёрском кабинете",
          "Выплаты производятся еженедельно при достижении суммы от 3000 ₽"
        ],
        prohibited: [
          "Публикация без маркировки: Реклама ООО «ТехНова Рус» ИНН 7705123456",
          "Сравнение с конкретными моделями iPhone или Samsung",
          "Упоминание о проблемах с предыдущими версиями",
          "Размещение на площадках, заблокированных в РФ",
          "Призывы к покупке в неофициальных магазинах"
        ]
      },
      // FashionSpace кампания  
      '2': {
        promotion: {
          title: "Акция для ваших подписчиков",
          description: "Весенняя акция для FashionSpace",
          offer: "Покажи купон в мобильном приложении или на кассе вместе с картой лояльности «Модный клуб» и получи скидку 30% на товары из новой Весенней коллекции 2025 при общей сумме покупки от 1000 руб.!",
          conditions: "Акция действует на все товары весенне-летней коллекции в чеке при общей сумме покупки от 1000 руб. Скидка не распространяется на товары по другим акциям, базовый гардероб и бельевую группу. Купон можно использовать неограниченное количество раз в период действия акции.",
          participation: "Акция доступна для подписчиков, которые покажут на кассе виртуальную или пластиковую карту лояльности «Модный клуб». Если карты нет, ее можно оформить в мобильном приложении или на кассе. Акция действует во всех фирменных магазинах России.",
          registration: "Для получения карты лояльности скачайте приложение «FashionSpace», зарегистрируйтесь, указав номер телефона, и заполните анкету. Карта будет привязана к вашему номеру телефона."
        },
        requirements: "Расскажите о FashionSpace и о широком ассортименте модной одежды по доступным ценам, о регулярных скидках и обновлениях коллекций. Анонсируйте текущую весеннюю акцию, где ваши подписчики смогут получить скидку 30%. Расскажите, что вы постоянный покупатель и регулярно обновляете гардероб в FashionSpace. Поделитесь любимыми брендами и стилями. Покажите процесс выбора и примерки в магазине. Записывайте stories о шопинге и делитесь личным мнением о качестве и стиле. Демонстрируйте красивые витрины и дружелюбный персонал магазинов.",
        important: [
          "Вознаграждение начисляется от суммы чека по товарам весенне-летней коллекции",
          "Обязательно показывать карту лояльности «Модный клуб» при покупке",
          "Минимальная сумма покупки для применения скидки — 1000 ₽",
          "Акция не суммируется с другими скидками и акциями магазина"
        ],
        prohibited: [
          "Публикация креативов без маркировки: Реклама ООО «ФэшнСпейс» ИНН 7707654321",
          "Размещения в Instagram и Facebook запрещены",
          "Упоминание конкурентов (Zara, H&M, Uniqlo)",
          "Указание на недостатки товаров или сервиса",
          "Призывы к фроду или обману системы лояльности"
        ]
      }
    };
    
    return details[campaignId] || details['1'];
  };

  const details = getCampaignDetails(campaign.id);

  const creatives = [
    {
      id: 1,
      type: 'image',
      title: 'Баннер для Stories',
      format: 'Instagram Stories (1080x1920)',
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop'
    },
    {
      id: 2, 
      type: 'image',
      title: 'Квадратный пост',
      format: 'Square (1080x1080)',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      type: 'video',
      title: 'Видео для Reels',
      format: 'Reels (1080x1920)',
      url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=600&fit=crop'
    }
  ];

  const textTemplates = [
    {
      id: 1,
      title: 'Пост для ленты',
      text: `🔥 Друзья, у меня отличные новости! 
      
Специально для моих подписчиков ${campaign.brand} запускает эксклюзивную акцию! 

${campaign.title} — это именно то, что нужно для российского рынка 💪

✨ Что вас ждет:
• Скидка 30% по промокоду 
• Высочайшее качество
• Российская гарантия

Я лично тестировал и очень доволен! Рекомендую 👍

Промокод в stories ⬆️

#реклама #${campaign.brand.replace(/\s/g, '')} 

*Реклама ${campaign.brand} ИНН 7705123456`
    },
    {
      id: 2,
      title: 'Текст для Stories',
      text: `🎯 Эксклюзив для моих подписчиков!

${campaign.brand} дарит скидку 30%

Промокод: BLOG30
Срок до: ${campaign.deadline}

Переходи по ссылке в профиле!

#реклама`
    },
    {
      id: 3,
      title: 'Короткий пост',
      text: `Попробовал ${campaign.title} — рекомендую! 

Специальная скидка 30% для моих подписчиков 🔥

Детали в stories ⬆️

#реклама ${campaign.brand}`
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    });
  };

  const tabs = [
    { id: 'details', label: 'Детали кампании', icon: Eye },
    { id: 'creatives', label: 'Креативы', icon: Download },
    { id: 'templates', label: 'Шаблоны текстов', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-700">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">{campaign.title}</h2>
            <p className="text-gray-300">{campaign.brand}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-slate-800/50">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? 'text-purple-400 border-purple-400 bg-purple-500/10' 
                    : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="p-6 space-y-6">
              
              {/* Акция для подписчиков */}
              <Card className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">{details.promotion.title}</h3>
                    <div className="space-y-4 text-gray-300">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Описание акции:</h4>
                        <p>{details.promotion.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">О предложении:</h4>
                        <p>{details.promotion.offer}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Условия:</h4>
                        <p>{details.promotion.conditions}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Как принять участие:</h4>
                        <p>{details.promotion.participation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Как зарегистрироваться:</h4>
                        <p>{details.promotion.registration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Требования к публикациям */}
              <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Требования к публикациям</h3>
                    <div className="text-gray-300 leading-relaxed">
                      <p>{details.requirements}</p>
                      <div className="mt-4 p-4 bg-blue-500/10 rounded-xl">
                        <p className="text-blue-300 font-medium">Помните, что рекламная интеграция должна быть естественной и полезной для ваших подписчиков!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Важно */}
              <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Важно (на что обратить внимание)</h3>
                    <div className="space-y-2">
                      {details.important.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Запрещено */}
              <Card className="p-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Ban className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Запрещено</h3>
                    <div className="space-y-2">
                      {details.prohibited.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          )}

          {/* Creatives Tab */}
          {activeTab === 'creatives' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Готовые креативы</h3>
                <p className="text-gray-400">Скачайте готовые изображения для ваших публикаций</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatives.map(creative => (
                  <Card key={creative.id} className="overflow-hidden bg-slate-800/50 border-gray-700">
                    <div className="relative">
                      <img 
                        src={creative.url} 
                        alt={creative.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <Badge className="absolute top-3 left-3 bg-purple-500">
                        {creative.type === 'image' ? '📸' : '🎥'} {creative.type}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white mb-1">{creative.title}</h4>
                      <p className="text-sm text-gray-400 mb-4">{creative.format}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Шаблоны текстов</h3>
                <p className="text-gray-400">Готовые тексты для ваших публикаций - просто скопируйте и адаптируйте</p>
              </div>
              
              <div className="space-y-6">
                {textTemplates.map(template => (
                  <Card key={template.id} className="p-6 bg-slate-800/50 border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">{template.title}</h4>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(template.text)}
                        className={`transition-colors ${
                          copiedText === template.text 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                      >
                        {copiedText === template.text ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Скопировано!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Копировать
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4">
                      <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                        {template.text}
                      </pre>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 bg-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500">{campaign.reward}</Badge>
              <span className="text-gray-400">Дедлайн: {campaign.deadline}</span>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Закрыть
              </Button>
              {campaign.status === 'available' && (
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Подать заявку
                </Button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CampaignDetails;