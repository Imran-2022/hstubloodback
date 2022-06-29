const router = require('express').Router();
const { donors, addDonors, deleteSingleDonors, updateDonorProfile, getManagemetnTeamData, addToManagementTeam, DeleteFromManagemetnTeam, DeleteBePartRequest, requestForBlood, allBloodRequest, updateBloodRequest, deleteDoneReq,requestToBeApart,allBeApartRequest } = require('../controllers/controllers');


router.route("/donors")
    .get(donors)
    .post(addDonors)
router.route("/donors/:id")
    .delete(deleteSingleDonors)
    .put(updateDonorProfile)

router.route("/managingTeam")
    .get(getManagemetnTeamData)
    .post(addToManagementTeam)
router.route("/managingTeam/:id")
    .delete(DeleteFromManagemetnTeam)

router.route("/beApart")
    .post(requestToBeApart)
    .get(allBeApartRequest)

router.route("/beApart/:id")
    .delete(DeleteBePartRequest)

router.route("/request")
    .post(requestForBlood)
    .get(allBloodRequest)
    .delete(deleteDoneReq)

router.route("/request/:id")
    .put(updateBloodRequest)

module.exports = router;