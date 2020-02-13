const {ResponseStatusCodes, USER_ROLE} = require('../../constant');
const {userService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const doctors = await userService.getAllDoctors({role_id:USER_ROLE.DOCTOR});

        res.status(ResponseStatusCodes.CREATED).json(doctors);

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "GetAllDoctors"
            })
    }

}