const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');

module.exports = (req, res, next) => {
    const photos = req.photos;
    const files = req.files;

    if (photos.length > 1) {
        return next(
            new CustomError('You can upload only one photo', ResponseStatusCodes.FORBIDDEN, 'photoCount.middleware')
        )
    }

    if (files.length) {
        return next(
            new CustomError('You can upload file', ResponseStatusCodes.FORBIDDEN, 'photoCount.middleware')
        )
    }

    next();

};