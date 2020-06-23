const fs = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v4();

const {CustomError,CustomErrorData} = require('../../error');
const {medicalFavourService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const [photo] = req.photos;

        const isServicePresent = await medicalFavourService.getMedicalServiceById(id);

        if (!isServicePresent) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.message,
                CustomErrorData.FORBIDDEN_MEDICAL_SERVICE_IS_NOT_PRESENT.code,
            )
        }
        const appRoot = global.appRoot;

        const photoDir = `medicalService/${id}/avatar`;
        const photoExtension = photo.name.split('.').pop();
        const photoName = `${uuid}.${photoExtension}`;

        await fs.removeSync(resolve(appRoot, 'public', photoDir));


        await fs.mkdirSync(resolve(appRoot, 'public', photoDir), {recursive: true});

        await photo.mv(resolve(appRoot, 'public', photoDir, photoName));

        await medicalFavourService.updateMedicalService({

            photo: `${photoDir}/${photoName}`

        }, id);

        res.status(ResponseStatusCodes.CREATED).json()
    } catch (e) {

        next(new CustomError(e.status, e.message, e.code))

    }
}