const {userService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res) => {
    try {
        const {t: token} = req.query;

        const {newPassword, newPasswordAgain} = req.body;
        const {user_id: id} = req.user;

        if (newPassword !== newPasswordAgain) {
            throw new CustomError('Passwords do not match',ResponseStatusCodes.FORBIDDEN,'changePassword')
        }

        await userService.updateUserByParams({password: newPassword}, id);

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