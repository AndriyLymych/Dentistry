const {oauthService} = require('../../services');
const {ResponseStatusCodes}=require('../../constant');

module.exports = async (req,res)=>{
    try {
        const token = req.get('Authorization');

        await oauthService.deleteTokensFromDB({access_token:token});

        res.status(ResponseStatusCodes.GONE).end()

    } catch (e) {
        res
            .status(e.status)
            .json({
                message: e.message,
                controller: e.controller || "logoutUser"
            })
    }
}