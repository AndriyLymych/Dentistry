const {ResponseStatusCodes, USER_ROLE} = require('../../constant');
const {receptionService, userService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {

        const {user_id} = req.user;

        const {record_id:id} = req.params;

        const {role_id} = await userService.getUserById(user_id);
        const isRecordPresent = await receptionService.getReceptionRecordById(id);

        if (role_id !== USER_ROLE.DOCTOR ){
            throw new CustomError('You are not a doctor',ResponseStatusCodes.FORBIDDEN,'delete reception record by doctor')
        }
        if (!isRecordPresent){
            throw new CustomError('Not such record',ResponseStatusCodes.FORBIDDEN,'delete reception record by doctor')
        }
            await receptionService.deleteReceptionRecordByDoctor(id);


        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "delete reception record by doctor"
            })
    }
}