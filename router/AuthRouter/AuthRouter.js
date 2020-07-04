const router = require('express').Router();

const {authController} = require('../../controllers');
const {authMiddleware} = require('../../middlewares');

router.get(
    '/me',
    authMiddleware.accessTokenChecker,
    authMiddleware.getUserFromAccessToken,
    authController.getUserFromAccessToken
);
router.post('/', authController.authUser);
router.post('/logout', authController.logoutUser);
router.post(
    '/refresh',
    authMiddleware.refreshTokenChecker,
    authMiddleware.getUserFromRefreshToken,
    authController.refreshToken
);


router.post(
    '/password-refresh',
    authController.refreshPassword
);
router.put(
    '/password-refresh/:token',
    authController.resetPassword
);
router.put(
    '/password-change',
    authMiddleware.accessTokenChecker,
    authMiddleware.getUserFromAccessToken,
    authController.changePassword
);

module.exports = router;
