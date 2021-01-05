
import react from 'react';
import { connect } from 'react-redux';
import { AppRouter } from './router';

function App(props) {

  return (
    <>
      <pre>{JSON.stringify(props.auth)}</pre>
      <AppRouter />
    </>
  );
}



function mapState(state) {
  return {
    auth: state.authentication
  };
}

const connectedApp = connect(mapState, {})(App);
export { connectedApp as App };
