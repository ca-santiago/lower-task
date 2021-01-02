import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './modules/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { AuthStore } from './modules/auth/helpers';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={AuthStore} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
