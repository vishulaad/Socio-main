import mongoose from "mongoose";

const relationshipsSchema = mongoose.Schema({
  followerID: {
    type: String,
    required: true,
  },
  followedID: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Relationship", relationshipsSchema);
