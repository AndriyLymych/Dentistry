const {ResponseStatusCodes} = require('../../constant');
const {receptionService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const {email} = req.query;

        const recordsForPatient = await receptionService.getAllReceptionRecords({email});

        res.status(ResponseStatusCodes.CREATED).json(recordsForPatient);

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "Get all reception records for patient"
            })
    }
}