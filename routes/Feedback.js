const express = require("express");
const {
  getAllFeedbacks,
  getOneFeedback,
  addFeedback,
  deleteFeedback,
  updateFeedback,
} = require("../controllers/Feedback");

const router = express.Router();

router.route("/feedbacks").get(getAllFeedbacks).post(addFeedback);
router
  .route("/feedbacks/:id")
  .get(getOneFeedback)
  .delete(deleteFeedback)
  .put(updateFeedback);

module.exports = router;
