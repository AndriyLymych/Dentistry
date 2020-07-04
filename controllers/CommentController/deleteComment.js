const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const {CustomErrorData,CustomError} = require('../../error');

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

        await commentService.deleteComment({id});

        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {

        next(new CustomError(e.status, e.message, e.code))

    }

};