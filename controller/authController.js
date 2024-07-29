const { StatusCodes } = require("http-status-codes");
const  CustomError  = require("../errors");
const User = require("../models/userModel");

const {attachCookiesToResponse} = require('../utils')


const register = async (req, res) => {
  const {email, name, password} = req.body

  const emailAlreadyexists = await User.findOne({email})
  if(emailAlreadyexists){
    throw new CustomError.BadRequest('Email Already Exixts')
  }

  // first user is admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({email, name, password, role})
  const tokenUser = {name :user.name, userId : user._id, role: user.role }
  attachCookiesToResponse({res, user: tokenUser})
  

  res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = (req, res) => {
  res.send("login user");
};

const logout = (req, res) => {
  res.status(StatusCodes.OK).send("logout user");
};

module.exports = {
  login,
  register,
  logout,
};
