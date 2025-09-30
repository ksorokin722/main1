import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, Sparkles, TrendingUp, Zap } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute bottom-40 left-16 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="w-7 h-7 text-white" />
          </div>
        </div>
        
        {/* Interactive Mouse Follower */}
        <div 
          className="absolute w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full filter blur-sm opacity-70 pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: `scale(${isHovered ? 1.5 : 1})`
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-8 animate-fadeInUp">
          <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
          <span className="text-sm font-medium text-purple-300">#1 платформа в России и СНГ</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Революция в
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
            инфлюенс-маркетинге
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          Соединяем <span className="text-purple-400 font-semibold">1,250,000+ блогеров</span> с лучшими брендами через
          <span className="text-pink-400 font-semibold"> AI-аналитику</span> и
          <span className="text-cyan-400 font-semibold"> автоматизацию процессов</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-2xl shadow-purple-500/25 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Начать зарабатывать
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/10 px-8 py-4 rounded-full transition-all duration-200 backdrop-blur-sm group"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Смотреть демо
          </Button>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
              1.25M+
            </div>
            <div className="text-sm text-gray-400">Активных блогеров</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
              12.5B₽
            </div>
            <div className="text-sm text-gray-400">Общий доход</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
              450+
            </div>
            <div className="text-sm text-gray-400">Партнерских брендов</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
              47%
            </div>
            <div className="text-sm text-gray-400">Рост за год</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
