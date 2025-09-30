import React from 'react';
import { Sparkles, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-purple-500/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-12 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Ublogger
                </h3>
                <p className="text-xs text-purple-300">Лидер рынка</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Платформа #1 в России для сотрудничества между блогерами и брендами. Мы создаем будущее инфлюенс-маркетинга.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: '#', color: 'from-pink-500 to-rose-500' },
                { icon: Youtube, href: '#', color: 'from-red-500 to-red-600' },
                { icon: Twitter, href: '#', color: 'from-blue-400 to-blue-500' },
                { icon: Linkedin, href: '#', color: 'from-blue-600 to-blue-700' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-lg group`}
                  >
                    <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* For Bloggers */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Для блогеров
                </h4>
                <ul className="space-y-3">
                  {[
                    'Начать зарабатывать',
                    'Поиск кампаний',
                    'Обучение блогеров',
                    'Аналитика',
                    'Сообщество'
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                      >
                        <div className="w-1 h-1 bg-gray-600 group-hover:bg-purple-400 rounded-full mr-3 transition-colors"></div>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Brands */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Для брендов
                </h4>
                <ul className="space-y-3">
                  {[
                    'Создать кампанию',
                    'Поиск блогеров',
                    'Маркетинг услуги',
                    'Отчетность',
                    'Кейсы'
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        <div className="w-1 h-1 bg-gray-600 group-hover:bg-blue-400 rounded-full mr-3 transition-colors"></div>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support & Contact */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Поддержка
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <Mail className="w-4 h-4 mr-3 group-hover:text-green-400" />
                      support@ublogger.ru
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <Phone className="w-4 h-4 mr-3 group-hover:text-green-400" />
                      +7 (800) 555-0123
                    </a>
                  </li>
                  <li>
                    <div className="text-gray-400 flex items-start group">
                      <MapPin className="w-4 h-4 mr-3 mt-1 group-hover:text-green-400 transition-colors" />
                      <div>
                        Москва, Россия<br />
                        Бизнес-центр "Ublogger"
                      </div>
                    </div>
                  </li>
                </ul>
                
                {/* Status Indicators */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">Сервис работает нормально</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-xs text-gray-400">24/7 поддержка</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Ublogger. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                Пользовательское соглашение
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                Cookie
              </a>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">SSL защищено</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-xs text-blue-400 font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              <span className="text-xs text-purple-400 font-medium">Лицензия ЦБ РФ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
