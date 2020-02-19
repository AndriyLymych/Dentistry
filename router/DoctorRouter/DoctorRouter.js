const router = require('express').Router();

const {doctorController} = require('../../controllers');
const {photoMiddleware} = require('../../middlewares');

router.post('/', photoMiddleware.photoCount, photoMiddleware.photoChecker, doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);


module.exports = router;