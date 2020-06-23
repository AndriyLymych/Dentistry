const {ResponseStatusCodes} = require('../../constant');
const {medicalFavourService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const services = await medicalFavourService.getAllMedicalServices();

        res.status(ResponseStatusCodes.CREATED).json(services);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }

}