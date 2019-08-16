import './style/App.sass';
import App from './App.jsx';
const axios = require('axios');

import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
window.axios = axios;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)