const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000



//e.g using for registration
app.post('/register',async(req,res) => {
  let EXISTS = await
  client.db("benr24231").collection("datacollection").findOne({
    username: req.body.username
  })
  if(EXISTS){
    res.status(404).send('User already exists')
    return
  } 
  //console.log(req.body.username);
  //insertOne the registration data to mongo
  else{
  const hash = bcrypt.hashSync(req.body.password, 10);
  
  let result = await client.db("benr24231").collection("datacollection").insertOne({
    username: req.body.username,
    password: hash,
    name: req.body.name,
    email: req.body.email
  })
  res.send(result)
}
})

app.post('/login',async(req,res) => { 
// step #1:req.body.username
  let result = await client.db("benr24231").collection("datacollection").findOne({
    username: req.body.username
})
console.log(result);
console.log(req.body);
if(!req.body.username || !req.body.password){
  res.status(404).send('Please provide username and password')
}
else if(req.body.username != null && req.body.password != null){

  if(result){
    //step2:if user exists, check if password is correct
    if(bcrypt.compareSync(req.body.password,result.password)==true){
      //paaword is correct
      res.send('Login successful');
    } else{
      //password is incorrect
      res.status(404).send('Wrong Password');
    
    }
  }else{
    //step3:if user not found
    res.send('User not found');
  
  }
}

});
