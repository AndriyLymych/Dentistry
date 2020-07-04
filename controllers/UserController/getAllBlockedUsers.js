const {userService} = require('../../services');
const {BLOCKED} = require('../../constant/userStatus.enam');

module.exports = async (req, res, next) => {

    try {
        let blockedUsers = [];

        const {name = ''} = req.query;

        if (!name) {
            blockedUsers = await userService.getAllUsers(BLOCKED);
        }

        if (name) {
            blockedUsers = await userService.getAllUsersByName(name, BLOCKED);
        }

        res.json(blockedUsers);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};