const {Schema,model,mongoose} =require('mongoose')
const {randomBytes,createHmac} =require("crypto")
const {generateusertoken} =require('../services/authentication')

const userschema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    salt:{type:String},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})


userschema.pre('save',function(next){
   const user=this;
   if(!user.isModified("password")) return ;
   const salt=randomBytes(16).toString();
   const hashpassword=createHmac('sha256',salt).update(user.password).digest("hex");
    this.salt=salt;
    this.password=hashpassword;
    next();
})


userschema.static("matchPasswordandgeneratetoken",async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error('user not found');
    const salt=user.salt;
    const hashedpassword=user.password;
    const userprovidedhash=createHmac('sha256',salt).update(password).digest("hex");
    if(hashedpassword !== userprovidedhash ) throw new Error('incorrect Password');
    const token=await generateusertoken(user);
    //console.log("hi2",token);
    return token;
})

const User=model("user",userschema);

module.exports = User;