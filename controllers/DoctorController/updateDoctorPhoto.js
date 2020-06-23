const fs = require('fs-extra');
const {resolve} = require('path');
const uuid = require('uuid').v4();

const CustomError = require('../../error/CustomError');
const {userService} = require('../../services');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    try {
        const [photo] = req.photos;

        const {user_id: id} = req.user;

        const appRoot = global.appRoot;

        const photoDir = `doctor/${id}/avatar`;
        const photoExtension = photo.name.split('.').pop();
        const photoName = `${uuid}.${photoExtension}`;


        await fs.mkdirSync(resolve(appRoot, 'public', photoDir), {recursive: true});

        await photo.mv(resolve(appRoot, 'public', photoDir, photoName));

        await userService.updateUserByParams({
            avatar: `${photoDir}/${photoName}`
        }, id);

        res.status(ResponseStatusCodes.CREATED).json()

    } catch (e) {

        next(new CustomError(e.status, e.message, e.code))

    }
}