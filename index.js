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
    const collection_beApart = database.collection("beApartOfManagementTeam");
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

    // http://localhost:8080/donors

    app.delete("/donors/:id",async(req, res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)}
      const result = await collection.deleteOne(query);
      // console.log("deleting user with id ",id);
      // res.json(1)
      res.send(result);
      // console.log(result.deletedCount)
  })

    //   update user profile data.


    app.put("/donors/:id",async(req, res)=>{
      const id =req.params.id;
     const updatedUser=req.body;
     console.log('updatedUser',updatedUser);
     const filter = {_id:ObjectId(id)};
     const options = { upsert: true };
     const updateDoc = {
      $set: {
        mobile:updatedUser.mobile,
        age:updatedUser.age,
        bloodGroup:updatedUser.bloodGroup,
        gender:updatedUser.gender,
        department:updatedUser.department,
        label:updatedUser.label,
        semester:updatedUser.semester,
        lastDonateDate:updatedUser.lastDonateDate
      },
    };
    const result = await collection.updateOne(filter, updateDoc,options);
    res.send(result)//res.json(result)
      console.log("result : ",result);
  })



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

    // http://localhost:8080/managingTeam

     app.delete("/managingTeam/:id",async(req, res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)}
        const result = await collection_managementTeam.deleteOne(query);
        // console.log("deleting user with id ",id);
        // res.json(1)
        res.send(result);
        // console.log(result.deletedCount)
    })
     app.delete("/beApart/:id",async(req, res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)}
        const result = await collection_beApart.deleteOne(query);
        // console.log("deleting user with id ",id);
        // res.json(1)
        res.send(result);
        // console.log(result.deletedCount)
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
    console.log(req.body);
    const query={status:"done"}
    const result = await collection_request.deleteMany(query);
    // console.log("deleting user with id ",id);
    // res.json(1)
    res.send(result);
    console.log(result.deletedCount)
  })



// become a part of managementTeam

app.post("/beApart", async (req, res) => {
  console.log(req.body)
  const bodyData = req.body;
  const result = await collection_beApart.insertOne(bodyData);
  console.log(result.insertedId);
  res.send(result.insertedId)

})

app.get("/beApart", async (req, res) => {
  const query = {}
  const dataa = collection_beApart.find(query)
  const data = await dataa.toArray();
  res.send(data)

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


