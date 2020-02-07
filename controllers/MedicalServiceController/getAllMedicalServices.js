const {ResponseStatusCodes} = require('../../constant');
const {medicalFavourService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const services = await medicalFavourService.getAllMedicalServices();

        res.status(ResponseStatusCodes.CREATED).json(services);

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "Get all medical services"
            })
    }

}