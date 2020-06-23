const {userService} = require('../../services');

module.exports = async (req, res, next) => {

    try {
        let users = [];
        const {name = ''} = req.query;

        if (!name) {
            users = await userService.getAllUsers()
        }

        if (name) {
            users = await userService.getAllUsersByName(name);
        }

        res.json(users);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};