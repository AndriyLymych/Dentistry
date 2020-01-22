const {commentController} = require('../../controllers');
const {authMiddleware} = require('../../middlewares');



const router = require('express').Router();

router.get('/', commentController.getAllComments);
router.post(
    '/',
    authMiddleware.accessTokenChecker,
    authMiddleware.getUserFromAccessToken,
    commentController.postComment
);

// router.use('/',)
// router.put('/',commentController.editComment);
// router.delete('/',commentController.deleteComment);

module.exports = router;