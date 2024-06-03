const express=require("express");
const app=express();
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override")
let port=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Chacha",
        content:"Gaand marao"
    },
    {
        id:uuidv4(),
        username:"Kits",
        content:"10 CGPA"
    },
    {
        id:uuidv4(),
        username:"Chhapri",
        content:"Chutiya Silicon"
    },
]

app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/seztweets.onrender.com/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/seztweets.onrender.com/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("https://seztweets.onrender.com/posts");
})

app.get("/seztweets.onrender.com/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);
    res.render("show.ejs",{post});
})

app.patch("/seztweets.onrender.com/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p) => id===p.id);
    post.content=newContent;
    res.redirect("https://seztweets.onrender.com");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("https://seztweets.onrender.com");
})

app.get("posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id===p.id);
    res.render("edit.ejs",{post})
});

app.listen(port,()=>{
    console.log(`Server is listening to Port:${port}`);
})
// app.get("/",(req,res)=>{
//     res.send("Root Page");
// })
