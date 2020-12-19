const router = require('express').Router();
const { Todo } = require('../db').models;

router.get('/', async(req, res, next) => {
  try {
    res.send(await Todo.findAll());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/:id', async(req, res, next) => {
  try {
    res.send(await Todo.findByPke(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

router.post('/', async(req, res, next) => {
  try {
    res.status(201).send(await Todo.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

router.put('/:id', async(req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id)
    res.send(await todo.update(req.body));
  }
  catch(ex){
    next(ex);
  }
});

router.delete('/:id', async(req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
    res.send(todo);
  }
  catch(ex){
    next(ex);
  }
})

module.exports = router;
