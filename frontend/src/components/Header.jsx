import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-purple-500/20 shadow-lg shadow-purple-500/10' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/30">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Ublogger
              </h1>
              <p className="text-xs text-purple-300 leading-none">Лидер рынка</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium relative group">
              Возможности
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#bloggers" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium relative group">
              Блогеры
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#brands" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium relative group">
              Бренды
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium relative group">
              Отзывы
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">
              Войти
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25">
              Начать зарабатывать
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-purple-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-purple-500/20 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium py-2">
                Возможности
              </a>
              <a href="#bloggers" className="block text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium py-2">
                Блогеры
              </a>
              <a href="#brands" className="block text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium py-2">
                Бренды
              </a>
              <a href="#testimonials" className="block text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium py-2">
                Отзывы
              </a>
              <div className="pt-4 space-y-3">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-purple-400 hover:bg-purple-500/10">
                  Войти
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold">
                  Начать зарабатывать
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
