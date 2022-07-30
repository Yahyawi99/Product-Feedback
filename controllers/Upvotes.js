const Feedback = require("../model/Feedback");
const { StatusCodes } = require("http-status-codes");

const increment = async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    { $inc: { upvotes: 1 }, $set: { plus: true } },
    { new: true }
  );

  res.status(StatusCodes.OK).json(feedback);
};

const decrement = async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    { $inc: { upvotes: -1 }, $set: { plus: false } },
    { new: true }
  );

  res.status(StatusCodes.OK).json(feedback);
};

module.exports = { increment, decrement };
