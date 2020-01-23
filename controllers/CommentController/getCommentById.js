const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;

        const comment = await commentService.getCommentById(id);

        if (!comment) throw new CustomError(
            'Unfortunately such comment is not present',
            ResponseStatusCodes.BAD_REQUEST,
            'getCommentById'
        );

        res.status(ResponseStatusCodes.CREATED).json(comment)

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "getCommentById"
            })
    }
}