const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async id => {

    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    await ReceptionModel.destroy({
        where: {
            id
        }
    })

}