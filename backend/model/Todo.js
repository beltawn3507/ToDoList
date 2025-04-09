const {model,Schema} = require('mongoose')

const {ObjectId, Timestamp} = require('mongodb')

const todoSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{Timestamp:true})

const Todo=model("todo",todoSchema);

module.exports=Todo;