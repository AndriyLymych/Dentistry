const router = require('express').Router();

const {doctorController} = require('../../controllers');

router.post('/', doctorController.createDoctor);

module.exports = router