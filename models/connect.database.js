const { MongoClient, ServerApiVersion } = require('mongodb');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jufnc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const database = client.db("hstu-blood-share");
const collection = database.collection("donors");
const collection_managementTeam = database.collection("managementTeam");
const collection_request = database.collection("managemenRequest");
const collection_beApart = database.collection("beApartOfManagementTeam");


module.exports = {
    DATABASE: client,
    collection,
    collection_managementTeam,
    collection_request,
    collection_beApart
}
