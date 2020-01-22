const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async () => {
    const CommentModel = db.getModel(DB_TABLE_NAME.COMMENT);

    const comments = await CommentModel.findAll({raw: true});

    return comments
}