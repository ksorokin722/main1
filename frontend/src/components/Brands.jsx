import React, { useState, useEffect } from 'react';
import { brands } from './mockData';
import { Building, TrendingUp, CreditCard, Star } from 'lucide-react';
import { Button } from './ui/button';

const Brands = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('brands-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="brands" className="py-24 relative overflow-hidden">
      <div id="brands-section">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-6">
              <Building className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-300">Наши партнеры</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Лидеры рынка
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                доверяют нам
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              От стартапов до международных корпораций - все выбирают Ublogger для эффективного продвижения
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className={`relative group cursor-pointer transform transition-all duration-500 ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0'
                } hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredBrand(index)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl backdrop-blur-sm border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative p-6 text-center h-full flex flex-col">
                  {/* Brand Logo */}
                  <div className="relative mb-6 flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300 mx-auto">
                      <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  {/* Brand Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                    {brand.name}
                  </h3>
                  
                  {/* Category */}
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-4">
                    <span className="text-xs font-medium text-blue-300">{brand.category}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex-grow flex flex-col justify-end space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Кампании</span>
                      <span className="text-white font-semibold">{brand.campaigns}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Бюджет</span>
                      <span className="text-green-400 font-semibold">{brand.budget}</span>
                    </div>
                    
                    {/* Partnership Status */}
                    <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-700/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 font-medium">Активный партнер</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Brand Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-blue-500/30 transition-all duration-300 group">
              <Building className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-black text-blue-400 mb-2">450+</div>
              <div className="text-gray-300">Партнерских брендов</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-green-500/30 transition-all duration-300 group">
              <CreditCard className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-black text-green-400 mb-2">8.9B ₽</div>
              <div className="text-gray-300">Общий оборот</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-purple-500/30 transition-all duration-300 group">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-black text-purple-400 mb-2">15,647</div>
              <div className="text-gray-300">Успешных кампаний</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">100% Гарантия выплат</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm text-blue-400 font-medium">Защищенные платежи</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                <span className="text-sm text-purple-400 font-medium">Проверенные бренды</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-2xl shadow-blue-500/25 mr-4">
              Стать партнером
            </Button>
            <Button variant="outline" className="border-2 border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/10 px-8 py-4 rounded-full">
              Посмотреть кейсы
            </Button>
            <p className="text-gray-400 mt-4 text-sm">
              Присоединяйтесь к 450+ успешным брендам, которые доверяют нам
            </p>
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

export default Brands;
