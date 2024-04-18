const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
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
})




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://b022210136:bilibili@cluster0.wfnyzi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    //let result = await client.db('benr24231').collection('datacollection').insertOne(
     // {
    //    subject: 'benr2434',
    //    description: 'database and cloud',
    //  }
    //)
    //console.log(result)

    //let subjects= await client.db('benr24231').collection('datacollection').find().toArray()
    //console.log(subjects)

    //let updated = await client.db('benr24231').collection('datacollection').updateOne(
    //  {code: 'BERR 1111'},
      //{  

        //$set:{
         //description: 'Data Science',
         //lecturer: 'Dr.John Doe',
         //semester: 3
      //}
      //}
    //)

  let deleted = await client.db('benr24231').collection('datacollection').deleteOne(
    {
      _id: new ObjectId('660b6bdd599dc6a9941c53e7'),
    }
  )


  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

