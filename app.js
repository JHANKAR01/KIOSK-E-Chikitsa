const express= require('express');
const mongoose =require('mongoose');
const ejsMate =require('ejs-mate');
// const synth = Window.speechSynthesis;

// const methodOverride = require('method-override');
const app = express();
app.use(express.static('public'))
const path =require('path');
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
// app.use("/api/auth", require("./auth/Route"))
// app.use(methodOverride('_method'));
// mongodb://localhost:27017
mongoose.connect('mongodb://127.0.0.1:27017/userdataKiosk').then(()=>{
    console.log("done")
});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const { request } = require('http');

const userSchema={
    aadhar:String,
    name:String,
    age:Number,
    occupation:String,
    gender:String,
    parent:String,
    fever:String,
    type_of_Fever:String,
    breathing:String,
    time:String
};

const User= new mongoose.model("user",userSchema);


app.get('/',(req,res)=>{
    
    res.render('./data/home');
})
app.get('/new',(req,res)=>{
    res.render('./data/new');
})
app.get('/adhar',(req,res)=>{
    res.redirect('https://myaadhaar.uidai.gov.in/CheckAadhaarStatus');
});
app.get('/login',(req,res)=>{
    res.render('./data/login');
    
})
app.get('/dashboard',(req,res)=>{
    res.render('./data/dashboard');
    
})
let myUser;
app.post("/login",(req,res)=>{
    const aadhar =  req.body.aadhar;
    // const password = req.body.password;
  
    User.findOne({aadhar: aadhar}).then((foundUser) => {
           if(foundUser){
                myUser = foundUser;
                res.render("./data/madi1",{myUser: myUser});
            }
            else
            {
                res.render('./data/register');
            }
        })
        .catch((err)=>{
            res.render('./data/home');
            console.log(err);
        })     
  });
app.get('/register',(req,res)=>{
res.render('./data/register');
});

app.post("/register",async (req,res)=>{
    // try{
        const aadhar =  req.body.aadhar;
        // const password = req.body.password;/
      
        // const user = await User.findOne({email : username}).then((newuser)=>{
        //     res.render('./data/login');
        //     return;
        // });
        const user = await User.findOne({aadhar: aadhar});
        if(user){

            myUser = user;
            res.render("./data/madi1",{myUser: myUser});
            return;
        }
        else{
            console.log(req.body);
    
            const newUser= new User(req.body);
    
            newUser.save().then(()=>{
                myUser = newUser;
                res.render("./data/madi1",{myUser: myUser});
    
            });
        }
    // }
});  
app.listen(27017,()=>{
    console.log('server on port 3000');
})
