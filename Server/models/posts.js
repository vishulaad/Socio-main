import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  createdat: {
    type: Date,
  },
  userID: {
    type: String,
  },
  postdesc: {
    type: String,
  },
  img: {
    type: String,
  },
});
export default mongoose.model("Post", postSchema);
