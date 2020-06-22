const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const {CustomError,CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        const comment = await commentService.getCommentById(id);

        if (!comment) {
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_COMMENT_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_COMMENT_NOT_PRESENT.code,
            )
        }

        res.status(ResponseStatusCodes.CREATED).json(comment)

    } catch (e) {
        next(new CustomError(e))

    }
};