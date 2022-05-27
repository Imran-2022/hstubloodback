const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()

const port = process.env.PORT || 8080;

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.iyci5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jufnc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    console.log("connected to database");
    const database = client.db("hstu-blood-share");
    const collection = database.collection("donors");
    const collection_managementTeam = database.collection("managementTeam");
    const collection_request = database.collection("managemenRequest");
    //   get api

    app.get("/donors", async (req, res) => {
      const query = {}
      const data = collection.find(query)
      const donors = await data.toArray();
      res.send(donors.reverse())
      // res.send(data)

    })


    //get single api 

    //  app.get("/data/:id", async(req, res) => {
    //   const id =req.params.id;
    //   const query={_id:ObjectId(id)}
    //   const data = await collection.findOne(query)
    //   res.send(data)// or res.json(data)
    // })


    //   post api 


    app.post("/donors", async (req, res) => {
      // console.log(req.body)
      const data = req.body;
      const result = await collection.insertOne(data);
      // console.log(result.insertedId); 
      res.send(result.insertedId)

    })
    //   update api


    // app.put("/data/:id",async(req, res)=>{
    //     const id =req.params.id;
    //    const updatedUser=req.body;
    //    const filter = {_id:ObjectId(id)};
    //    const options = { upsert: true };
    //    const updateDoc = {
    //     $set: {
    //         name:updatedUser.name,
    //         img:updatedUser.img,
    //         descriptions:updatedUser.descriptions
    //     },
    //   };
    //   const result = await collection.updateOne(filter, updateDoc,options);
    //   res.send(result)//res.json(result)
    //     console.log("result : ",result);
    // })


    //   delete api

    // app.delete("/data/:id",async(req, res)=>{
    //     const id=req.params.id;
    //     const query={_id:ObjectId(id)}
    //     const result = await collection.deleteOne(query);
    //     // console.log("deleting user with id ",id);
    //     // res.json(1)
    //     res.send(result);
    //     // console.log(result.deletedCount)
    // })

    // managing-team (admin )


    app.post("/managingTeam", async (req, res) => {
      console.log(req.body)
      const bodyData = req.body;
      const result = await collection_managementTeam.insertOne(bodyData);
      console.log(result.insertedId);
      res.send(result.insertedId)

    })
    //get addmin details

    app.get("/managingTeam", async (req, res) => {
      const query = {}
      const dataa = collection_managementTeam.find(query)
      const data = await dataa.toArray();
      res.send(data)

    })


    // request by user for blood 

    app.post("/request", async (req, res) => {
      console.log(req.body)
      const bodyData = req.body;
      const result = await collection_request.insertOne(bodyData);
      console.log(result.insertedId);
      res.send(result.insertedId)

    })
    
    app.get("/request", async (req, res) => {
      const query = {}
      const dataa = collection_request.find(query)
      const data = await dataa.toArray();
      // res.send(data.reverse())
      res.send(data)

    })
        
    app.put("/request/:id",async(req, res)=>{
      const id =req.params.id;
     const filter = {_id:ObjectId(id)};
     const options = { upsert: true };
     const updateDoc = {
      $set: {
        status: "done",
      },
    };
    const result = await collection_request.updateOne(filter, updateDoc,options);
    res.send(result)
  })


  // delete all request here 🚀

  app.delete("/request", async (req, res) => {
    console.log("first")
    console.log(req.body);
    const result = await collection_request.deleteMany({});
    // console.log("deleting user with id ",id);
    // res.json(1)
    res.send(result);
    console.log(result.deletedCount)
  })

  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send("backend with Md Imranul Haque 🚀");
})

app.listen(port, () => {
  console.log("index.js running")
})


