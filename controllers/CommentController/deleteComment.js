const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;

        await commentService.deleteComment({id});

        const comments = await commentService.getAllComments();

        res.status(ResponseStatusCodes.CREATED).json(comments);

    } catch (e) {
        res
            .status(ResponseStatusCodes.FORBIDDEN)
            .json({
                message: e.message,
                controller: e.controller || "deleteComment"
            })
    }

}