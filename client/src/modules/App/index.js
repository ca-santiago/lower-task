
import react, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// Helpers
import { history } from '../helpers'

// Screen imports
import { HomeRouter } from '../home';
import { SignInScreen } from '../auth/screens';

function App(props) {

  return (
    <>
      <pre>{JSON.stringify(props.auth)}</pre>
      <Router history={history} >
        <Switch>
          {
            props.auth.loggedIn ?
              <MainRouter /> :
              <AuthRouter />
          }
        </Switch>
      </Router>
    </>
  );
}

function AuthRouter() {
  return (
    <Switch>
      <Route path="/" component={SignInScreen} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/" component={HomeRouter} />
      <Redirect from="*" to="/" />
    </Switch>
  )
}

function mapState(state) {
  return {
    auth: state.authentication
  };
}

const connectedApp = connect(mapState, {})(App);
export { connectedApp as App };
