const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async params => {
    const OAuthModel = db.getModel(DB_TABLE_NAME.OAUTH_TOKEN);

    const searchObj = await OAuthModel.findOne({
        where: params,
        attributes: ['user_id']
    });

    return searchObj && searchObj.dataValues
}


