
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';

import { TaskManagerContext } from '../helpers';

import { authActions } from '../../auth/actions';
import { AuthContext } from '../../auth/helpers';
import { taskManagerActions } from '../actions';

import './style.css';

// Components
import {
  CreateTaskPanel,
  TaskComponent
} from '../components'

function HomeScreen(props) {

  // Destructurin methods
  const { fetchTasks } = props;
  const { user } = props.authentication;
  const { fetching, tasks } = props.taskManager;

  useEffect(() => {
    if (!fetching) {
      fetchTasks(user.id, user.token);
    }
  }, [user, fetchTasks]);

  function _clickSignOut() {
    props.signout();
  }

  return (
    <div className="main-container">
      <div className="menu-container">
        <h3>Welcome {user.name?.first} {user.name?.last}</h3>
        <button onClick={_clickSignOut}>SignOut</button>
      </div>
      <div className="task-container">
        <div className="task-creation-container">
          <CreateTaskPanel token={user.token} />
        </div>
        <div className="task-list-container" >
          {
            (tasks.length > 0) ?
              tasks.map(TaskComponent)
              :
              fetching ? <p>Loading...</p> : <p>No tasks yet, write your first one</p>
          }
        </div>
      </div>
      <div className="rest">
      </div>
    </div>
  )
}



// CONNECT STORES

const mapState = (state) => state;

const actionCreatorsAuth = {
  signout: authActions.SignOut,
}
const actionCreatorsTask = {
  fetchTasks: taskManagerActions.fetchTasks,
}
const connectedComposedHomeScreen = compose(
  connect(mapState, actionCreatorsAuth, null, { context: AuthContext }),
  connect(mapState, actionCreatorsTask, null, { context: TaskManagerContext })
)(HomeScreen);

export { connectedComposedHomeScreen as HomeScreen };