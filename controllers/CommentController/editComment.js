const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;
        const {user_id} = req.user;
        const comment = await commentService.getCommentById(id);

        const newComment = req.body;

        if (!comment) throw new CustomError('Such comment is not found', ResponseStatusCodes.FORBIDDEN, 'editComment');

        if (comment.user_id !== user_id) {
            throw new CustomError('You can not edit this comment', ResponseStatusCodes.FORBIDDEN, 'editComment');

        }


        await commentService.updateComment(newComment, id);

        res.status(200).end();

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message: e.message,
                controller: e.controller || "editComment"
            })
    }

}