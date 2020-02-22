const {userService, emailService, authService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes, ACTION} = require('../../constant');
const {tokenCreatorForResetPassword} = require('../../helpers');

module.exports = async (req, res) => {
    try {
        const {email} = req.body;

        const userPresent = await userService.getUserByParams({email});

        if (!userPresent) {
            throw new CustomError('User is not present', ResponseStatusCodes.NOT_FOUND, 'refreshPassword');
        }
        const {action_token} = tokenCreatorForResetPassword();
        console.log(action_token);
        authService.insertTokenForChangePassword({
            user_id: userPresent.id,
            action_token,
            action_id: ACTION.RESET_PASSWORD
        });

        await emailService.sendEmailForChangePassword(
            userPresent.email,
            userPresent.name,
            userPresent.middleName,
            action_token
        );

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