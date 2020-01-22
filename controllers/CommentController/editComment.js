const {ResponseStatusCodes} =require('../../constant');
const {commentService} = require('../../services');

module.exports = async (req, res) => {
    try {
        // const {id} =req.params;
        // const {user_id} = req.user;
        //
        // await commentService.updateComment(id)

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "getAllComments"
            })
    }

}