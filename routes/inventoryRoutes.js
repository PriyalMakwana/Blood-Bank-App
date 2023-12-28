const express =require ('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController,
        getInventoryController,
         getDonarsController, 
         getHospitalController,
         getOrgnaisationController,
         getOrgnaisationForHospitalController,
         getInventoryHospitalController} = require('../controller/inventoryController');


const router = express.Router()

//routes
// ADD INVENTORY||POST
router.post('/create-inventory',authMiddleware,createInventoryController);

//get all blood record
router.get("/get-inventory",authMiddleware,getInventoryController)

//get hospital blood record
router.post("/get-inventory-hospital",authMiddleware,getInventoryHospitalController)

//get donars record
router.get("/get-donars",authMiddleware,getDonarsController)

//get Hospital record
router.get("/get-hospitals",authMiddleware,getHospitalController);

//get organisation record
router.get("/get-orgnaisation",authMiddleware,getOrgnaisationController);

//get organisation record
router.get("/get-orgnaisation-for-hospital",authMiddleware,getOrgnaisationForHospitalController);

module.exports = router