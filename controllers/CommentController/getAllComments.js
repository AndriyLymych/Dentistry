const {ResponseStatusCodes} = require('../../constant');
const {commentService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        console.log(comments);
        if (!comments) throw new CustomError(
            'Unfortunately there are any comments',
            ResponseStatusCodes.BAD_REQUEST,
            'getAllComments'
        );

        res.status(ResponseStatusCodes.CREATED).json(comments)

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "getAllComments"
            })
    }
}