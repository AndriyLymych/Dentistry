// const {ResponseStatusCodes} = require('../../constant');
// const {adminService} = require('../../services');
//
// module.exports = async (req, res) => {
//     try {
//         const newService = req.body;
//
//         await adminService.addMedicalService(newService);
//
//         res.status(ResponseStatusCodes.CREATED).end();
//
//     } catch (e) {
//         res
//             .status(ResponseStatusCodes.FORBIDDEN)
//             .json({
//                 message: e.message,
//                 controller: e.controller
//             })
//     }
// }