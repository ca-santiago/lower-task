
import react, { useCallback } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { SignInScreen } from '../../auth/screens'

export function AuthRouter(props) {

  const history = useCallback(() => {
    return createBrowserHistory();
  }, [])

  return (
    <Router history={history()} >
      <Switch>
        <Route path="/" component={SignInScreen} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  )
}
