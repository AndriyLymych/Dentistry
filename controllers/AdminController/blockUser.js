const {oauthService, adminService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes, USER_STATUS} = require('../../constant');

module.exports = async (req, res) => {
    try {
        const {id, status_id} = req.user;

        if (status_id === USER_STATUS.BLOCKED) {
            throw new CustomError('User is already blocked', ResponseStatusCodes.FORBIDDEN, 'blockUser')
        }

        await adminService.blockUser(id);

        await oauthService.deleteTokensFromDB({user_id: id});

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