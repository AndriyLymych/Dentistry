const {ResponseStatusCodes} = require('../../constant');
const {medicalFavourService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;

        await medicalFavourService.deleteMedicalService({id});

        const [services] = await medicalFavourService.getAllMedicalServices();

        res.json(services);

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
}