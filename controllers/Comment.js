const Feedback = require("../model/Feedback");
const { StatusCodes } = require("http-status-codes");
const generateUniqueId = require("generate-unique-id");

// create comments
const createComment = async (req, res) => {
  const { id } = req.params;
  const { content, user } = req.body;

  const _id = generateUniqueId({
    length: 24,
    useLetters: true,
    useNumbers: true,
  });

  const myComment = { _id, content, user };

  const feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    { $push: { comments: myComment } },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.CREATED).json(feedback);
};

// edit comments
const editComment = async (req, res) => {
  const { commentId, newContent } = req.body;
  const { id } = req.params;

  let feedback = await Feedback.findOne({ _id: id }, { comments: 1, _id: 0 });

  const newComments = feedback.comments.map((e) => {
    if (e._id === commentId) {
      e.content = newContent;
      return e;
    }
    return e;
  });

  feedback = await Feedback.findByIdAndUpdate(
    { _id: id },
    {
      $set: { comments: newComments },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json(feedback);
};

// delete comment
const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const { id } = req.params;

  let feedback = await Feedback.findOne({ _id: id }, { comments: 1, _id: 0 });

  const newComments = feedback.comments.filter((e) => e._id !== commentId);

  feedback = await Feedback.findByIdAndUpdate(
    { _id: id },
    {
      $set: { comments: newComments },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json(feedback);
};

/***************************/

// create replies
const createReply = async (req, res) => {
  const {
    commentId,
    reply: { content, user },
    replyingTo,
  } = req.body;
  const { id } = req.params;

  let feedback = await Feedback.findOne({ _id: id }, { comments: 1, _id: 0 });

  // generate random ID
  const randomIm = generateUniqueId({
    length: 24,
    useLetters: true,
    useNumbers: true,
  });

  // create my reply
  const myReply = {
    _id: randomIm,
    content,
    replyingTo,
    user,
  };

  const newComments = feedback.comments.map((e) => {
    if (e._id === commentId) {
      if (Object.keys(e).includes("replies")) {
        e.replies.push(myReply);
      } else {
        e.replies = [myReply];
      }
      return e;
    }
    return e;
  });

  feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    { $set: { comments: newComments } },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json(feedback);
};

// edit replies
const editReply = async (req, res) => {
  const { commentId, replyId, newContent } = req.body;
  const { id } = req.params;

  let feedback = await Feedback.findOne({ _id: id }, { comments: 1, _id: 0 });

  const newComments = feedback.comments.map((e) => {
    if (e._id === commentId) {
      e.replies.map((e) => {
        if (e._id === replyId) {
          e.content = newContent;
          return e;
        }
        return e;
      });
      return e;
    }
    return e;
  });

  feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    {
      $set: { comments: newComments },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json(feedback);
};

// delete reply
const deleteReply = async (req, res) => {
  const { commentId, replyId } = req.body;
  const { id } = req.params;

  let feedback = await Feedback.findOne({ _id: id }, { comments: 1, _id: 0 });

  const newComments = feedback.comments.map((e) => {
    if (e._id === commentId) {
      e.replies = e.replies.filter((e) => e._id !== replyId);
      return e;
    }
    return e;
  });

  feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    {
      $set: { comments: newComments },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json(feedback);
};

module.exports = {
  createComment,
  createReply,
  editComment,
  editReply,
  deleteComment,
  deleteReply,
};
