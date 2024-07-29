const { mongoose } = require("mongoose");
const CustomApiError = require("../errors");


const connectDb = async(url) => {
    try {
        await mongoose.connect(url).then(() => console.log('connected to Database'))
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb