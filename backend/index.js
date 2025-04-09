const express=require('express')
const app=express();
const cors = require('cors')
const mongoose =require('mongoose')
const PORT=8000;
const userroute = require('./routes/User')
const todorouter=require("./routes/Todo")
const {checkforauth} =require('./middleware/authenticate')

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/notes")
.then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err);
})

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
  }));


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(checkforauth("token"))

//we will send all the data of todos to specific user
app.get("/",(req,res)=>{
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      res.json({ message: "Welcome", user: req.user });
})

app.use("/user",userroute);
app.use("/todo",todorouter);


app.listen(PORT,()=>{console.log('connected to port 8000')})