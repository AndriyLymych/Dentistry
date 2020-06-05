const router = require('express').Router();

const {
    userController: {
        updateUserProfile
    }
} = require('../../controllers');
const {
    photoMiddleware: {
        photoChecker,
        photoCount
    },
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


module.exports = router;