const {ResponseStatusCodes} = require('../../constant');
const {specialityService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {

        const specialities = await specialityService.getSpecialities();

        if (!specialities){
            throw new CustomError('No specialities',ResponseStatusCodes.FORBIDDEN,'get all specialities')
        }

        res.json(specialities);

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "GetAllDoctors"
            })
    }

}