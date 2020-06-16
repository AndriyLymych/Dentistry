const {ResponseStatusCodes} = require('../../constant');
const {userService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
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
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "Get all users"
            })
    }
};