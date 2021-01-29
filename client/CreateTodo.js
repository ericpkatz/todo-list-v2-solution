import React, {Component} from 'react';
import { createTodo } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const defaultState = {
  taskName: '',
  assignee: '',
}

class CreateTodo extends Component {
  constructor () {
    super()
    this.state = {
      taskName: '',
      assignee: '',
      error: ''
    }; 
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    const todo = {};
    try {
      await this.props.createTodo({ ...this.state })
    }
    catch(ex){
      console.log(ex);
      this.setState({ error: ex.response.data });
    }
  }

  render () {
    const { assignee, taskName, error } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id='todo-form' onSubmit={handleSubmit}>

        <label htmlFor='taskName'>
          Task Name:
        </label>
        <input name='taskName' onChange={handleChange} value={taskName} />

        <label htmlFor='assignee'>
          Assign To:
        </label>
        <input name='assignee' onChange={handleChange} value={assignee} />

        <button type='submit'>Submit</button>
        <Link to='/'>Cancel</Link>
        {
          !!error && <div className='error'>{ error }</div>
        }
      </form>
    )
  }
}

export default connect(()=> {
  return {};
}, (dispatch, { history })=> {
  return {
    createTodo: (todo)=> dispatch(createTodo(todo, history))
  };
})(CreateTodo);
