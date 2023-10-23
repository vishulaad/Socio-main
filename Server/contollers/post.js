import post from "../models/posts.js";

export const getPost = async (req, res) => {
  try {
    const allPosts = await post.find().sort({createdat:-1});
    res.status(200).json(allPosts);
  } catch (er) {
    console.log(er);
  }
};

export const createPost = async (req, res) => {
  const { desc, img,userID } = req.body;
  const newPost = new post({ postdesc:desc, img, userID, createdat: new Date() });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id=req.params.id;
  try {
    await post.deleteMany({_id:id });
    res.status(201).json(id);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
