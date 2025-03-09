import React from 'react';
import GlycemiaTracker from './components/GlycemiaTracker';
import Footer from './components/Footer';
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <GlycemiaTracker />
        <Footer />
      </div>
    </div>
  );
}

export default App;