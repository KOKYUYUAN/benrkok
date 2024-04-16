const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

app.post('/register',async(req,res) => {
  //console.log(req.body.username);
  //insertOne the registration data to mongo
  let result = await client.db("benr24231").collection("datacollection").insertOne({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email
  })
  res.send(result)
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

