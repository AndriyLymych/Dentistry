const Joi = require('joi');

const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const {commentValidator} = require('../../validators');
const {CustomError,CustomErrorData} = require('../../error');

module.exports = async (req, res, next) => {

    try {
        const {id} = req.params;
        const newComment = req.body;

        const comment = await commentService.getCommentById(id);

        if (!comment){
            throw new CustomError(
                ResponseStatusCodes.BAD_REQUEST,
                CustomErrorData.BAD_REQUEST_COMMENT_NOT_PRESENT.message,
                CustomErrorData.BAD_REQUEST_COMMENT_NOT_PRESENT.code,
            )
        }

        const editedComment = Joi.validate(newComment, commentValidator);

        if (editedComment.error) {
            throw new CustomError(editedComment.error.details[0].message, 400, 'editComment');
        }

        await commentService.updateComment(newComment, id);


        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e))

    }

}