const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000



//e.g using for registration
app.post('/register',async(req,res) => {
    console.log(req.body);
    //insertOne the registration data to mongo
  
    const hash = bcrypt.hashSync(req.body.password, 10);
  
    let resq = await client.db("testing").collection("file_1").insertOne({
          name: req.body.username,
          age: req.body.age,
          gender: req.body.gender,
          faculty: req.body.faculty,
          password: hash //req.body.password
      });
      res.send(resq);
  })

  //DELETE USER FROM DATABASE
  //app.delete('/register',async(req,res) => {
  //})

  //update user info
  //app.patch('/register',async(req,res) => {
  //})
  
  
  app.post('/login',async(req,res) => { 
        let resp = await client.db("testing").collection("file_1").findOne({
          username: req.body.username
  })
    console.log(resp);
    console.log(req.body);
  
        if(!resp){
          res.send('User not found');
        }else{
          if(bcrypt.compareSync(req.body.password,resp.password)==true){
            res.send('Login successful');
          } else{
            res.send('Wrong Password');
          
          }
        }
        
  });