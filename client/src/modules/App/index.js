
import React from 'react';
import { AppRouter } from './router';

import { Provider } from 'react-redux';
import { AuthStore, AuthContext } from '../auth/helpers';

function App() {
  return (
    <Provider store={AuthStore} context={AuthContext} >
      <AppRouter />
    </Provider>
  );
}

export { App };
