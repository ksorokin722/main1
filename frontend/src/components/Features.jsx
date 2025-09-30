import React, { useState, useEffect } from 'react';
import { features } from './mockData';
import { BarChart3, Zap, CreditCard, Users, TrendingUp, Shield } from 'lucide-react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const iconMap = {
    BarChart3: BarChart3,
    Zap: Zap,
    CreditCard: CreditCard,
    Users: Users,
    TrendingUp: TrendingUp,
    Shield: Shield
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('features-section');
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
    <section id="features" className="py-24 relative overflow-hidden">
      <div id="features-section">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full filter blur-3xl"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-6">
              <Zap className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">Уникальные возможности</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Технологии
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                будущего
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Мы создали мощную экосистему, которая автоматизирует каждый этап сотрудничества между блогерами и брендами
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              const isHovered = hoveredFeature === index;
              
              return (
                <div
                  key={feature.id}
                  className={`relative group cursor-pointer transform transition-all duration-500 ${
                    isVisible ? 'animate-fadeInUp' : 'opacity-0'
                  } ${isHovered ? 'scale-105 z-10' : 'hover:scale-105'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Main Card */}
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/30 transition-all duration-500 h-full">
                    {/* Background Gradient Overlay */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} p-[1px] animate-pulse`}>
                        <div className="w-full h-full bg-slate-900/90 rounded-3xl"></div>
                      </div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}></div>
                  </div>
                  
                  {/* Interactive Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-medium">Постоянно обновляемся</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm text-blue-400 font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                <span className="text-sm text-purple-400 font-medium">24/7 Поддержка</span>
              </div>
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

export default Features;
