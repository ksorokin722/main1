import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  TrendingUp, DollarSign, Eye, Heart, Share2, 
  Calendar, BarChart3, Users, Target, Award
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('3m');
  
  // Моковые данные аналитики
  const analyticsData = {
    earnings: {
      labels: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл'],
      datasets: [{
        label: 'Доход (₽)',
        data: [15000, 22000, 18000, 35000, 28000, 45000, 52000],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    campaigns: {
      labels: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл'],
      datasets: [{
        label: 'Количество кампаний',
        data: [3, 5, 4, 8, 6, 10, 12],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)', 
          'rgba(168, 85, 247, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      }]
    },
    engagement: {
      labels: ['Просмотры', 'Лайки', 'Комментарии', 'Репосты'],
      datasets: [{
        data: [2300000, 156000, 23000, 18500],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }]
    },
    platforms: {
      labels: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл'],
      datasets: [
        {
          label: 'YouTube',
          data: [45000, 52000, 48000, 65000, 58000, 72000, 78000],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4
        },
        {
          label: 'Telegram',
          data: [25000, 28000, 32000, 35000, 38000, 42000, 45000],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        },
        {
          label: 'RuTube',
          data: [15000, 18000, 22000, 25000, 28000, 32000, 35000],
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          tension: 0.4
        },
        {
          label: 'ВКонтакте',
          data: [12000, 15000, 18000, 22000, 25000, 28000, 30000],
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4
        }
      ]
    }
  };

  const campaignMetrics = [
    {
      id: 1,
      name: 'Новая линейка смартфонов TechNova X1',
      brand: 'TechNova',
      date: '2025-01-15',
      platform: 'YouTube',
      views: 125000,
      likes: 8500,
      comments: 650,
      shares: 320,
      ctr: 4.2,
      engagement: 7.8,
      earnings: 15000,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Весенняя коллекция FashionSpace',
      brand: 'FashionSpace',
      date: '2025-01-10',
      platform: 'Telegram',
      views: 85000,
      likes: 6200,
      comments: 420,
      shares: 280,
      ctr: 5.1,
      engagement: 8.2,
      earnings: 20000,
      rating: 5.0
    },
    {
      id: 3,
      name: 'Здоровый образ жизни с HealthyLife',
      brand: 'HealthyLife',
      date: '2025-01-05',
      platform: 'RuTube',
      views: 65000,
      likes: 4800,
      comments: 380,
      shares: 190,
      ctr: 3.8,
      engagement: 8.5,
      earnings: 12500,
      rating: 4.8
    }
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(156, 163, 175)'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)'
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)'
        }
      },
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)'
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgb(156, 163, 175)',
          usePointStyle: true,
          padding: 20
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">Аналитика</h2>
          <p className="text-gray-400">Детальная статистика ваших кампаний и показателей</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          {[
            { value: '1m', label: '1 мес' },
            { value: '3m', label: '3 мес' },
            { value: '6m', label: '6 мес' },
            { value: '1y', label: '1 год' }
          ].map(period => (
            <button
              key={period.value}
              onClick={() => setTimeRange(period.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeRange === period.value
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-800/50 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <div className="text-right">
              <div className="text-sm text-gray-400">Доход за месяц</div>
              <div className="text-2xl font-black text-green-400">52,000 ₽</div>
            </div>
          </div>
          <div className="text-sm text-green-400 font-medium">+18.5% к прошлому месяцу</div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-blue-400" />
            <div className="text-right">
              <div className="text-sm text-gray-400">Кампаний</div>
              <div className="text-2xl font-black text-blue-400">12</div>
            </div>
          </div>
          <div className="text-sm text-blue-400 font-medium">+3 к прошлому месяцу</div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-purple-400" />
            <div className="text-right">
              <div className="text-sm text-gray-400">Просмотры</div>
              <div className="text-2xl font-black text-purple-400">2.3M</div>
            </div>
          </div>
          <div className="text-sm text-purple-400 font-medium">+25.3% к прошлому месяцу</div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <div className="text-right">
              <div className="text-sm text-gray-400">Ср. рейтинг</div>
              <div className="text-2xl font-black text-yellow-400">4.9</div>
            </div>
          </div>
          <div className="text-sm text-yellow-400 font-medium">+0.2 к прошлому месяцу</div>
        </Card>
      </div>

      <Tabs defaultValue="earnings" className="w-full">
        <TabsList className="grid grid-cols-4 w-full bg-slate-800/50 border border-gray-700">
          <TabsTrigger value="earnings" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Доходы
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Кампании
          </TabsTrigger>
          <TabsTrigger value="engagement" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Вовлечение
          </TabsTrigger>
          <TabsTrigger value="platforms" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Платформы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Динамика доходов</h3>
            <div className="h-80">
              <Line data={analyticsData.earnings} options={chartOptions} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Количество кампаний по месяцам</h3>
            <div className="h-80">
              <Bar data={analyticsData.campaigns} options={chartOptions} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Структура вовлечения аудитории</h3>
            <div className="h-80">
              <Doughnut data={analyticsData.engagement} options={doughnutOptions} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Просмотры по платформам</h3>
            <div className="h-80">
              <Line data={analyticsData.platforms} options={chartOptions} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Campaign Performance Table */}
      <Card className="p-6 bg-slate-800/50 border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Показатели кампаний</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Кампания</th>
                <th className="text-left py-3 px-4 text-gray-300 font-semibold">Платформа</th>
                <th className="text-right py-3 px-4 text-gray-300 font-semibold">Просмотры</th>
                <th className="text-right py-3 px-4 text-gray-300 font-semibold">Вовлечение</th>
                <th className="text-right py-3 px-4 text-gray-300 font-semibold">CTR</th>
                <th className="text-right py-3 px-4 text-gray-300 font-semibold">Доход</th>
                <th className="text-right py-3 px-4 text-gray-300 font-semibold">Рейтинг</th>
              </tr>
            </thead>
            <tbody>
              {campaignMetrics.map((campaign, index) => (
                <tr key={campaign.id} className="border-b border-gray-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-white">{campaign.name}</div>
                      <div className="text-sm text-gray-400">{campaign.brand}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.platform === 'YouTube' ? 'bg-red-500/20 text-red-400' :
                      campaign.platform === 'Telegram' ? 'bg-blue-500/20 text-blue-400' :
                      campaign.platform === 'RuTube' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {campaign.platform}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-white">
                    {campaign.views.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-green-400 font-semibold">
                    {campaign.engagement}%
                  </td>
                  <td className="py-4 px-4 text-right text-blue-400 font-semibold">
                    {campaign.ctr}%
                  </td>
                  <td className="py-4 px-4 text-right text-green-400 font-bold">
                    {campaign.earnings.toLocaleString()} ₽
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {[...Array(Math.floor(campaign.rating))].map((_, i) => (
                        <Award key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                      <span className="text-yellow-400 font-semibold ml-1">{campaign.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
