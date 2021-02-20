
import React, { useCallback } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { SignInScreen } from '../../auth/screens'
import { SignUpScreen } from '../../auth/screens/SignUp.js'

export function AuthRouter() {

  const history = useCallback(() => {
    return createBrowserHistory();
  }, [])

  return (
    <BrowserRouter>
      {/* Comenté esta ruta porque fue la única manera en que pude hacer funcionar el Route. */} 
        <Switch>
          <Route exact path="/" component={SignInScreen} />
          <Route exact path="/signup" component={SignUpScreen} />
          {/* <Route exact path="/404" component={DontFound} /> */}
          {/* <Redirect from="*" to="/" /> */}
        </Switch>
      {/* </Router> */}
    </BrowserRouter>
  )
}
