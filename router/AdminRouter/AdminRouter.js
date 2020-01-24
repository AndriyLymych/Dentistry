const router = require('express').Router();

const {authController} = require('../../controllers');
const {authMiddleware} = require('../../middlewares');

router.post('/safhaasfasdfajk_auth_admin', authController.authAdmin);
// router.post('/logout', authMiddleware.accessTokenChecker, authController.logoutUser);
// router.post(
//     '/refresh',
//     authMiddleware.refreshTokenChecker,
//     authMiddleware.getUserFromRefreshToken,
//     authController.refreshToken
// );

module.exports = router;