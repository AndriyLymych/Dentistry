const {userService, oauthService} = require('../../services');
const {USER_STATUS, USER_ROLE, ResponseStatusCodes} = require('../../constant');
const {tokenCreator, passwordChecker} = require('../../helpers');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userPresent = await userService.getUserByParams({
            email
        });

        if (userPresent.role_id !== USER_ROLE.PATIENT && userPresent.role_id !== USER_ROLE.DOCTOR) {
            throw new CustomError('Such user is not register', ResponseStatusCodes.NOT_FOUND, 'authUser')
        }

        if (!userPresent) {
            throw new CustomError('Such user is not register', ResponseStatusCodes.NOT_FOUND, 'authUser')
        }

        if (userPresent.status_id === USER_STATUS.BLOCKED) {
            throw new CustomError('User is blocked', ResponseStatusCodes.FORBIDDEN, 'authUser')

        }
        await passwordChecker(userPresent.password, password);

        const tokens = tokenCreator();

        await oauthService.insertTokens({
            user_id: userPresent.id,
            ...tokens
        });

        res.json(tokens)
    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller || "authUser"
            })
    }
}