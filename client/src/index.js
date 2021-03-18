// packages
import React from 'react';
import ReactDOM from 'react-dom';

// context
import { LoggedInContextProvider } from './context/LoggedInContext';

// styles
import './index.css';

// components
import App from './App/App';

ReactDOM.render(
  <React.StrictMode>
    <LoggedInContextProvider>
      <App />
    </LoggedInContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

// reportWebVitals();
