const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async commentText => {

    const CommentModel = db.getModel(DB_TABLE_NAME.COMMENT);

    const newComment = await CommentModel.create(commentText);

    return newComment && newComment.dataValues

}