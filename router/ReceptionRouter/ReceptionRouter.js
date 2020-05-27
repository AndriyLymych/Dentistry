const router = require('express').Router();

const {receptionController} = require('../../controllers');
const {accessTokenChecker,getUserFromAccessToken} = require( '../../middlewares/authMiddleware');

router.get('/', receptionController.getAllReceptionRecords);
router.put('/telegram', receptionController.incrementTelegramMsg);
router.get('/me', accessTokenChecker, getUserFromAccessToken, receptionController.getReceptionRecordsForPatient);


module.exports = router;