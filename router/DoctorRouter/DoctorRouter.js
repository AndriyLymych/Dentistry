const router = require('express').Router();

const {doctorController} = require('../../controllers');
const {photoMiddleware} = require('../../middlewares');

router.post('/', doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);


module.exports = router;