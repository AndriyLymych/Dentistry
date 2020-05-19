const {ResponseStatusCodes} = require('../../constant');
const {userService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {DOCTOR} =require('../../constant/userRole.enam');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;

        const doctor = await userService.getUserById(id);

        if (!doctor) throw new CustomError(
            'Unfortunately such doctor is not present',
            ResponseStatusCodes.BAD_REQUEST,
            'getDoctorById'
        );

        if (doctor.role_id !== DOCTOR) throw new CustomError (
            'It is not a doctor ',
            ResponseStatusCodes.BAD_REQUEST,
            'getDoctorById'
        );


        res.status(ResponseStatusCodes.CREATED).json(doctor)

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "getDoctorById"
            })
    }
};