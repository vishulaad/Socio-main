import mongoose from "mongoose";

const storiesSchema = mongoose.Schema({
  img: {
    type: String,
  },
  userID: {
    type: String,
  },
});
export default mongoose.model("Story", storiesSchema);
