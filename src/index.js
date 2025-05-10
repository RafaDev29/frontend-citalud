import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // o './App.css' si estás usando otro

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
