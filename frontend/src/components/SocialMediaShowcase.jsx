import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Youtube, MessageCircle, Video, Users, Zap, TrendingUp, PlayCircle, Eye, Heart, Share2 } from 'lucide-react';

const SocialMediaShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  const socialPlatforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-500/10 to-red-600/10',
      users: '2.1M блогеров',
      earnings: '85% от дохода',
      image: 'https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxjb250ZW50JTIwY3JlYXRpb248ZW58MHx8fHwxNzU5MjcyMTE2fDA&ixlib=rb-4.1.0&q=85',
      description: 'Создавайте видеоконтент и зарабатывайте на рекламе'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/10 to-blue-600/10',
      users: '1.8M каналов',
      earnings: '70% от дохода',
      image: 'https://images.pexels.com/photos/4345410/pexels-photo-4345410.jpeg',
      description: 'Монетизируйте свой канал через подписки и рекламу'
    },
    {
      id: 'rutube',
      name: 'RuTube',
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-500/10 to-purple-600/10',
      users: '850K авторов',
      earnings: '80% от дохода',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxjb250ZW50JTIwY3JlYXRpb258ZW58MHx8fHwxNzU5MjcyMTE2fDA&ixlib=rb-4.1.0&q=85',
      description: 'Российская платформа с высокими выплатами'
    },
    {
      id: 'vk',
      name: 'ВКонтакте',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-500/10 to-indigo-600/10',
      users: '3.2M пользователей',
      earnings: '65% от дохода',
      image: 'https://images.unsplash.com/photo-1755541516450-644adb257ad0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MXwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYXxlbnwwfHx8fDE3NTkyMjU2ODd8MA&ixlib=rb-4.1.0&q=85',
      description: 'Социальная сеть с огромной аудиторией'
    }
  ];

  const successStories = [
    {
      platform: 'YouTube',
      creator: 'Анна Технологии',
      views: '2.3M',
      earnings: '485K ₽',
      growth: '+127%',
      image: 'https://images.unsplash.com/photo-1603217041431-9a99375beab0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxibG9nZ2VyfGVufDB8fHx8MTc1OTMwODUxOXww&ixlib=rb-4.1.0&q=85'
    },
    {
      platform: 'Telegram',
      creator: 'Максим Бизнес',
      views: '1.8M',
      earnings: '312K ₽',
      growth: '+89%',
      image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxibG9nZ2VyfGVufDB8fHx8MTc1OTMwODUxOXww&ixlib=rb-4.1.0&q=85'
    },
    {
      platform: 'RuTube',
      creator: 'Елена Стиль',
      views: '956K',
      earnings: '218K ₽',
      growth: '+156%',
      image: 'https://images.unsplash.com/photo-1726066012749-f81bf4422d4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb258ZW58MHx8fHwxNzU5MjcyMTE2fDA&ixlib=rb-4.1.0&q=85'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('social-showcase-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % successStories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div id="social-showcase-section">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/5 to-blue-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500/10 to-blue-500/10 border border-red-500/20 rounded-full mb-6">
              <PlayCircle className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-sm font-medium text-red-300">Все популярные платформы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Зарабатывайте на
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                любой платформе
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              YouTube, Telegram, RuTube, ВКонтакте — подключите все свои социальные сети и максимизируйте доходы
            </p>
          </div>

          {/* Social Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {socialPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.id}
                  className={`relative group cursor-pointer transform transition-all duration-500 ${
                    isVisible ? 'animate-fadeInUp' : 'opacity-0'
                  } hover:scale-105`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Platform Card */}
                  <div className="relative p-6 rounded-3xl bg-slate-800/40 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/30 transition-all duration-300 h-full">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${platform.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                    
                    {/* Platform Image */}
                    <div className="relative mb-4">
                      <div className="w-full h-32 rounded-2xl overflow-hidden mb-4">
                        <img 
                          src={platform.image} 
                          alt={platform.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className={`absolute -top-2 -right-2 w-12 h-12 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">{platform.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Блогеров:</span>
                          <span className="text-sm font-semibold text-white">{platform.users}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Доходность:</span>
                          <span className={`text-sm font-semibold bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                            {platform.earnings}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Glow */}
                    <div className={`absolute -inset-2 bg-gradient-to-br ${platform.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Success Stories Carousel */}
          <div className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-white mb-2">Истории успеха</h3>
              <p className="text-gray-400">Реальные результаты наших блогеров</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 ${
                    activeVideo === index 
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 scale-105' 
                      : 'bg-slate-700/30 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.creator}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{story.creator}</h4>
                      <p className="text-sm text-gray-400">{story.platform}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-blue-400">{story.views}</span>
                      </div>
                      <div className="text-xs text-gray-400">Просмотры</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-green-400">{story.earnings}</span>
                      </div>
                      <div className="text-xs text-gray-400">Заработок</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-bold text-purple-400">{story.growth}</span>
                      </div>
                      <div className="text-xs text-gray-400">Рост</div>
                    </div>
                  </div>
                  
                  {activeVideo === index && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <PlayCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Carousel Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveVideo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeVideo === index 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <Youtube className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-red-400 mb-1">2.1M</div>
              <div className="text-sm text-gray-400">YouTube блогеров</div>
            </div>
            <div className="text-center p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-blue-400 mb-1">1.8M</div>
              <div className="text-sm text-gray-400">Telegram каналов</div>
            </div>
            <div className="text-center p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
              <Video className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-purple-400 mb-1">850K</div>
              <div className="text-sm text-gray-400">RuTube авторов</div>
            </div>
            <div className="text-center p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
              <Users className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-indigo-400 mb-1">3.2M</div>
              <div className="text-sm text-gray-400">ВК пользователей</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SocialMediaShowcase;
