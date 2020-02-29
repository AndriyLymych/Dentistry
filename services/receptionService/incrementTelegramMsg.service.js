const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async (object, chat_id) => {
    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    await ReceptionModel.update(object, {
        where: {
            chat_id
        }
    })

}