const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/multer").then(()=>{
    console.log('db connected');
})

const mediaschema = new mongoose.Schema({
  file: String,
});


module.exports=mongoose.model('mediafiles',mediaschema); 