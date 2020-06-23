const {ResponseStatusCodes} = require('../../constant');
const {receptionService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const {email} = req.query;

        const recordsForPatient = await receptionService.getAllReceptionRecords({email});

        res.status(ResponseStatusCodes.CREATED).json(recordsForPatient);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}