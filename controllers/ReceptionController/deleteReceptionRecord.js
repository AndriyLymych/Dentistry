const {ResponseStatusCodes} = require('../../constant');
const {receptionService, userService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {

        const {user_id} = req.user;
        const {record_id: id} = req.params;
        const {email} = await userService.getUserById(user_id);
        const isRecordPresent = await receptionService.getReceptionRecordByParams({id, email});

        if (!isRecordPresent) {
            throw new CustomError('No such record')
        }

        await receptionService.deleteReceptionRecord(id, email);

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "delete reception record "
            })
    }
};
