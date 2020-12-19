import React, {Component} from 'react';
import { updateTodo, destroyTodo } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const defaultState = {
  taskName: '',
  assignee: '',
}

class UpdateTodo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      taskName: this.props.todo.taskName || '',
      assignee: this.props.todo.assignee || '' 
    }; 
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidUpdate(prevProps){
    if(this.props.todo.id && !prevProps.todo.id){
      this.setState({
        taskName: this.props.todo.taskName,
        assignee: this.props.todo.assignee
      });
    }
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit (evt) {
    evt.preventDefault()
    this.props.updateTodo({ ...this.state, id: this.props.todo.id })
  }

  render () {
    const { assignee, taskName } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
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
        </form>
        <button onClick={ ()=> this.props.destroy( this.props.todo )}>Destroy</button>
      </div>
    )
  }
}

export default connect((state, { match })=> {
  const todo = state.todos.find( todo => todo.id === match.params.id * 1 ) || {};
  return {
    todo
  };
}, (dispatch, { history })=> {
  return {
    updateTodo: (todo)=> dispatch(updateTodo(todo, history)),
    destroy: (todo)=> dispatch(destroyTodo(todo, history))
  };
})(UpdateTodo);
