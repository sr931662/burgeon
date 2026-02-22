import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add loaded class to body after initial render
setTimeout(() => document.body.classList.add('loaded'), 50);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);