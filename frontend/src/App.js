import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import AdvertiserAuth from './pages/AdvertiserAuth';
import AdvertiserDashboard from './pages/AdvertiserDashboard';
import ProfileSettings from './pages/ProfileSettings';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/advertiser/auth" element={<AdvertiserAuth />} />
            <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
