const {userService} = require('../../services');
const {ACTIVE, BLOCKED} = require('../../constant/userStatus.enam');

module.exports = async (req, res, next) => {

    try {
        let activeUsers = [];

        const {name = ''} = req.query;

        if (!name) {
            activeUsers = await userService.getAllUsers(ACTIVE);
        }

        if (name) {
            activeUsers = await userService.getAllUsersByName(name, ACTIVE);
        }

        res.json(activeUsers);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};