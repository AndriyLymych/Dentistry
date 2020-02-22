const {DB_TABLE_NAME:{ACTION_TOKEN}} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = token => {
    const ActionTokenModel = db.getModel(ACTION_TOKEN);

    ActionTokenModel.create(token);

}