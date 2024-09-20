const mongoose = require("mongoose");
function getISTDateISOString() {    
    const utcDate = new Date();        
    const istOffset = 5.5 * 60; 
    const istDate = new Date(utcDate.getTime() + (istOffset * 60 * 1000));      
    return istDate.toISOString().replace('Z', '+05:30'); 
  }
  
  console.log(getISTDateISOString());
  
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userBio: {
        type: String,
        required: true,
        unique: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userMobile: {
        type: Number,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
       
        required: true,
    },
    logedInOn :{       
        type: String, 
        default: defaultDate = () => getISTDateISOString(),        
        required: true,
    },
},
{
    timestamps:true
}

);

module.exports = mongoose.model("User", userSchema);