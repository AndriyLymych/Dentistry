const Op = require('sequelize').Op;

const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async name => {

    const UserModel = db.getModel(DB_TABLE_NAME.USER);
    const UserStatusModel = db.getModel(DB_TABLE_NAME.USER_STATUS);

    const users = await UserModel.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                {
                    surname: {
                        [Op.like]: `%${name}%`
                    }
                }
            ]
        },
        attributes: ['id', 'name', 'surname'],
        include: [{
            model: UserStatusModel,
            attributes: ['label']
        }],
        raw: true
    });
    return users

};