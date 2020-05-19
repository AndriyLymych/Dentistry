const {ResponseStatusCodes} = require('../../constant');
const {commentService, userService} = require('../../services');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res) => {
    try {
        let filteredObj={};
        const {doctor_id} = req.params;
        let {limit, page} = req.query;

        if (+page === 0) page = 1;
        page = page - 1;

        const commentCount = await commentService.commentCountForDoctor(doctor_id);
        const comments = await commentService.getAllComments(
            doctor_id,
            +(limit),
            limit * page
        );

        filteredObj.comments = comments;
        filteredObj.pageCount = Math.ceil(commentCount.comments_count / limit);

        res.json(filteredObj)

    } catch (e) {
        res
            .status(ResponseStatusCodes.NOT_FOUND)
            .json({
                message: e.message,
                controller: e.controller || "getAllComments"
            })
    }
};