
import { createBrowserHistory } from 'history';
import react, { useCallback } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';

import { HomeScreen } from '../../home/screens';

export function MainRouter() {

  const history = useCallback(() => {
    return createBrowserHistory();
  }, [])

  return (
    <Router history={history()}>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  )
}
