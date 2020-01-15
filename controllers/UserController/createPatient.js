const fsExtra = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v1();

const {USER_ROLE, USER_STATUS, GENDER} = require('../../constant');
const {userService} = require('../../services');
// const {passwordHasher} =require('../../helpers');

module.exports = async (req, res) => {
    try {
        const patient = req.body;
        const [photo] = req.photos;
        const appRoot = global.appRoot;

        // patient.password = await passwordHasher(patient.password);
        patient.role_id = USER_ROLE.PATIENT;
        patient.status_id = USER_STATUS.ACTIVE;
        patient.gender_id = GENDER.MALE;

        const {id} = await userService.createPatient(patient);

        const avatarDir = `user/${id}/avatar`;
        const avatarExt = photo.name.split('.').pop();
        const avatarName = `${uuid}.${avatarExt}`;

        await fsExtra.mkdirSync(resolve(appRoot,'public',avatarDir),{recursive:true});
        await photo.mv(resolve(appRoot, 'public', avatarDir, avatarName));
        await userService.updateUserByParams({avatar: avatarDir},{id});

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