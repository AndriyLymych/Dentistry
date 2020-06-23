const {ResponseStatusCodes} = require('../../constant');
const {receptionService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const {chat_id} = req.body;
        const {email} = req.query;

        await receptionService.setChatId({chat_id: chat_id}, email);

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))

    }
}