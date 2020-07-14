const router = require('express').Router();
const passport = require('passport');

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
router.get('/google', passport.authenticate("google", {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect:'/'
}), authController.authWithGoogle);

router.get('/facebook', passport.authenticate("facebook", {scope: ['email']}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    session: false
}), authController.authWithFacebook);

module.exports = router;
