const fs = require('fs-extra');
const {resolve} = require('path');

const {CustomErrorData, CustomError} = require('../../error');
const {medicalFavourService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const appRoot = global.appRoot;
        const photoDir = `medicalService/${id}`;

        const service = await medicalFavourService.getMedicalServiceById(id);

        if (!service) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.message,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.code,
            )
        }
        await fs.removeSync(resolve(appRoot, 'public', photoDir));

        await medicalFavourService.deleteMedicalService({id});

        res.end();

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}