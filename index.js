const express=require("express");
const app=express();

const methodOverride = require("method-override")

const { v4: uuidv4 } = require('uuid');
uuidv4(); 
const port=8080;
const path=require("path");
app.use(methodOverride("_method"))

app.use(express.urlencoded({extended: true}));
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {     id:uuidv4() ,
        name:"apnacollege",
        content:" i love coding"
    },
    {    id:uuidv4() ,
        name:"goutam singh patel",
        content:"HELLo i am banna"
    },
    {    id:uuidv4( ),
        name:"msd ",
        content:"captan of indian cricket team",
    }
];

app.listen(port,()=>{
    console.log(`server start of port ${port}`);
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("news.ejs");

});
app.post("/posts",(req,res)=>{
let{name,content}=req.body;
let id=uuidv4();
posts.push({id, name,content});
res.redirect("/posts")
});
app.get("/posts/:id",(req,res)=>{
let {id}=req.params;
let post=posts.find((p)=>id==p.id);
res.render("show.ejs",{post})
     });

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id==p.id);
post.content=newcontent;
console.log(post)
    
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);

    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
   posts=posts.filter((p)=>id !== p.id);
res.redirect("/posts")
})
app.get("/img",(req,res)=>{
    let {img}=req.params;
    console.log({img})
    res.render("img.ejs",{img});
})

