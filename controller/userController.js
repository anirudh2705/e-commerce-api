const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/userModel");

const getAllUser = async(req, res) => {
    const users = await User.find({role: 'user'}).select('-password')
    res.status(StatusCodes.OK).json({users})
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({user})}

const showCurrentUser = (req, res) => {
    res.send("showCurrentUser")
}

const updateUser = (req, res) => {
    res.send("updateUser")
}

const updateUserPassword = (req, res) => {
    res.send("updateUserPassword")
}

module.exports = {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}