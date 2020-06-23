const {ResponseStatusCodes} = require('../../constant');
const {receptionService, userService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {

        const {user_id} = req.user;
        const {record_id: id} = req.params;
        const {email} = await userService.getUserById(user_id);
        const isRecordPresent = await receptionService.getReceptionRecordByParams({id, email});

        if (!isRecordPresent) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_RECORD_NOT_PRESENT.message,
                CustomErrorData.FORBIDDEN_RECORD_NOT_PRESENT.code,
            )
        }

        await receptionService.deleteReceptionRecord(id, email);

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};
