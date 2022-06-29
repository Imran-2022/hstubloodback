const { collection,collection_managementTeam,collection_request,collection_beApart } = require('../models/connect.database')
const ObjectId = require('mongodb').ObjectId;


// donors - 

const donors = async (req, res) => {
    const query = {}
    const data = collection.find(query)
    const donors = await data.toArray();
    res.send(donors.reverse())
    // res.send(data)

}

const addDonors = async (req, res) => {
    const data = req.body;
    const result = await collection.insertOne(data);
    res.send(result.insertedId)

}

const deleteSingleDonors = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }
    const result = await collection.deleteOne(query);
    // res.json(1)
    res.send(result);
}

// updateDonorProfile

const updateDonorProfile = async (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            mobile: updatedUser.mobile,
            age: updatedUser.age,
            bloodGroup: updatedUser.bloodGroup,
            gender: updatedUser.gender,
            department: updatedUser.department,
            label: updatedUser.label,
            semester: updatedUser.semester,
            lastDonateDate: updatedUser.lastDonateDate
        },
    };
    const result = await collection.updateOne(filter, updateDoc, options);
    res.send(result)//res.json(result)
}

const getManagemetnTeamData = async (req, res) => {
    const query = {}
    const dataa = collection_managementTeam.find(query)
    const data = await dataa.toArray();
    res.send(data)

}


const addToManagementTeam = async (req, res) => {
    const bodyData = req.body;
    const result = await collection_managementTeam.insertOne(bodyData);
    res.send(result.insertedId)

}
const DeleteFromManagemetnTeam = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }
    const result = await collection_managementTeam.deleteOne(query);
    // res.json(1)
    res.send(result);
}

const DeleteBePartRequest = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }
    const result = await collection_beApart.deleteOne(query);
    // res.json(1)
    res.send(result);
}

const requestForBlood = async (req, res) => {
    const bodyData = req.body;
    const result = await collection_request.insertOne(bodyData);
    res.send(result.insertedId)
}

const allBloodRequest = async (req, res) => {
    const query = {}
    const dataa = collection_request.find(query)
    const data = await dataa.toArray();
    // res.send(data.reverse())
    res.send(data)

}

const updateBloodRequest = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            status: "done",
        },
    };
    const result = await collection_request.updateOne(filter, updateDoc, options);
    res.send(result)
}

const deleteDoneReq = async (req, res) => {
    const query = { status: "done" }
    const result = await collection_request.deleteMany(query);
    // res.json(1)
    res.send(result);
}


const requestToBeApart = async (req, res) => {
    const bodyData = req.body;
    const result = await collection_beApart.insertOne(bodyData);
    res.send(result.insertedId)

}

const allBeApartRequest=async (req, res) => {
    const query = {}
    const dataa = collection_beApart.find(query)
    const data = await dataa.toArray();
    res.send(data)
  
  }


module.exports = {
    donors,
    addDonors,
    deleteSingleDonors,
    updateDonorProfile,
    getManagemetnTeamData,
    addToManagementTeam,
    DeleteFromManagemetnTeam,
    DeleteBePartRequest,
    requestForBlood,
    allBloodRequest,
    updateBloodRequest,
    deleteDoneReq,
    requestToBeApart,
    allBeApartRequest
}
