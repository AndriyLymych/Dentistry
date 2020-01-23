const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async id => {

    const CommentModel = db.getModel(DB_TABLE_NAME.COMMENT);

    await CommentModel.destroy({
        where: id
    })

}