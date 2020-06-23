const {ResponseStatusCodes} = require('../../constant');
const {medicalFavourService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        const service = await medicalFavourService.getMedicalServiceById(id);

        if (!service) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.message,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.code,
            )
        }

        res.json(service)

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }

}