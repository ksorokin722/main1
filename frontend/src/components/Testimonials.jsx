import React, { useState, useEffect } from 'react';
import { testimonials } from './mockData';
import { Star, Quote, ThumbsUp, MessageCircle } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('testimonials-section');
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
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div id="testimonials-section">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-l from-green-500/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-300">Отзывы клиентов</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Наши блогеры
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                о нас говорят
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Реальные истории успеха от блогеров, которые изменили свою жизнь с Ublogger
            </p>
          </div>

          {/* Main Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              {/* Testimonial Card */}
              <div className={`relative p-8 md:p-12 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl transform transition-all duration-500 ${
                isVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}>
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl"></div>
                
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Testimonial Text */}
                  <div className="mb-8">
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                  </div>
                  
                  {/* Author Info */}
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-green-500/20">
                        <img 
                          src={testimonials[currentTestimonial].avatar} 
                          alt={testimonials[currentTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {testimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-green-300 text-sm">
                          {testimonials[currentTestimonial].username}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-black text-green-400 mb-1">
                        {testimonials[currentTestimonial].earnings}
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl"></div>
              </div>
              
              {/* Testimonial Navigation */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 w-8' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`relative group cursor-pointer transform transition-all duration-500 ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0'
                } hover:scale-105 ${
                  currentTestimonial === index ? 'ring-2 ring-green-500/30' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setCurrentTestimonial(index)}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 group-hover:border-green-500/30 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Avatar & Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-green-500/20">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-green-300">{testimonial.username}</p>
                    </div>
                  </div>
                  
                  {/* Testimonial Preview */}
                  <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Stats & Rating */}
                  <div className="flex items-center justify-between">
                    <div className="text-green-400 font-semibold text-sm">
                      {testimonial.earnings}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Active Indicator */}
                {currentTestimonial === index && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <ThumbsUp className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-black text-green-400 mb-2">4.9/5</div>
                <div className="text-gray-300">Средняя оценка</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">98%</div>
                <div className="text-gray-300">Рекомендуют нас</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">15K+</div>
                <div className="text-gray-300">Отзывов</div>
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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
