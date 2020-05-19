const router = require('express').Router();

const {doctorController} = require('../../controllers');
const {photoMiddleware: {photoChecker, photoCount}} = require('../../middlewares');

router.post('/', photoChecker, photoCount, doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);


module.exports = router;
