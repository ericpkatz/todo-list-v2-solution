import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const CREATE_TODO = 'CREATE_TODO';
const DESTROY_TODO = 'DESTROY_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const SET_TODOS = 'SET_TODOS';

const todosReducer = (state = [], action)=> {
  if(action.type === SET_TODOS){
    return action.todos;
  }
  if(action.type === CREATE_TODO){
    return [...state, action.todo];
  }
  if(action.type === UPDATE_TODO){
    return state.map( todo => action.todo.id === todo.id ? action.todo : todo); 
  }
  if(action.type === DESTROY_TODO){
    return state.filter( todo => todo.id !== action.todo.id); 
  }
  return state;
};

const _createTodo = (todo)=> {
  return {
    type: CREATE_TODO,
    todo
  };
};

const createTodo = (todo, history)=> {
  return async(dispatch)=> {
    const created = (await axios.post('/api/todos', todo)).data;
    dispatch(_createTodo(created));
    history.push('/');
  };
};

const _updateTodo = (todo)=> {
  return {
    type: UPDATE_TODO,
    todo
  };
};

const updateTodo = (todo, history)=> {
  return async(dispatch)=> {
    const updated = (await axios.put(`/api/todos/${ todo.id}`, todo)).data;
    dispatch(_updateTodo(updated));
    history.push('/');
  };
};

const _destroyTodo = (todo)=> {
  return {
    type: DESTROY_TODO,
    todo
  };
};

const destroyTodo = (todo, history)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/todos/${ todo.id}`, todo);
    dispatch(_destroyTodo(todo));
    history.push('/');
  };
};

const setTodos = (todos)=> {
  return {
    type: SET_TODOS,
    todos
  };
};

const fetchTodos = ()=> {
  return async(dispatch)=> {
    const todos = (await axios.get('/api/todos')).data;
    dispatch(setTodos(todos));
  };
};

const reducer = combineReducers({
  todos: todosReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { createTodo, fetchTodos, updateTodo, destroyTodo };
