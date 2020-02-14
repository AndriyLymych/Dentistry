const {userService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');
const {passwordHasher, passwordChecker} = require('../../helpers');

module.exports = async (req, res) => {
    try {

        const {password, newPassword, newPasswordAgain} = req.body;
        const {user_id: id} = req.user;

        const user = await userService.getUserById(id);

        await passwordChecker(user.password, password);

        if (newPassword !== newPasswordAgain) {

            throw new CustomError('Passwords do not match', ResponseStatusCodes.FORBIDDEN, 'changePassword')
        }

        const hashPass = await passwordHasher(newPassword);

        await userService.updateUserByParams({password: hashPass}, id);

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