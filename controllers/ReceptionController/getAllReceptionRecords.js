const {ResponseStatusCodes} = require('../../constant');
const {receptionService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const records = await receptionService.getAllReceptionRecords();

        res.status(ResponseStatusCodes.CREATED).json(records);

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "Get all reception records"
            })
    }

}