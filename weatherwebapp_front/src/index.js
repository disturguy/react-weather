import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n'
import Honeybadger from '@honeybadger-io/js'
import ErrorBoundary from '@honeybadger-io/react'

Honeybadger.configure({
  apiKey: '8e14ff1b',
  environment: 'production'
})

//Honeybadger.notify('Hello from React')

// //alternative way to react-boostrap
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  //<React.StrictMode>
    <ErrorBoundary honeybadger={Honeybadger}>
      <App />
    </ErrorBoundary>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
