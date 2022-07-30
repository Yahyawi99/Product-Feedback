const express = require("express");
const router = express.Router();

const { increment, decrement } = require("../controllers/Upvotes");

router.route("/feedbacks/upvotes/increment/:id").post(increment);
router.route("/feedbacks/upvotes/decrement/:id").post(decrement);

module.exports = router;
