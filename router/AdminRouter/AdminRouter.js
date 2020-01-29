const router = require('express').Router();

const {authController, adminController} = require('../../controllers');
const {authMiddleware} = require('../../middlewares');

router.post(
    '/', authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    adminController.createAdmin
);
router.post('/auth', authController.authAdmin);
router.post('/auth/logout', authMiddleware.accessTokenChecker, authController.logoutUser);
router.post(
    '/auth/refresh',
    authMiddleware.refreshTokenChecker,
    authMiddleware.getUserFromRefreshToken,
    authController.refreshToken
);


module.exports = router;