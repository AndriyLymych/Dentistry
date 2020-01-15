const router = require('express').Router();
const {userController}=require('../../controllers');

router.post('/patient',userController.createPatient);

module.exports = router