import comment from "../models/comment.js"

export const getComment = async (req, res) => {
    try {
      const allComments = await comment.find();
      res.status(200).json(allComments);
    } 
    catch (er) {
      console.log(er);
    }
  };

  export const postComment = async (req, res) => {
    const {postID,userID,desc} = req.body;
    const {postId}=postID;
    const newComment = new comment({ desc, userID, postID:postId,createdat: new Date() });
    try {
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  