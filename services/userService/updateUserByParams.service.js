const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports =  (params, obj) => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

     UserModel.update(params, {
        where: obj
    });

}