const express = require("express")
const app = express()
const port = 8080;

const path = require("path")
const { v4: uuidv4 } = require('uuid');

const methodOverride = require("method-override")


app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true})) //understanding by expressused to parse the data from the request
app.use(methodOverride("_method"))

app.listen(port,()=>{
    console.log(`It is listening on ${port}`)
})

let posts = [
    {
        id:uuidv4(),
        username: "Asif Boy",
        content: "Sem mei kam laara lekin Course acha karra"
    },
    {
        id:uuidv4(),
        username: "Saud Mauz",
        content: "Course nhi karra lekin ALL PASS IN UNI >>"
    },
    {
        id:uuidv4(),
       username: "myself",
       content:"sleeping"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res) =>{   //pehli get karna hai ki kaunsi info add karna chahare
    res.render("new.ejs")
})

app.post("/posts",(req,res) =>{ //this is a post request
    let {username,content} = req.body;
    let id = uuidv4(); 
    posts.push({id,username,content});
    // res.send("you have send a post request for adding the quora posts")
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) =>{
    let {id} = req.params
    let ans = posts.find((z) => id === z.id )  //chckng if id of posts exists or not
    // console.log(ans)
    res.render("show.ejs",{ans})

});

app.patch("/posts/:id",(req,res) =>{     //post ke content ku edit krne ke baad waapis jo laara main page pe edited version 
    let {id} = req.params;
   let newContent = req.body.content;
   let ans = posts.find((z) => id === z.id)    //jo id mili wo post ka content chng karna hai apne ku
   ans.content = newContent
//    res.send("patch request working")
   console.log(id)
   console.log(ans) 
   console.log(newContent)
   res.redirect("/posts");

})


app.get("/posts/:id/edit",(req,res) =>{
    let {id} = req.params;
    let ans = posts.find((z) => id === z.id)
    res.render("edit.ejs",{ans})
})

app.delete("/posts/:id",(req,res) =>{
    let {id} = req.params;
    posts = posts.filter((z)=> id !==z.id)  //updating our array here
    res.redirect("/posts");
    console.log(posts)
})