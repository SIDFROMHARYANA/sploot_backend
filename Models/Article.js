const mongoose = require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId
const articlemodelschema = mongoose.Schema({

    title : { type : String , required : true} ,
    description : { type : String , required : true , unique: true},
    isDeleted : { type : Boolean , default : false},
    userId:{
        type:ObjectId,
        ref:'Usermodel'
      }, 
} , { timestamps : true})

 module.exports = mongoose.model('Articlemodel', articlemodelschema)



    