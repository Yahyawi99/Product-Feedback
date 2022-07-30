const express = require("express");
const router = express.Router();

const { authenticate } = require("../controllers/Auth");

router.route("/auth/google").post(authenticate);

module.exports = router;
