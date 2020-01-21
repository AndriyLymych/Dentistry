const {userService, oauthService} = require('../../services');
const {USER_STATUS, USER_ROLE} = require('../../constant');
const {tokenCreator} = require('../../helpers');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userPresent = await userService.getUserByParams({
            email,
            role_id: USER_ROLE.PATIENT || USER_ROLE.DOCTOR
        });

        if (!userPresent) {
            throw new CustomError('Such user is not register', 403, 'authUser')
        }
        if (userPresent.status_id === USER_STATUS.BLOCKED) {
            throw new CustomError('User is blocked', 403, 'authUser')

        }

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