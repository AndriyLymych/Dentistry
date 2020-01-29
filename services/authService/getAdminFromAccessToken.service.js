const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async params => {

    const OAuthModel = db.getModel(DB_TABLE_NAME.OAUTH_TOKEN);
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    const searchObj = await OAuthModel.findOne({
        where: params,
        include: [{
            model: UserModel,
            attributes : ['role_id']
        }]
    });

    return searchObj && searchObj.dataValues
}


