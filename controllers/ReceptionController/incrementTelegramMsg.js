const {ResponseStatusCodes} = require('../../constant');
const {receptionService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const {chat_id} = req.query;

        await receptionService.incrementTelegramMsg({telegram_msg: 1}, chat_id);

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller || 'receptionPatient'
            })
    }
}