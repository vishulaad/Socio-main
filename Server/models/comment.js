import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  desc: {
    type: String,
  },
  createdat: {
    type: String,
  },
  userID: {
    type: String,
  },
  postID: {
    type: String,
  },
});
export default mongoose.model("Comment", commentSchema);
