const {ResponseStatusCodes} = require('../../constant');
const {medicalFavourService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;

        const service = await medicalFavourService.getMedicalServiceById(id);

        if (!service) {
            throw new CustomError('Such service is not present', ResponseStatusCodes.NOT_FOUND, 'getMedicalServiceById')
        }

        res.json(service)

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message: e.message,
                controller: e.controller || "getMedicalServiceById"
            })
    }

}