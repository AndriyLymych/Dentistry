const {ResponseStatusCodes, USER_ROLE} = require('../../constant');
const {userService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const doctors = await userService.getAllDoctors({role_id: USER_ROLE.DOCTOR});

        res.status(ResponseStatusCodes.CREATED).json(doctors);

    } catch (e) {
        next(new CustomError(e))

    }

}