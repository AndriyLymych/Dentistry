const {CustomError, CustomErrorData} = require('../../error');
const {PHOTO_PARAMS, ResponseStatusCodes} = require('../../constant');

module.exports = (req, res, next) => {

    req.photos = [];

    if (!req.files) {
        return next(new CustomError(
            ResponseStatusCodes.FORBIDDEN,
            CustomErrorData.FORBIDDEN_PHOTO_NOT_PRESENT.message,
            CustomErrorData.FORBIDDEN_PHOTO_NOT_PRESENT.code,
        ));
    }

    const files = Object.values(req.files);

    for (let i = 0; i < files.length; i++) {
        const {mimetype, size} = files[i];

        if (PHOTO_PARAMS.PHOTO_MIMETYPES.includes(mimetype)) {

            if (PHOTO_PARAMS.PHOTO_MAX_SIZE < size) {
                return next(new CustomError(
                    ResponseStatusCodes.FORBIDDEN,
                    CustomErrorData.FORBIDDEN_PHOTO_BIG_SIZE.message,
                    CustomErrorData.FORBIDDEN_PHOTO_BIG_SIZE.code,
                ));
            }

            req.photos.push(files[i])

        }
    }
    next()
};
