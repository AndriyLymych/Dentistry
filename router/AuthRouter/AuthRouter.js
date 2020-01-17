const router = require('express').Router();

const {authController} = require('../../controllers');

router.post('/',authController.authUser);
module.exports = router;