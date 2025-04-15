
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Clear browser cache for PWA if needed
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Add a timestamp to break cache
const timestamp = new Date().toISOString();
console.log(`App initializing at: ${timestamp}`);

// Add cache busting parameter to any dynamic imports
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    console.log('Updating application...');
  });
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
