import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Rocket, TrendingUp, Zap } from 'lucide-react';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('cta-section');
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
    const handleMouseMove = (e) => {
      const rect = document.getElementById('cta-section')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const element = document.getElementById('cta-section');
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div id="cta-section" className="relative">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {/* Main Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20"></div>
          
          {/* Floating Orbs */}
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse"
            style={{
              left: `${20 + mousePosition.x * 0.1}%`,
              top: `${30 + mousePosition.y * 0.1}%`,
              transition: 'all 0.3s ease-out'
            }}
          ></div>
          <div 
            className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full filter blur-3xl animate-pulse"
            style={{
              right: `${15 + mousePosition.x * 0.05}%`,
              bottom: `${20 + mousePosition.y * 0.05}%`,
              transition: 'all 0.5s ease-out',
              animationDelay: '2s'
            }}
          ></div>
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '50px 50px',
              animation: 'moveGrid 20s linear infinite'
            }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 animate-float">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-300" />
            </div>
          </div>
          <div className="absolute top-32 right-24 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-300" />
            </div>
          </div>
          <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl backdrop-blur-sm border border-green-500/30 flex items-center justify-center">
              <Zap className="w-7 h-7 text-green-300" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-8 backdrop-blur-sm">
              <Rocket className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-sm font-medium text-purple-300">Начните свой путь к успеху прямо сейчас</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Готовы
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                стать лидером?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Присоединяйтесы к <span className="text-purple-400 font-bold">1,250,000+</span> блогеров,
              которые уже зарабатывают <span className="text-green-400 font-bold">12.5 млрд ₽</span> в год
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-12 py-6 rounded-full text-xl transform hover:scale-110 transition-all duration-200 shadow-2xl shadow-purple-500/25 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  Начать зарабатывать
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-200" />
                </div>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-500/20 px-12 py-6 rounded-full text-xl backdrop-blur-sm font-semibold transition-all duration-200 group"
              >
                Узнать больше
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  1.25M+
                </div>
                <div className="text-gray-400">Блогеров</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  12.5B₽
                </div>
                <div className="text-gray-400">Общие доходы</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  450+
                </div>
                <div className="text-gray-400">Брендов</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  47%
                </div>
                <div className="text-gray-400">Рост за год</div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl backdrop-blur-sm border border-purple-500/10">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">Бесплатная регистрация</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl backdrop-blur-sm border border-green-500/10">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">Мгновенные выплаты</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl backdrop-blur-sm border border-blue-500/10">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">Поддержка 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default CTA;
