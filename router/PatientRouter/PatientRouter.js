const router = require('express').Router();

const {patientController} = require('../../controllers');
const {photoMiddleware} = require('../../middlewares');

router.post('/', photoMiddleware.photoChecker, patientController.createPatient);

module.exports = router
