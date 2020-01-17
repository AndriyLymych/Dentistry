const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../constant');

module.exports = () => {

    const access_token = jwt.sign({}, JWT_SECRET.JWT_SECRET_ACCESS, {expiresIn: '10d'});
    const refresh_token = jwt.sign({}, JWT_SECRET.JWT_SECRET_REFRESH, {expiresIn: '90d'});

    return {
        access_token,
        refresh_token
    }

}