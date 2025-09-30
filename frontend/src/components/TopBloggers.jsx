import React, { useState, useEffect } from 'react';
import { topBloggers } from './mockData';
import { Badge, CheckCircle, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from './ui/button';

const TopBloggers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBlogger, setSelectedBlogger] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('bloggers-section');
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
    <section id="bloggers" className="py-24 relative overflow-hidden">
      <div id="bloggers-section">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-6">
              <Users className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">Лучшие из лучших</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Топ блогеры
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Ublogger
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Познакомьтесь с блогерами, которые зарабатывают миллионы рублей благодаря нашей платформе
            </p>
          </div>

          {/* Bloggers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topBloggers.map((blogger, index) => (
              <div
                key={blogger.id}
                className={`relative group cursor-pointer transform transition-all duration-500 ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0'
                } hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedBlogger(blogger)}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/30 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative p-6 text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300">
                      <img 
                        src={blogger.avatar} 
                        alt={blogger.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {blogger.verified && (
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                  </div>
                  
                  {/* Name & Username */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {blogger.name}
                    </h3>
                    <p className="text-purple-300 text-sm">{blogger.username}</p>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-4">
                    <span className="text-xs font-medium text-purple-300">{blogger.category}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Подписчики</span>
                      <span className="text-white font-semibold">{blogger.followers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Заработал</span>
                      <span className="text-green-400 font-semibold">{blogger.earnings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Рост</span>
                      <span className="text-cyan-400 font-semibold flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {blogger.growth}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
              <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-black text-green-400 mb-2">2.1M ₽</div>
              <div className="text-gray-300">Средний доход в месяц</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-black text-blue-400 mb-2">1.25M</div>
              <div className="text-gray-300">Активных блогеров</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-black text-purple-400 mb-2">47%</div>
              <div className="text-gray-300">Средний рост за год</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-2xl shadow-purple-500/25">
              Стать топ блогером
            </Button>
            <p className="text-gray-400 mt-4 text-sm">
              Присоединяйтесь к элитному сообществу блогеров
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

export default TopBloggers;
