const {userService, emailService, authService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes, ACTION} = require('../../constant');
const {tokenCreatorForResetPassword} = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const {email} = req.body;

        const userPresent = await userService.getUserByParams({email});


        if (!userPresent) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
            )
        };

        const {action_token} = tokenCreatorForResetPassword();

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
        next(new CustomError(e.status, e.message, e.code))

    }
}