const router = require('express').Router();

const {
    userController: {
        updateUserProfile,
        evaluateDoctor,
        getIsEvaluateForUser,
        getAverageMark
    }
} = require('../../controllers');
const {

    authMiddleware: {
        accessTokenChecker,
        getUserFromAccessToken
    }
} = require('../../middlewares');


router.put(
    '/update-profile',
    accessTokenChecker,
    getUserFromAccessToken,
    updateUserProfile
);

router.post(
    '/evaluate-doctor',
    accessTokenChecker,
    getUserFromAccessToken,
    evaluateDoctor
);
router.get(
    '/is-evaluated',
    accessTokenChecker,
    getUserFromAccessToken,
    getIsEvaluateForUser
);
router.get(
    '/average-mark',
    getAverageMark
);


module.exports = router;