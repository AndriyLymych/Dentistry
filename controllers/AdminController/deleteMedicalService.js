const {ResponseStatusCodes} = require('../../constant');
const {medicalFavourService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;

        await medicalFavourService.deleteMedicalService({id});

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
}