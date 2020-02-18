const Sequelize = require('sequelize');

const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async doctor_id => {
    const CommentModel = db.getModel(DB_TABLE_NAME.COMMENT);

    const count = await CommentModel.findOne({
        where: {doctor_id},
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('doctor_id')), 'comments_count']],
        raw: true
    });

    return count

};