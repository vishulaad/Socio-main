import user from "../models/user.js";

export const getUser = async (req, res) => {
  const { userID } = req.body;
  try {
    const User = await user.find({ _id: userID });
    res.status(200).json(User[0]);
  } catch (er) {
    console.log(er);
  }
};

export const allUser = async (req, res) => {
  try {
    const User = await user.find();
    res.status(200).json(User);
  } catch (er) {
    console.log(er);
  }
};

export const updateUser = async (req, res) => {
  const { uuser } = req.body;
  const { ID } = req.body;
  try {
    const updatedPost = await user.findByIdAndUpdate(ID, { ...uuser, ID }, { new: true });
    // console.log(ID)
    // console.log(updatedPost);
    res.json(updatedPost);
  } catch (er) {
    console.log(er);
  }
};
