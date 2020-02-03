const {emailService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res) => {
    try {
        await emailService.sendEmailForChangePassword();

        res.ResponseStatusCodes.CREATED.end();
    } catch (e) {
        res
            .status(ResponseStatusCodes.BAD_REQUEST)
            .json({
                message: e.message,
                controller: e.controller
            })
    }
};
