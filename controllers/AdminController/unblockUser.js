const {adminService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes, USER_STATUS} = require('../../constant');

module.exports = async (req, res) => {
    try {
        const {id, status_id} = req.user;

        if (status_id === USER_STATUS.ACTIVE) {
            throw new CustomError('User is already unblocked', ResponseStatusCodes.FORBIDDEN, 'unblockUser')
        }

        await adminService.unblockUser(id);

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            })
    }

}