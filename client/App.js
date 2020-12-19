import React, {Component} from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Todos from './Todos'
import CreateTodo from './CreateTodo';
import UpdateTodo from './UpdateTodo';
import { connect } from 'react-redux';
import { fetchTodos } from './store';

class App extends Component {
  componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <Router>
        <div id='main'>
          <h1><Link to='/'>Todos ({this.props.todos.length})</Link></h1>
          <Link to='/todos/create'>Create A New Todo</Link>
          <Switch>
            <Route exact path='/' component={Todos} />
            <Route path='/todos/create' component={ CreateTodo } />
            <Route path='/todos/:id' component={ UpdateTodo } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  ({ todos })=> {
    return {
      todos
    };
  },
  (dispatch)=> {
    return {
      load: ()=> dispatch(fetchTodos()) 
    };
  },
)(App);
