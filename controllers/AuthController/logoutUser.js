const {oauthService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        await oauthService.deleteTokensFromDB({access_token: token});

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        next(new CustomError(e))

    }
}