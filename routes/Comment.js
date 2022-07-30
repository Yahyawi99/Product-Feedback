const express = require("express");
const router = express.Router();

const {
  createComment,
  createReply,
  editComment,
  editReply,
  deleteComment,
  deleteReply,
} = require("../controllers/Comment");

router
  .route("/feedbacks/comment/:id")
  .post(createComment)
  .delete(deleteComment);
router.route("/feedbacks/reply/:id").post(createReply).delete(deleteReply);

router.route("/feedbacks/comment/edit/:id").post(editComment);
router.route("/feedbacks/reply/edit/:id").post(editReply);

module.exports = router;
