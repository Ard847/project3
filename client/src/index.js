// packages
import React from 'react';
import ReactDOM from 'react-dom';

// context
import { LocationContextProvider } from './context/LocationContext';
import { LoggedInContextProvider } from './context/LoggedInContext';

// styles
import './index.css';

// components
import App from './App/App';

ReactDOM.render(
  <React.StrictMode>
    <LocationContextProvider>
      <LoggedInContextProvider>
        <App />
      </LoggedInContextProvider>
    </LocationContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

// reportWebVitals();
