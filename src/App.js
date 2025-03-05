import React from 'react';
import GlycemiaTracker from './components/GlycemiaTracker';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <GlycemiaTracker />
      </div>
    </div>
  );
}

export default App;