const CustomError = require('../../error/CustomError');
const {PHOTO_PARAMS} = require('../../constant');

module.exports = (req, res, next) => {

    req.photos = [];

    if (!req.files) {
        next()
    }

    const files = Object.values(req.files);

    for (let i = 0; i < files.length; i++) {
        const {mimetype, size} = files[i];

        if (PHOTO_PARAMS.PHOTO_MIMETYPES.includes(mimetype)) {

            if (PHOTO_PARAMS.PHOTO_MAX_SIZE < size) {
                return next(new CustomError(
                    `Max file size is ${PHOTO_PARAMS.PHOTO_MAX_SIZE / (1024 * 1024)}mb`,
                    400,
                    'photoFileChecker')
                )
            }

            req.photos.push(files[i])

        }
    }
    next()

}