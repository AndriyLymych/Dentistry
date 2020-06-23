const Joi = require('joi');

const CustomError = require('../../error/CustomError');
const {updateUserValidator} = require('../../validators');
const {userService}= require('../../services');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    try {
        const updatedUser = req.body;

        const {user_id:id} = req.user;

        const validatedUpdatedUser = Joi.validate(updatedUser, updateUserValidator);

        if (validatedUpdatedUser.error) {
            throw new CustomError(validatedUpdatedUser.error.details[0].message, 400, 'Update user profile');
        }

        await userService.updateUserByParams({
            name: updatedUser.name,
            middleName: updatedUser.middleName,
            surname: updatedUser.surname,
            age: updatedUser.age,
            city: updatedUser.city

        }, id);

        res.status(ResponseStatusCodes.CREATED).end()
    } catch (e) {
        next(new CustomError(e.status, e.message, e.code))
    }
}