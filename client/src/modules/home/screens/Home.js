
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';

import { TaskManagerContext } from '../helpers';

import { authActions } from '../../auth/actions';
import { AuthContext } from '../../auth/helpers';
import { taskManagerActions } from '../actions';

function HomeScreen(props) {

  // Destructurin methods
  const { fetchTasks } = props;
  const { user } = props.authentication;
  const { fetching, tasks } = props.taskManager;

  useEffect(() => {
    if (!fetching) {
      fetchTasks(user.id, user.token);
    }
  }, [user]);

  function _clickLogOut() {
    props.signout();
  }

  function _renderTask(taskData, index) {
    console.log(taskData, index)
    const time = new Date(taskData.createAt);
    return (
      <div key={taskData.id}>
        <p key={index}>
          {taskData.title}
        </p>
        <p>
          {taskData.content}
        </p>
        <p>Creado: {time.toLocaleDateString()}</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Welcome {user.name?.first} {user.name?.last}</h3>
      <button onClick={_clickLogOut}>SignOut</button>
      {
        (tasks.length > 0) ?
          tasks.map(_renderTask)
          :
          fetching ? <p>Loading...</p> : <p>No tasks yet, write your first one</p>
      }
    </div>
  )
}

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