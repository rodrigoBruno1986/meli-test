import React from 'react';
import ReactDOM from 'react-dom'; // Usa 'react-dom' en lugar de 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Usa ReactDOM.render para React 17
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Este código es para medir el rendimiento de tu aplicación
reportWebVitals();
