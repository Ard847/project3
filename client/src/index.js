// packages
import React from 'react';
import ReactDOM from 'react-dom';

// context
import { LoggedInContextProvider } from './context/LoggedInContext';
import { TaskContextProvider } from './context/TaskContext';
import { MediaContextProvider } from './context/MediaContext';

// styles
import './index.css';

// components
import App from './App/App';

ReactDOM.render(
  <React.StrictMode>
    <LoggedInContextProvider>
      <MediaContextProvider>
        <TaskContextProvider >
          <App />
        </TaskContextProvider>
      </MediaContextProvider>
    </LoggedInContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

// reportWebVitals();
