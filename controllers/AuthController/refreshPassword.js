const {mailerForChangePassword} = require('../../helpers');

module.exports = (req, res) => {
  mailerForChangePassword();

  res.end();
};
