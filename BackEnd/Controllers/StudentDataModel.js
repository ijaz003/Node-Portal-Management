const Mongoose = require('mongoose');
const SchemaData = Mongoose.Schema({ name: String, rollNo: Number, mobileNo: Number, email: String,userId:String,password:String });
module.exports=Mongoose.model("Student Data",SchemaData);