const {commentService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        let filteredObj = {};
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
        next(new CustomError(e))

    }
};