import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import TopBloggers from '../components/TopBloggers';
import Brands from '../components/Brands';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <TopBloggers />
      <Brands />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
