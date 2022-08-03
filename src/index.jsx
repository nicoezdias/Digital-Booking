//import 'antd/dist/antd.min.css'
import 'react-calendar/dist/Calendar.css';
import 'assets/scss/styles.scss';
import { BrowserRouter } from 'react-router-dom'
import UserProvider from 'context/UserContext';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
