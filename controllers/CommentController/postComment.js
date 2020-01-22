const {commentService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res) => {
    try {
        const comment = req.body;
        const {user_id} =req.user;

        comment.user_id = user_id;

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