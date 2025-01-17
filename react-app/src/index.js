import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './custom-scss.scss';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import "react-date-range/dist/styles.css"; // date range main css file
import "react-date-range/dist/theme/default.css"; // date range theme css file
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
