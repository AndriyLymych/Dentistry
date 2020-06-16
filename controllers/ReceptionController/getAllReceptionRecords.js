const {ResponseStatusCodes, USER_ROLE} = require('../../constant');
const {queryParser} = require('../../helpers');
const {receptionService, userService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {user_id: id} = req.user;
        const parsedQuery = queryParser(req.query);

        const isUserPresent = await userService.getUserById(id);

        if (!isUserPresent || isUserPresent.role_id !== USER_ROLE.DOCTOR) {
            throw new CustomError('Wrong user', ResponseStatusCodes.FORBIDDEN, 'get all reception records')
        }

        const records = await receptionService.getAllReceptionRecords(parsedQuery);

        res.status(ResponseStatusCodes.CREATED).json(records);

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "Get all reception records"
            })
    }
};
