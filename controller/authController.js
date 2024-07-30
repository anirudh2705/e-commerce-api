const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/userModel");

const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyexists = await User.findOne({ email });
  if (emailAlreadyexists) {
    throw new CustomError.BadRequestError("Email Already Exixts");
  }

  // first user is admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, name, password, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  if (!user) {
    throw new CustomError.UnauthorizedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthorizedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expiresIn: new Date(Date.now() ),
  });
  res.status(StatusCodes.OK).json({msg:'user logged out!'})
};

module.exports = {
  login,
  register,
  logout,
};
