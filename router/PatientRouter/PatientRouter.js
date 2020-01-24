const router = require('express').Router();

const {patientController} = require('../../controllers');

router.post('/', patientController.createPatient);

module.exports = router
