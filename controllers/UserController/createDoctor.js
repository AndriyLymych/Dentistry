// const {HASH_PASSWORD, CHECK_HASH} = require('../../helpers/passwordHasher');
// const {userService} = require('../../services');
// const {ResponseStatusCodesEnum, USER_ROLE} = require('../../constant');
//
// module.exports = async (req, res, next) => {
//     const doctor = req.body;
//     // TODO validate user object with Joi
//
//     // doctor.password = await HASH_PASSWORD(doctor.password);
//     await userService.createDoctor(doctor);
//
//     res.status(ResponseStatusCodesEnum.CREATED).end()
// };
