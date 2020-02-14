const router = require('express').Router();

const {doctorController} = require('../../controllers');

router.post('/', doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);



module.exports = router