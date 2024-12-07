const mongoose = require("mongoose");
function getISTDateISOString() {    
    const utcDate = new Date();
    
    const istOffset = 5.5 * 60; 
    const istDate = new Date(utcDate.getTime() + (istOffset * 60 * 1000));    
    
    return istDate.toISOString().replace('Z', '+05:30'); 
  }
  
  console.log(getISTDateISOString());
  
const NoteSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileDescription: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    files: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    uploadedOn: {
    type: String, 
    default:  defaultDate = () => getISTDateISOString(), 
    required: true,
},
isPublic: {
    type: Boolean,
    default: true, // Default visibility is public
  },

},
{
   timestamps:true 
}
);

module.exports = mongoose.model("Notes", NoteSchema);