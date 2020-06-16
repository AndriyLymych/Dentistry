const {ResponseStatusCodes} = require('../../constant');
const {doctorRatingService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res, next) => {
    try {
        const {user_id} = req.user;
        const {doctor_id}=req.query;

        const isEvaluated = await doctorRatingService.getIsUserEvaluate(user_id,doctor_id);

        res.status(ResponseStatusCodes.CREATED).json(isEvaluated);

    } catch (e) {
        next(new CustomError(e))
    }
};