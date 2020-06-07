const router = require('express').Router();

const {
    userController: {
        updateUserProfile,
        evaluateDoctor
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


module.exports = router;