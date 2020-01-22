const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async (id, user_id) => {

    const CommentModel = db.getModel(DB_TABLE_NAME.COMMENT);

    // CommentModel.update({
    //         commentText
    //     },
    //     {
    //         where: {
    //             id,
    //             user_id
    //         }
    //     }
    // )

}