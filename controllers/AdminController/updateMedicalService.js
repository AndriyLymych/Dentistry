const Joi = require('joi');

const {medicalFavourService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');
const {CustomError,CustomErrorData} =require('../../error');
const {medicalServiceValidator} =require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const newService = req.body;

        const isServicePresent = await medicalFavourService.getMedicalServiceById(id);

        if (!isServicePresent) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.message,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.code,
            )
        }

        const validatedService = Joi.validate(newService, medicalServiceValidator);

        if (validatedService.error) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN, validatedService.error.details[0].message
            );
        }

        await medicalFavourService.updateMedicalService({
            service: newService.service,
            description: newService.description,
            price: newService.price
        }, id);

        res.status(ResponseStatusCodes.CREATED).json()
    } catch (e) {

        next(new CustomError(e.status, e.message, e.code))

    }
}