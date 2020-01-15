const router = require('express').Router();
const {userController}=require('../../controllers');
const {photoMidleware}=require('../../middlewares')

router.post('/patient',photoMidleware.photoChecker,userController.createPatient);

module.exports = router