
import { createBrowserHistory } from 'history';
import React, { useCallback, useState } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import { TaskManagerStore, TaskManagerContext } from '../../home/helpers'

import { HomeScreen } from '../../home/screens';
import { TaskManagerConstants } from '../../home/reducers/taskManager';
import { AuthContext } from '../../auth/helpers';

function MainRouter(props) {

  useState(() => {
    TaskManagerStore.dispatch({ type: TaskManagerConstants.RESET_TASK_MANAGER });
  }, [props.authentication])

  const history = useCallback(() => {
    return createBrowserHistory();
  }, [])

  return (
    <Provider store={TaskManagerStore} context={TaskManagerContext}>
      <Router history={history()}>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </Provider>
  )
}

const mapState = state => state;

const connectedMainRouter = connect(mapState, {}, null, { context: AuthContext })(MainRouter);
export { connectedMainRouter as MainRouter }
