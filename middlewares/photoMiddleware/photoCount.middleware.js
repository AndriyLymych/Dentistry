const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');

module.exports = (req, res, next) => {
    const photos = req.photos;

    if (photos.length > 1) {
        return next(new CustomError(
            ResponseStatusCodes.FORBIDDEN,
            CustomErrorData.FORBIDDEN_PHOTO_COUNT.message,
            CustomErrorData.FORBIDDEN_PHOTO_COUNT.code,
        ));
    }

    next();
};
