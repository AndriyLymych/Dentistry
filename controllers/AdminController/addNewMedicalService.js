const Joi = require('joi');
const uuid = require('uuid').v1();
const fs = require('fs-extra');
const {resolve} = require('path');

const {ResponseStatusCodes} = require('../../constant');
const {medicalFavourService} = require('../../services');
const {medicalServiceValidator} = require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res, next) => {
    try {
        const newService = req.body;
        const [photo] = req.photos;

        const appRoot = global.appRoot;

        const validatedService = Joi.validate(newService, medicalServiceValidator);

        if (validatedService.error) {
            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN, validatedService.error.details[0].message
            );
        }

        const {id} = await medicalFavourService.addMedicalService(newService);

        const serviceDir = `medicalService/${id}/avatar`;
        const avatarExt = photo.name.split('.').pop();
        const avatarName = `${uuid}.${avatarExt}`;

        await fs.mkdirpSync(resolve(appRoot, 'public', serviceDir));

        await photo.mv(resolve(appRoot, 'public', serviceDir, avatarName));

        await medicalFavourService.updateMedicalService({photo: `${serviceDir}/${avatarName}`}, id);

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}