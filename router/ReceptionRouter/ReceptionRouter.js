const router = require('express').Router();

const {receptionController} = require('../../controllers');

router.get('/', receptionController.getAllReceptionRecords);
router.put('/telegram', receptionController.incrementTelegramMsg);


module.exports = router;