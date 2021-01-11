
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Form, Alert } from 'react-bootstrap';

import { taskManagerActions } from '../actions';
import { TaskManagerContext } from '../helpers';

function CreateTaskPanel(props) {
  const { errors } = props.taskManager;

  const [err, setErr] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [tags, setTags] = useState('');

  function _onSubmit(e) {
    e.preventDefault();
    if (!title && !content)
      return setErr(_ => 'Introduzca titulo o contenido');

    _resetState();
    props.createTask(title, content, props.token);
  }

  function _resetState() {
    setErr('');
    setTitle('')
    setContent('');
  }

  return (
    <Form onSubmit={_onSubmit}>
      <Form.Group>
        {err && <Alert variant='danger'> {err} </Alert>}
        {errors.map((theErr, i) => <Alert key={i} variant='danger'>{theErr}</Alert>)}
        <Form.Control value={title} onChange={e => setTitle(e.currentTarget.value)} type="text" placeholder='What is on your mind' />
        <br />
        <Form.Control value={content} onChange={e => setContent(e.currentTarget.value)} as="textarea" placeholder='Describe your idea' rows={3} />
        <br />
        <Form.Control type="submit" value="Crear" />
      </Form.Group>
    </Form>
  )
}


const actionCreators = {
  createTask: taskManagerActions.createNewTask,
}
const connectedComponent = connect(state => state, actionCreators, null, { context: TaskManagerContext })(CreateTaskPanel);
export { connectedComponent as CreateTaskPanel }