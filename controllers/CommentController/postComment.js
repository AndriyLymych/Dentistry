const Joi = require('joi');

const {commentService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');
const {commentValidator} =require('../../validators');
const CustomError =require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const comment = req.body;
        const {user_id} =req.user;

        comment.user_id = user_id;

        const validatedComment = Joi.validate(comment, commentValidator);

        if (validatedComment.error) {
            throw new CustomError(validatedComment.error.details[0].message, 400, 'postComment');
        }

        await commentService.postComment(comment);

        res.status(ResponseStatusCodes.CREATED).end()

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message:e.message,
                controller:e.controller || 'postComment'
            })
    }

}