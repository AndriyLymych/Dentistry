const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res, next) => {

    const {id} = req.params;
    const {user_id} = req.user;

    const comment = await commentService.getCommentById(id);

    if (!comment) {

        return next(
            new CustomError('Such comment is not found', ResponseStatusCodes.FORBIDDEN, 'commentPresent.middleware')
        );
    }

    if (comment.user_id !== user_id) {

        return next(
            new CustomError('You can not edit this comment', ResponseStatusCodes.FORBIDDEN, 'commentPresent.middleware')
        );

    }
    next()

}