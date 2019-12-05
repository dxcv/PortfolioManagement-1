var express=require("express");
var mongoose=require("mongoose");
var passport=require("passport");
var bodyParser=require("body-parser");
var LocalStrategy=require("passport-local");
var PassportLocalMongoose=require("passport-local-mongoose");
var User=require("./models/user")



mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });
var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    
    extended:true
}));


app.use(express.static(__dirname + '/public'));
app.use(require("express-session")({
    
    secret:"rusty is the best",
    resave:false,
    
    saveUninitialized :false
    
    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',function(req,res){
    
    res.render('register.ejs')}) 

app.get('/secret',isLoggedIn,function(req,res){
    
    res.render('secret.ejs')})
    
    
    app.get('/register',function(req,res){
        
        res.render('register.ejs')})
        
    
    

     app.post("/register",function(req,res){
        
        req.body.username
        req.body.password
        
       // console.log(req.body.username)
        
        User.register(new User({username:req.body.username}), req.body.password,function(err,user){
            
            
            if(err){
                console.log(err);
                return res.render('register.ejs');
                
                
            }
            
            passport.authenticate('local')(req,res,function(){
            //    console.log("hi")
              // res.send("hi");
                res.redirect("/secret");
            })
        } )
        
    })


//login routes

 app.get('/login',function(req,res){
        
        res.render('register.ejs')
        
        
        
    })
    
    
    app.get('/logout',function(req,res){
        
        req.logout();
        res.redirect("/");
        
    })
    
app.post("/login", passport.authenticate("local",{
    
    successRedirect:"/secret",
    failureRedirect:"/login"
    
    
}  )  )
    
    // buy sell
    app.get('/buysell',function(req,res){
        
        res.render('buysell.ejs')
        
        
        
    })
    
function isLoggedIn(req,res,next){
    
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}    
    
    
app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("server started")
    
    
})

//ghcghcjhvvg



