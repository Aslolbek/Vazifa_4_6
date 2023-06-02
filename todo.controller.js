const Io = require("../utils/Io");
const Todos = new Io("./database/todos.json");
const Users = new Io("./database/users.json");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const {title, text} = req.body;
  const token = req.headers.authorization.split(" ")[1];

  
  const todos = await Todos.read();
  const us= await Users.read()
  console.log();
  const filetrus=us.filter((user)=>  user.id==token)
if(filetrus)
{
  const {id: user_id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const id = (todos[todos.length - 1]?.id || 0) + 1;
  const newTodo = new Todo(id, title, text, user_id);

  const data = todos.length ? [...todos, newTodo] : [newTodo];
  await Todos.write(data);

  res.status(201).json({message: "Success"});
}else {
  res.status(201).json({message: "siz  Yuborgan tokenda hechqanday foydalanuvchi mavjud emas"});
}
  
};

const getAll = async (req, res) => {
  const {id: user_id} = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET_KEY
  );

  const todos = await Todos.read();

  const myTodos = todos.filter((todos) => todos.user_id === user_id);
  const users = await Users.read();
 

  res.status(200).json({todos: myTodos});
};

const update = async (req, res) => {

  const {title, text} = req.body;
  
  const {No}=req.params
  console.log(No);
  const {id: user_id} = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET_KEY
  );

  const todos = await Todos.read();

  const myTodos = todos.filter((todos) => todos.user_id === user_id);
  const users = await Users.read();
  const findUser = myTodos.find((todo) => todo.id == No);
  // console.log(findUser);
   findUser.title=title;
   findUser.text=text;

  // const allTodos = myTodos.map((todo) => {
  //   todo.text = text;
  //   todo.title = title;
  //   return todo;
  // });





await Todos.write(todos);
  res.status(200).json({todos: findUser});
};


const delet = async (req, res) => {

  
  const {No}=req.params
  console.log(No);
  const {id: user_id} = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET_KEY
  );

  const todos = await Todos.read();

  const myTodos = todos.filter((todos) => todos.user_id === user_id);
  const users = await Users.read();
  const findUser = myTodos.find((todo) => todo.id == No);
console.log(findUser);
  const data = todos.filter((todos) => todos != findUser );



await Todos.write(data);
  res.status(200).json({todos: data});
};



module.exports = {
   update,
   delet,
  create,
  getAll,
}
