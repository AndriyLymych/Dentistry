const {ResponseStatusCodes} = require('../../constant');
const {genderService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const genders = await genderService.getAllGenders();

        res.status(ResponseStatusCodes.CREATED).json(genders);

    } catch (e) {
        next(new CustomError(e))

    }

}