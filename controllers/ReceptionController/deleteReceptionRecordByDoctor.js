const {ResponseStatusCodes, USER_ROLE} = require('../../constant');
const {receptionService, userService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {

        const {user_id} = req.user;

        const {record_id: id} = req.params;

        const {role_id} = await userService.getUserById(user_id);
        const isRecordPresent = await receptionService.getReceptionRecordById(id);

        if (role_id !== USER_ROLE.DOCTOR) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_DOCTOR.message,
                CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_DOCTOR.code,
            )
        }

        if (!isRecordPresent) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_RECORD_NOT_PRESENT.message,
                CustomErrorData.FORBIDDEN_RECORD_NOT_PRESENT.code,
            )
        }
        await receptionService.deleteReceptionRecordByDoctor(id);


        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}