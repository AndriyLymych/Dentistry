const {userService} = require('../../services');
const {mailerForChangePassword} = require('../../helpers');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res) => {
    try {
        const {user_id:id} = req.user;
        console.log(req.user);
        const userPresent = await userService.getUserById(id);

        console.log(userPresent);
        if (!userPresent) {
            throw new CustomError('User is not present', ResponseStatusCodes.NOT_FOUND, 'sendEmailForChangePassword');
        }

        await mailerForChangePassword(userPresent.email);

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