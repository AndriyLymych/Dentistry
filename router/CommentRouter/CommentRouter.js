const router = require('express').Router();

const {commentController} = require('../../controllers');
const {authMiddleware} = require('../../middlewares');

router.get('/doctors/:doctor_id', commentController.getAllCommentsForEveryDoctor);
router.get('/:id', commentController.getCommentById);

router.post(
    '/',
    authMiddleware.accessTokenChecker,
    authMiddleware.getUserFromAccessToken,
    commentController.postComment
);

router.use(
    '/:id',
    authMiddleware.accessTokenChecker,
    authMiddleware.getUserFromAccessToken,
);

router.put('/:id', commentController.editComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;