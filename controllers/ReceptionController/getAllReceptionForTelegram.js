const {ResponseStatusCodes, USER_ROLE} = require('../../constant');
const {queryParser} = require('../../helpers');
const {receptionService} = require('../../services');
const {CustomError} = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const parsedQuery = queryParser(req.query);

        const records = await receptionService.getAllReceptionRecords(parsedQuery);

        res.status(ResponseStatusCodes.CREATED).json(records);

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
};
