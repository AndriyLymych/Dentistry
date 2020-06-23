const {ResponseStatusCodes} = require('../../constant');
const {specialityService} = require('../../services');
const {CustomError,CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {

        const specialities = await specialityService.getSpecialities();

        if (!specialities) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_NO_SPECIALITIES.message,
                CustomErrorData.FORBIDDEN_NO_SPECIALITIES.code,
            )        }

        res.json(specialities);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }

}