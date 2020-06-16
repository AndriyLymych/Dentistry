const Joi = require('joi');

const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const {commentValidator} =require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {

    try {
        const {id} = req.params;
        const newComment = req.body;

        const editedComment = Joi.validate(newComment,commentValidator);

        if (editedComment.error) {
            throw new CustomError(editedComment.error.details[0].message, 400, 'editComment');
        }

        await commentService.updateComment(newComment, id);


        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message: e.message,
                controller: e.controller || "editComment"
            })
    }

}