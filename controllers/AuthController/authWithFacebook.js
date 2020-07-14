const {CustomErrorData, CustomError} = require('../../error');
const {ResponseStatusCodes, USER_ROLE, USER_STATUS} = require('../../constant');
const {userService, oauthService} = require('../../services');
const {tokenCreator} = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        console.log('face');
        let tokenPair = [];
        const userFromFacebook = req.user._json;
        // console.log(userFromFacebook);
        const {first_name: name, last_name: surname, email} = userFromFacebook;

        if (!userFromFacebook) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_FACEBOOK_AUTH.message,
                CustomErrorData.BAD_REQUEST_FACEBOOK_AUTH.code
            )
        }
        const userPresent = await userService.getUserByParams({email});
        console.log(userPresent);
        if (userPresent.role_id !== USER_ROLE.PATIENT && userPresent.role_id !== USER_ROLE.DOCTOR) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_USER_NOT_PRESENT.code,
            )
        }


        if (userPresent.status_id === USER_STATUS.BLOCKED) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_USER_IS_BLOCKED.message,
                CustomErrorData.FORBIDDEN_USER_IS_BLOCKED.code,
            )
        }

        const {id} = userPresent;

        if (userPresent) {
            await oauthService.deleteTokensFromDB({user_id: id});

            const tokens = tokenCreator();

            await oauthService.insertTokens({
                ...tokens,
                user_id: id
            });

            tokenPair = tokens;
        }

        // if (!userPresent) {
        //     await userService.createUser({
        //
        //     })
        // }
        res.status(ResponseStatusCodes.CREATED).json(tokenPair)
    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}