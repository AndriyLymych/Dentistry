const router = require('express').Router();

const {doctorController} = require('../../controllers');
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

router.get('/specialities',doctorController.getAllSpecialities);
router.put(
    '/update-avatar',
    accessTokenChecker,
    getUserFromAccessToken,
    photoChecker,
    photoCount,
    doctorController.updateDoctorPhoto);

router.get('/', doctorController.getAllDoctors);

router.get('/:id', doctorController.getDoctorById);


module.exports = router;
