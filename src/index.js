import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
registerServiceWorker();
