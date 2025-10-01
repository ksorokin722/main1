import React, { useState, useEffect } from 'react';
import { stats } from './mockData';
import { TrendingUp, Users, DollarSign, Target, Zap, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({});
  const [selectedStat, setSelectedStat] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const statsData = [
    {
      icon: Users,
      value: '1,250,000',
      label: 'Российских блогеров',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      chartData: [
        { month: 'Янв', value: 850000 },
        { month: 'Фев', value: 920000 },
        { month: 'Мар', value: 980000 },
        { month: 'Апр', value: 1050000 },
        { month: 'Май', value: 1120000 },
        { month: 'Июн', value: 1180000 },
        { month: 'Июл', value: 1250000 }
      ]
    },
    {
      icon: DollarSign,
      value: '12.5 млрд ₽',
      label: 'Общий российский доход',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      chartData: [
        { month: 'Янв', value: 8.2 },
        { month: 'Фев', value: 9.1 },
        { month: 'Мар', value: 9.8 },
        { month: 'Апр', value: 10.5 },
        { month: 'Май', value: 11.2 },
        { month: 'Июн', value: 11.8 },
        { month: 'Июл', value: 12.5 }
      ]
    },
    {
      icon: Target,
      value: '450',
      label: 'Российских брендов',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      chartData: [
        { month: 'Янв', value: 280 },
        { month: 'Фев', value: 310 },
        { month: 'Мар', value: 340 },
        { month: 'Апр', value: 375 },
        { month: 'Май', value: 400 },
        { month: 'Июн', value: 425 },
        { month: 'Июл', value: 450 }
      ]
    },
    {
      icon: Award,
      value: '89',
      label: 'Эксклюзивных проектов РФ',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/10 to-red-500/10',
      chartData: [
        { month: 'Янв', value: 45 },
        { month: 'Фев', value: 52 },
        { month: 'Мар', value: 61 },
        { month: 'Апр', value: 68 },
        { month: 'Май', value: 75 },
        { month: 'Июн', value: 82 },
        { month: 'Июл', value: 89 }
      ]
    },
    {
      icon: TrendingUp,
      value: '0.85 ₽',
      label: 'Средняя стоимость CPV (РФ)',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-500/10 to-purple-500/10',
      chartData: [
        { month: 'Янв', value: 0.72 },
        { month: 'Фев', value: 0.75 },
        { month: 'Мар', value: 0.78 },
        { month: 'Апр', value: 0.80 },
        { month: 'Май', value: 0.82 },
        { month: 'Июн', value: 0.83 },
        { month: 'Июл', value: 0.85 }
      ]
    },
    {
      icon: Zap,
      value: '23,847',
      label: 'Успешных российских кампаний',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-500/10 to-cyan-500/10',
      chartData: [
        { month: 'Янв', value: 12500 },
        { month: 'Фев', value: 15200 },
        { month: 'Мар', value: 17800 },
        { month: 'Апр', value: 19500 },
        { month: 'Май', value: 21200 },
        { month: 'Июн', value: 22400 },
        { month: 'Июл', value: 23847 }
      ]
    }
  ];

  // Кастомный тултип для recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-slate-800 p-3 rounded-lg border border-gray-600 shadow-lg">
          <p className="text-gray-300 text-sm">{`${label}`}</p>
          <p className="text-purple-400 font-semibold">
            {`Значение: ${typeof data.value === 'number' ? data.value.toLocaleString() : data.value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleStatClick = (stat, index) => {
    // Prevent the stat from turning black by ensuring proper state handling
    setSelectedStat(index);
    setShowChart(true);
    
    // Prevent any default click behavior that might be causing the blackening issue
    event?.preventDefault();
    event?.stopPropagation();
  };

  const closeChart = () => {
    setShowChart(false);
    setSelectedStat(null);
  };

  return (
    <section id="stats-section" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">Наши достижения в России</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Мы меняем
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              российскую индустрию блогинга
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Платформа, которая объединяет миллионы российских блогеров с лучшими отечественными брендами через современные технологии
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); 
                  handleStatClick(stat, index);
                }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/30 transition-all duration-300"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className={`text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                    {stat.label}
                  </div>
                  
                  {/* Click Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300`}></div>
                </div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} p-[1px]`}>
                    <div className="w-full h-full bg-slate-900 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Данные обновляются в реальном времени для российского рынка</span>
          </div>
        </div>
      </div>

      {/* Chart Modal */}
      {showChart && selectedStat !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl border border-gray-700 p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">{statsData[selectedStat].label}</h3>
                <p className="text-gray-400">Динамика роста за последние 7 месяцев</p>
              </div>
              <button
                onClick={closeChart}
                className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={statsData[selectedStat].chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'rgb(156, 163, 175)' }}
                    axisLine={{ stroke: 'rgba(75, 85, 99, 0.3)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgb(156, 163, 175)' }}
                    axisLine={{ stroke: 'rgba(75, 85, 99, 0.3)' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="rgb(168, 85, 247)"
                    strokeWidth={3}
                    dot={{ fill: 'rgb(168, 85, 247)', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: 'rgb(168, 85, 247)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <p className="text-purple-300 text-center">
                📈 Нажмите на любую карточку статистики, чтобы увидеть детальную динамику показателей российского рынка
              </p>
            </div>
          </div>
        </div>
      )}

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

export default Stats;
