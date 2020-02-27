const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async (findObject = {}) => {
    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    return  ReceptionModel.findAll({
        where: findObject,
        raw: true,
        nest: true,
        include: [DB_TABLE_NAME.MEDICAL_SERVICE]
    });
};
