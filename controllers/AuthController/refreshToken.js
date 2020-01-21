const {oauthService} = require('../../services');
const {tokenCreator} = require('../../helpers');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res) => {
    try {
        const refresh_token = req.get('Authorization');
        const {user_id} = req.user;

        const newTokens = tokenCreator();

        await oauthService.deleteTokensFromDB({refresh_token});

        await oauthService.insertTokens({
            user_id,
            ...newTokens
        });

        res.status(ResponseStatusCodes.CREATED).end()
    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller || "refreshToken"
            })
    }
}