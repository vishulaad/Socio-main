import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
  userID: {
    type:String,
  },
  postID: {
    type:String,
  },
});
export default mongoose.model("lik", likesSchema);
