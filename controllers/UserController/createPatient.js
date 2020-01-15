const {USER_ROLE,USER_STATUS,GENDER} =require('../../constant');
const {userService} =require('../../services');
// const {passwordHasher} =require('../../helpers');

module.exports = async (req, res) => {
    try {

        const patient = req.body;

        // patient.password = await passwordHasher(patient.password);
        patient.role_id = USER_ROLE.PATIENT;
        patient.status_id = USER_STATUS.ACTIVE;
        patient.gender_id = GENDER.MALE;

        await userService.createPatient(patient);
        
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