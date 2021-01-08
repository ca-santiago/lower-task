
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';

import { TaskManagerContext } from '../helpers';

import { authActions } from '../../auth/actions';
import { AuthContext } from '../../auth/helpers';
import { taskManagerActions } from '../actions';


// React Bootstrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';


// Components
import { CreateTaskPanel } from '../components'

function HomeScreen(props) {

  // Destructurin methods
  const { fetchTasks } = props;
  const { user } = props.authentication;
  const { fetching, tasks, nextPage, currPage } = props.taskManager;

  useEffect(() => {
    if (!fetching) {
      fetchTasks(user.id, user.token, nextPage);
    }
  }, []);

  function _clickSignOut() {
    props.signout();
  }


  return (
    <div>
      <h3>Welcome {user.name?.first} {user.name?.last}</h3>
      <button onClick={_clickSignOut}>SignOut</button>
      <Container>
        <Row>
          <Col xl={4} >
            <CreateTaskPanel token={user.token} />
            {
              (tasks.length > 0) ?
                tasks.map(RenderTaskCard)
                :
                fetching ? <p>Loading...</p> : <p>No tasks yet, write your first one</p>
            }
          </Col>
          <Col xl={8} >
            <Row>
              <p>Contenido random</p>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


function RenderTaskCard(taskData) {
  const time = new Date(taskData.createAt);
  return (
    <div key={taskData.id}>
      <Card>
        <Card.Body>
          {taskData.title && <Card.Title>{taskData.title}</Card.Title>}
          {taskData.content && <Card.Text>{taskData.content}</Card.Text>}
        </Card.Body>
        <Card.Footer>Creado: {time.toLocaleDateString()}</Card.Footer>
      </Card>
      <br />
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