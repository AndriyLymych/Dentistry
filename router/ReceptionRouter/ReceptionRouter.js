const router = require('express').Router();

const {receptionController} = require('../../controllers');

router.get('/', receptionController.getAllReceptionRecords);

module.exports = router;