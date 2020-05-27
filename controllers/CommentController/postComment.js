const Joi = require('joi');

const {commentService} = require('../../services');
const {ResponseStatusCodes,defaultCommentsLimit} = require('../../constant');
const {commentValidator} = require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const comment = req.body;
        const {user_id} = req.user;
        const {doc} = req.query;

        comment.user_id = user_id;
        comment.doctor_id = doc;

        const validatedComment = Joi.validate(comment, commentValidator);

        if (validatedComment.error) {
            throw new CustomError(validatedComment.error.details[0].message, 400, 'postComment');
        }

        await commentService.postComment(comment);

        const comments = await commentService.getAllComments(doc,defaultCommentsLimit.COMMENT_LIMIT);

        res.status(ResponseStatusCodes.CREATED).json(comments)

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message: e.message,
                controller: e.controller || 'postComment'
            })
    }

}