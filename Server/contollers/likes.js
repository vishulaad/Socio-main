import lik from "../models/likes.js";

export const getLikes = async (req, res) => {
  const { post } = req.body;
  try {
    const allLikes = await lik.find({ postID: post._id });
    res.status(200).json(allLikes.map((like) => like.userID));
  } catch (er) {
    console.log(er);
  }
};

export const addLike = async (req, res) => {
  const { postID, userID } = req.body;
  const newLike = new lik({ postID, userID });
  try {
    await newLike.save();
    res.status(201).json([userID]);
  } catch (er) {
    console.log(er);
  }
};

export const delLike = async (req, res) => {
  const { postID, userID } = req.body;
  try {
    await lik.deleteMany({ postID, userID });
    res.status(201).json([userID]);
  } catch (er) {
    console.log(er);
  }
};
