const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = user_id => {
    const OAuthModel = db.getModel(DB_TABLE_NAME.ACTION_TOKEN);

    OAuthModel.destroy({
        where: {
            user_id
        }
    })
}