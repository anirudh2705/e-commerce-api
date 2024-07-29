const { StatusCodes } = require("http-status-codes");
const { CustomApiError } = require("../errors");
const User = require("../models/userModel");


const register = async (req, res) => {
  const {email, name, password} = req.body

  const emailAlreadyexists = await User.findOne({email})
  if(emailAlreadyexists){
    throw new CustomApiError.BadRequestError('Email Already Exixts')
  }

  // first user is admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user';


  const user = await User.create(email, name, password, role)
  res.status(StatusCodes.CREATED.json({user}));
};

const login = (req, res) => {
  res.send("login user");
};

const logout = (req, res) => {
  res.send("logout user");
};

module.exports = {
  login,
  register,
  logout,
};
