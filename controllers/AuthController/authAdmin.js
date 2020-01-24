const {userService, oauthService} = require('../../services');
const {USER_STATUS, USER_ROLE, ResponseStatusCodes} = require('../../constant');
const {tokenCreator} = require('../../helpers');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {email, password} = req.body;

        const adminPresent = await userService.getUserByParams({
            email,
            role_id: USER_ROLE.ADMIN
        });

        if (!adminPresent) {
            throw new CustomError('Such user is not register', ResponseStatusCodes.FORBIDDEN, 'authAdmin')
        }
        if (adminPresent.status_id === USER_STATUS.BLOCKED) {
            throw new CustomError('Admin is blocked', ResponseStatusCodes.FORBIDDEN, 'authAdmin')

        }
        //TODO hashed password check for admin
        const tokens = tokenCreator();

        await oauthService.insertTokens({
            user_id: adminPresent.id,
            ...tokens
        });

        res.json(tokens)
    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller || "authAdmin"
            })
    }
}