const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async id => {
    const CommentModel = db.getModel(DB_TABLE_NAME.COMMENT);

    const comment = await CommentModel.findByPk(id, {raw: true});

    return comment

}