const {ResponseStatusCodes, USER_ROLE} = require('../../constant');
const {queryParser} = require('../../helpers');
const {receptionService, userService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const {user_id: id} = req.user;
        const parsedQuery = queryParser(req.query);

        const isUserPresent = await userService.getUserById(id);

        if (!isUserPresent || isUserPresent.role_id !== USER_ROLE.DOCTOR) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_DOCTOR.message,
                CustomErrorData.BAD_REQUEST_YOU_ARE_NOT_DOCTOR.code,
            )
        }

        const records = await receptionService.getAllReceptionRecords(parsedQuery);

        res.status(ResponseStatusCodes.CREATED).json(records);

    } catch (e) {
        next(new CustomError(e))

    }
};
