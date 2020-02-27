const {ResponseStatusCodes} = require('../../constant');
const {queryParser} = require('../../helpers');
const {receptionService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const parsedQuery = queryParser(req.query);
        const records = await receptionService.getAllReceptionRecords(parsedQuery);

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
