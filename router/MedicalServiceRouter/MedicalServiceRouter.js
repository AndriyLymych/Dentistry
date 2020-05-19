const router = require('express').Router();

const {medicalServiceController} = require('../../controllers');

router.get('/', medicalServiceController.getAllMedicalServices);

router.get('/:id', medicalServiceController.getMedicalServiceById);


module.exports = router;