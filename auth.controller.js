const Io = require("../utils/Io");
const Users = new Io("./database/users.json");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const {username, password} = req.body;

  const users = await Users.read();

  const findUser = users.find((user) => username === user.username);

  if (findUser)
    return res.status(409).json({message: "User already registered"});

  const id = (users[users.length - 1]?.id || 0) + 1;
  const newUser = new User(id, username, password);

  const data = users.length ? [...users, newUser] : [newUser];

  await Users.write(data);

  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({id: newUser.id}, secretKey);
  res.status(200).json({message: "Success", token});
};


const login =async(req,res)=>{
  const {username,password}=req.body;

  console.log(req.body);
  const users = await Users.read();
  if(!username || !password)
  {
    res.status(404).json({message :"Kiritilishi majbur bo'lgan maydonga  login yoki parolni kiritmadingiz "})
  }
  const findUserss=users.filter((us)=>{
    us.username===username && us.password===password;
  });
  if(findUserss)
  {
  return res.status(201).json({message:"Tizimga muvofaqqiyatli kirdingiz !!!"});
  }
  else {
    return res.status(404).json({message:"Siz hali ro'yhatdan o'tmagansiz ?"});
  }


}

module.exports = {
  register,
  login,
};
