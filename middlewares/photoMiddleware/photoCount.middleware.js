const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');

module.exports = (req, res, next) => {
    const photos = req.photos;

    if (photos.length > 1) {
        return next(
            new CustomError('You can upload only one photo', ResponseStatusCodes.FORBIDDEN, 'photoCount.middleware')
        )
    }

    next();
};
