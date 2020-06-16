const {ResponseStatusCodes} = require('../../constant');
const {doctorRatingService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res, next) => {
    try {
        const {doctor_id} = req.query;

        const avgMark = await doctorRatingService.getAVGDoctorMark(doctor_id);

        res.status(ResponseStatusCodes.CREATED).json(avgMark);

    } catch (e) {
        next(new CustomError(e))
    }
};