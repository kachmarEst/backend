const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 5000;
const MongoClient = require('mongodb').MongoClient;
app.use(cors());
app.use(bodyParser.json());

app.get("/articles/:name",async (req,res)=>{
   try {
    const nom=req.params.name;
    const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
    const db= client.db('blog');
    const article=await db.collection('articles').findOne({nom});
    res.status(200).json(article);
    client.close();
       
   } catch (error) {
    res.status(200);
       
   } 
});
app.get("/articles/vote/:name",async (req,res)=>{
    try {
     const nom=req.params.name;
     const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
     const db= client.db('blog');
     const article=await db.collection('articles').findOne({nom});
     article.votes+=1;
     await db.collection('articles').updateOne({nom}, {'$set' :article});
     res.status(200).json(article);
     client.close();
        
    } catch (error) {
     res.status(200);
        
    } 
 });
 


app.get("/articles",async (req,res)=>{
   try {
    const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
    const db= client.db('blog');
    const articles=await db.collection('articles').find().toArray(function(err, result) {
        if (err) {
            res.status(400).json({msg:'not found'});
        }
        res.status(200).json(result);

      });
    client.close();
       
   } catch (error) {
    res.status(400);
       
   } 
});

app.post("/articles/add",async (req,res)=>{
    try {
     const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
     const db= client.db('blog');
     const articles=await db.collection('articles').save(req.body,(err,result)=>{
     
        res.status(200).json({msg:'added articles'});

     });
     client.close();
        
    } catch (error) {
     res.status(400);
        
    } 
 });

 


 
app.get("/users",async (req,res)=>{
    try {
     const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
     const db= client.db('blog');
     const users=await db.collection('users').find().toArray(function(err, result) {
         if (err) {
             res.status(400).json({msg:'not found'});
         }
         res.status(200).json(result);
 
       });
     client.close();
        
    } catch (error) {
     res.status(400);
        
    } 
 });


 
app.get("/users/:username",async (req,res)=>{
    try {
     const username=req.params.username;
     const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
     const db= client.db('blog');
     const user=await db.collection('users').findOne({username});
     res.status(200).json(user);
     client.close();
        
    } catch (error) {
     res.status(200);
        
    } 
 });

 app.post("/users/login",async (req,res)=>{
    try {
     const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
     const db= client.db('blog');
     const username= req.body.username;
     const password=req.body.password;
     const user=await db.collection('users').findOne({username},(err,result)=>{
         if(err)   throw err;
         if(!result)  { res.status(400).json({msg:'not Found'}); }
         else if(result.password == password){
            res.status(200).json(result);

         }else{
            res.status(400).json({msg:'not Found'});
         }
     });
     client.close();
        
    } catch (error) {
     res.status(400);
        
    } 
 });


 app.post("/users/add",async (req,res)=>{
    try {
     const client= await MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser:true, useUnifiedTopology: true });
     const db= client.db('blog');
     const users=await db.collection('users').save(req.body,(err,result)=>{
     
        res.status(200).json({msg:'added user'});

     });
     client.close();
        
    } catch (error) {
     res.status(400);
        
    } 
 });

app.listen(PORT, (err)=>console.log("port 5000"));