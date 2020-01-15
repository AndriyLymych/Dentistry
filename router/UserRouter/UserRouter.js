const router = require('express').Router();

const {userController} = require('../../controllers');
const {photoMiddleware} = require('../../middlewares');

router.post('/', userController.createDoctor);

router.post('/patient', photoMiddleware.photoChecker, userController.createPatient); // patient Router

module.exports = router
