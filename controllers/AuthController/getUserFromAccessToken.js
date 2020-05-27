const {userService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {user_id:id} = req.user;

        const user = await userService.getUserInfoFromAccessToken(id);

        if (!user) throw new CustomError('Such user is not present');

        res.json(user);

    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller || "getUserFromAccessTokenController"
            })
    }
}