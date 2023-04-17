// import moogose
const mongoose = require("mongoose");


// model user to save in BD

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});





module.exports = mongoose.model('user',userSchema)
