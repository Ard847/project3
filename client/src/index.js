// packages
import React from 'react';
import ReactDOM from 'react-dom';

// context
import { LoggedInContextProvider } from './context/LoggedInContext';
import { TaskContextProvider } from './context/TaskContext';
import { MediaContextProvider } from './context/MediaContext';
import { MembersContextProvider } from './context/MembersContext';

// styles
import './index.css';

// components
import App from './App/App';

ReactDOM.render(
  <React.StrictMode>
    <LoggedInContextProvider>
      <MediaContextProvider>
        <MembersContextProvider>
          <TaskContextProvider >
            <App />
          </TaskContextProvider>
        </MembersContextProvider>
      </MediaContextProvider>
    </LoggedInContextProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

// reportWebVitals();
