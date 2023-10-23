import rels from "../models/relationships.js";

export const getRel = async (req, res) => {
  try {
    const allRels = await rels.find();
    res.status(200).json(allRels.map((rel) => rel.followedID));
  } catch (er) {
    console.log(er);
  }
};

export const addRel = async (req, res) => {
  const { currentUser, userID } = req.body;
  const newRel = new rels({ followedID: userID, followerID: currentUser._id });
  try {
    await newRel.save();
    res.status(201).json([userID]);
  } catch (er) {
    console.log(er);
  }
};

export const delRel = async (req, res) => {
  const { currentUser, userID } = req.body;
  try {
    await rels.deleteMany({ followedID: userID, followerID: currentUser._id });
    res.status(201).json([userID]);
  } catch (er) {
    console.log(er);
  }
};
