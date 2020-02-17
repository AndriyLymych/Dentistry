const fsExtra = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v1();
const Joi = require('joi');


const {USER_ROLE, USER_STATUS, ResponseStatusCodes} = require('../../constant');
const {userService, emailService} = require('../../services');
const {passwordHasher} = require('../../helpers');
const {userValidator} = require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const doctor = req.body;
        // const [photo] = req.photos;
        //
        // const appRoot = global.appRoot;

        doctor.role_id = USER_ROLE.DOCTOR;
        doctor.status_id = USER_STATUS.ACTIVE;
        doctor.created_at = new Date().toISOString();

        const validatedDoctor = Joi.validate(doctor, userValidator);

        if (validatedDoctor.error) {
            throw new CustomError(validatedDoctor.error.details[0].message, 400, 'Create Patient');
        }

        doctor.password = await passwordHasher(doctor.password);

        const {id} = await userService.createUser(doctor);

        // const avatarDir = `user/${id}/avatar`;
        // const avatarExt = photo.name.split('.').pop();
        // const avatarName = `${uuid}.${avatarExt}`;
        //
        // await fsExtra.mkdirSync(resolve(appRoot,'public',avatarDir),{recursive:true});
        // await photo.mv(resolve(appRoot, 'public', avatarDir, avatarName));
        // await userService.updateUserByParams({avatar: avatarDir},{id});
        // await emailService.sendEmailForRegister(doctor.email,doctor.name,doctor.middleName);

        res.status(ResponseStatusCodes.CREATED).end();
    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
};