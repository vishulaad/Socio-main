import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  coverpic: {
    type: String,
    // default:null
  },
  profilepic: {
    type: String,
    // default:null
  },
  city: {
    type: String,
    // default:null
  },
  website: {
    type: String,
    // default:null
  },
});
export default mongoose.model("User", userSchema);
