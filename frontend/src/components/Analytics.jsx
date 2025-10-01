import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  TrendingUp, DollarSign, Eye, Heart, Share2, 
  Calendar, BarChart3, Users, Target, Award
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('3m');
  
  // Моковые данные аналитики для recharts
  const analyticsData = {
    earnings: [
      { month: 'янв', earnings: 15000 },
      { month: 'фев', earnings: 22000 },
      { month: 'мар', earnings: 18000 },
      { month: 'апр', earnings: 35000 },
      { month: 'май', earnings: 28000 },
      { month: 'июн', earnings: 45000 },
      { month: 'июл', earnings: 52000 }
    ],
    campaigns: [
      { month: 'янв', campaigns: 3 },
      { month: 'фев', campaigns: 5 },
      { month: 'мар', campaigns: 4 },
      { month: 'апр', campaigns: 8 },
      { month: 'май', campaigns: 6 },
      { month: 'июн', campaigns: 10 },
      { month: 'июл', campaigns: 12 }
    ],
    engagement: [
      { name: 'Просмотры', value: 2300000, color: '#3B82F6' },
      { name: 'Лайки', value: 156000, color: '#EF4444' },
      { name: 'Комментарии', value: 23000, color: '#22C55E' },
      { name: 'Репосты', value: 18500, color: '#A855F7' }
    ],
    platforms: [
      { month: 'янв', YouTube: 45000, Telegram: 25000, RuTube: 15000, ВКонтакте: 12000 },
      { month: 'фев', YouTube: 52000, Telegram: 28000, RuTube: 18000, ВКонтакте: 15000 },
      { month: 'мар', YouTube: 48000, Telegram: 32000, RuTube: 22000, ВКонтакте: 18000 },
      { month: 'апр', YouTube: 65000, Telegram: 35000, RuTube: 25000, ВКонтакте: 22000 },
      { month: 'май', YouTube: 58000, Telegram: 38000, RuTube: 28000, ВКонтакте: 25000 },
      { month: 'июн', YouTube: 72000, Telegram: 42000, RuTube: 32000, ВКонтакте: 28000 },
      { month: 'июл', YouTube: 78000, Telegram: 45000, RuTube: 35000, ВКонтакте: 30000 }
    ]
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

  // Цвета для графиков
  const colors = {
    primary: '#A855F7',
    secondary: '#06B6D4', 
    success: '#22C55E',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6'
  };

  // Кастомный тултип
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 rounded-lg border border-gray-600 shadow-lg">
          <p className="text-gray-300 text-sm">{`${label}`}</p>
          {payload.map((pld, index) => (
            <p key={index} style={{ color: pld.color }} className="font-semibold">
              {`${pld.dataKey}: ${typeof pld.value === 'number' ? pld.value.toLocaleString() : pld.value}`}
              {pld.dataKey === 'earnings' && ' ₽'}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.earnings}>
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
                    dataKey="earnings" 
                    stroke={colors.primary}
                    strokeWidth={3}
                    dot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: colors.primary }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Количество кампаний по месяцам</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.campaigns}>
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
                  <Bar 
                    dataKey="campaigns" 
                    fill={colors.success}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Структура вовлечения аудитории</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.engagement}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analyticsData.engagement.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-800 p-3 rounded-lg border border-gray-600 shadow-lg">
                            <p className="text-white font-semibold">{data.name}</p>
                            <p style={{ color: data.color }}>
                              {data.value.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    verticalAlign="middle" 
                    align="right"
                    layout="vertical"
                    iconType="circle"
                    wrapperStyle={{ color: 'rgb(156, 163, 175)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="mt-6">
          <Card className="p-6 bg-slate-800/50 border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Просмотры по платформам</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.platforms}>
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
                  <Legend wrapperStyle={{ color: 'rgb(156, 163, 175)' }} />
                  <Line type="monotone" dataKey="YouTube" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="Telegram" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="RuTube" stroke="#A855F7" strokeWidth={2} />
                  <Line type="monotone" dataKey="ВКонтакте" stroke="#6366F1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
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
