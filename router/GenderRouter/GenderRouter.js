const router = require('express').Router();

const {genderController} = require('../../controllers');

router.get('/', genderController.getAllGenders);


module.exports = router;