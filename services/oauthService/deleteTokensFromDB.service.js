const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = token => {
    const OAuthModel = db.getModel(DB_TABLE_NAME.OAUTH_TOKEN);

    OAuthModel.destroy({
        where: token
    })
}