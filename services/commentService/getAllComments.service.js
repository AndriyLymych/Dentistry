const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async (doctor_id, limit, offset) => {
    const CommentModel = db.getModel(DB_TABLE_NAME.COMMENT);
    const UserModel = db.getModel(DB_TABLE_NAME.USER);


    const comments = await CommentModel.findAll(
        {
            where: {doctor_id},
            include: [{
                model: UserModel,
                as:'Doctor',
                attributes: ['id', 'name', 'surname'],
            },
                {
                    model:UserModel,
                    as:'Commentator',
                    attributes:['id','name','surname','avatar']
                }
                ],
            order:[
                ['id', 'DESC']
            ],
            limit,
            offset,
        }
    );

    return comments

}