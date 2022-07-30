const Feedback = require("../model/Feedback");
const { StatusCodes } = require("http-status-codes");

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find();
  res.status(StatusCodes.OK).json({ feedbacks, hits: feedbacks.length });
};

// get one feedback
const getOneFeedback = async (req, res) => {
  const { id } = req.params;
  const feedback = await Feedback.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ feedback });
};

// create a feedback
const addFeedback = async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res.status(StatusCodes.CREATED).json(feedback);
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  const feedback = await Feedback.findOneAndDelete({ _id: id });

  res.status(StatusCodes.OK).json(feedback);
};

// update feedback
const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json(feedback);
};

module.exports = {
  getAllFeedbacks,
  getOneFeedback,
  addFeedback,
  deleteFeedback,
  updateFeedback,
};
