const {ResponseStatusCodes} = require('../../constant');
const {receptionService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const {chat_id} = req.body;
        const {email} = req.query;

        await receptionService.setChatId({chat_id: chat_id}, email);

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