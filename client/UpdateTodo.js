import React, {Component} from 'react';
import { updateTodo, destroyTodo } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const defaultState = {
  taskName: '',
  assignee: '',
}

class UpdateTodo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      taskName: '',
      assignee: '',
      error: ''
    }; 
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount(){
    const response = await axios.get(`/api/todos/${this.props.match.params.id}`)
    const { assignee, taskName } = response.data;
    this.setState({ assignee, taskName });

  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit (evt) {
    try {
      evt.preventDefault()
      const updated = {...this.state };
      delete updated.error;
      await this.props.updateTodo(updated)
    }
    catch(ex){
      if(ex.response && ex.response.data){
        this.setState({ error: ex.response.data });
      }
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
        <a className='destroy-button' onClick={ this.props.destroy }>Destroy</a>
        <Link to='/'>Cancel</Link>
        {
          !!error && <div className='error'>{ error }</div>
          
        }
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch, { history, match })=> {
  return {
    updateTodo: (todo)=> dispatch(updateTodo({...todo, id: match.params.id }, history)),
    destroy: ()=> dispatch(destroyTodo({ id: match.params.id * 1 }, history))
  };
}

export default connect(null, mapDispatchToProps)(UpdateTodo);
