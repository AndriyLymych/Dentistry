const {DB_TABLE_NAME} = require('../../constant');

const db = require('../../dataBase').getInstance();

module.exports = async reception => {
    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    const record = await ReceptionModel.create(reception,{raw:true});
    console.log(record);

    return record

}