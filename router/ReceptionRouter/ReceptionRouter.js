const router = require('express').Router();

const {receptionController} = require('../../controllers');
const {accessTokenChecker, getUserFromAccessToken} = require('../../middlewares/authMiddleware');

router.get('/',accessTokenChecker,getUserFromAccessToken, receptionController.getAllReceptionRecords);
router.put('/telegram', receptionController.incrementTelegramMsg);
router.get('/me', accessTokenChecker, getUserFromAccessToken, receptionController.getReceptionRecordsForPatient);
router.delete('/:record_id', accessTokenChecker, getUserFromAccessToken, receptionController.deleteReceptionRecord);
router.delete(
    '/by-doctor/:record_id',
    accessTokenChecker,
    getUserFromAccessToken,
    receptionController.deleteReceptionRecordByDoctor
);


module.exports = router;