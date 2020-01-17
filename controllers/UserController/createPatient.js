const fsExtra = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v1();
const Joi = require('joi');

const {USER_ROLE, USER_STATUS, GENDER} = require('../../constant');
const {userService} = require('../../services');
const {passwordHasher} =require('../../helpers');
const {userValidator} = require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const patient = req.body;
        // const [photo] = req.photos;
        //
        // const appRoot = global.appRoot;

        patient.role_id = USER_ROLE.PATIENT;
        patient.status_id = USER_STATUS.ACTIVE;
        patient.gender_id = GENDER.MALE;

        const validatedPatient = Joi.validate(patient, userValidator);
        if (validatedPatient.error) {
            throw new CustomError(validatedPatient.error.details[0].message, 400, 'Create Patient');
        }

        patient.password = await passwordHasher(patient.password);

        const {id} = await userService.createPatient(patient);

        // const avatarDir = `user/${id}/avatar`;
        // const avatarExt = photo.name.split('.').pop();
        // const avatarName = `${uuid}.${avatarExt}`;
        //
        // await fsExtra.mkdirSync(resolve(appRoot,'public',avatarDir),{recursive:true});
        // await photo.mv(resolve(appRoot, 'public', avatarDir, avatarName));
        // await userService.updateUserByParams({avatar: avatarDir},{id});

        res.status(201).end();
    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
};