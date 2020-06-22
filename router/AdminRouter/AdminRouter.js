const router = require('express').Router();

const {authController, adminController, doctorController} = require('../../controllers');
const {authMiddleware, userMiddleware, photoMiddleware: {photoChecker, photoCount}} = require('../../middlewares');

router.post(
    '/',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    adminController.createAdmin
);
router.put(
    '/auth/password-change',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    authController.changePassword
);
router.post(
    '/services',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    photoChecker,
    photoCount,
    adminController.addNewMedicalService
);

router.delete(
    '/services/:id',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    adminController.deleteMedicalService
);
router.put(
    '/services/:id',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    adminController.updateMedicalService
);
router.put(
    '/services/photo/:id',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    photoChecker,
    photoCount,
    adminController.updateMedicalServicePhoto
);


router.post('/auth', authController.authAdmin);

router.post('/auth/logout', authMiddleware.accessTokenChecker, authController.logoutUser);

router.post(
    '/auth/refresh',
    authMiddleware.refreshTokenChecker,
    authMiddleware.getUserFromRefreshToken,
    authController.refreshToken
);
router.use(
    '/users/:id',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    userMiddleware.userPresent
);

router.put('/users/:id/block', adminController.blockUser);

router.put('/users/:id/unblock', adminController.unblockUser);


router.get(
    '/auth/me',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    authController.getAdminDatesFromAccessToken
);
router.post('/create-doctor',
    authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    doctorController.createDoctor
);

module.exports = router;
