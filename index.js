const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var jwt = require('jsonwebtoken');

app.use(express.json())

app.get('/user/:id',verifyToken, async(req, res) => {
  if (req.identify._id != req.params.id) {
    res.send('User is not authorized')
  
  }
  let auth = req.headers.authorization
  console.log(auth)

  let authSplitted = auth.split(' ')
  console.log(authSplitted)

  let token = authSplitted[1]
  console.log(token)

  let decoded = jwt.verify(token, 'passworddifficulttohack')
  console.log(decoded)

  if (req.identify._id != req.params.id) {
    res.send('User is not authorized')
  }
  else{
  let result= await client.db("benr24231").collection("datacollection").findOne({
    _id: new ObjectId(req.params.id)
  })
  res.send(result)
}
})

app.get('/inc',async(req,res) => {
  let result=await client.db("benr24231").collection("items").updateOne(
    {name:{ $eq: "Nasi Lemak"}},//filter
    { $inc: {price: 3}}//update
  )
  console.log(result)
  res.send(result)
}) 

app.get('/push',async(req,res) => {
  let result=await client.db("benr24231").collection("items").updateOne(
    {name:{ $eq: "Teh Tarik"}},//filter
    { $push:{ingredients :{type:"air",amount:100}}}//update
  )
  console.log(result)
  res.send(result)
}) 

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.post('/test', (req, res) => {
  let result = 
  {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
console.log(req.body)
  res.send(result);
})
app.listen(port, () => {
   console.log(`server listening at http://localhost:${port}`)
})

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
        var token = jwt.sign(
          { _id: result._id, password: result.password, name: result.name, username: result.username}, 
          'passworddifficulttohack'
        );
        //{ expiresIn: 60 * 60 }
        //paaword is correct
        res.send(token);
      } else{
        //password is incorrect
        res.status(404).send('Wrong Password');
      
      }
    }else{
      //step3:if user not found
      res.send('User not found');
    
    }
}
})

const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
const uri = "mongodb+srv://b022210136:bilibili@cluster0.wfnyzi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function verifyToken(req,res,next)
{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'passworddifficulttohack', (err, decoded) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.identify = decoded
    next()
  })  


}
  
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}


run().catch(console.dir);

