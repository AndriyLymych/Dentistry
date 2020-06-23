const {ResponseStatusCodes} = require('../../constant');
const {userService} = require('../../services');
const {CustomError,CustomErrorData} = require('../../error');
const {DOCTOR} = require('../../constant/userRole.enam');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        const doctor = await userService.getUserById(id);

        if (!doctor){
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_DOCTOR_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_DOCTOR_NOT_PRESENT.code,
            )
        }

        if (doctor.role_id !== DOCTOR) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_DOCTOR.message,
                CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_DOCTOR.code,
            )
        }


        res.status(ResponseStatusCodes.CREATED).json(doctor)

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};