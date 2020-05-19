const {ResponseStatusCodes} = require('../../constant');
const {genderService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const genders = await genderService.getAllGenders();

        res.status(ResponseStatusCodes.CREATED).json(genders);

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "Get all genders"
            })
    }

}