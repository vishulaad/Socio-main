import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import { AuthContext, PostContext } from "../../context/authContext";
import moment from "moment";
import axios from "axios";

const Post = ({ post }) => {
  const { setPosts, posts } = useContext(PostContext);
  const { currentUser } = useContext(AuthContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  var likecount = 0;
  var ok = false;

  useEffect(() => {
    const fetch = async () => {
      const com = await axios.post("http://localhost:8800/api/likes", { post });
      setLikes(...likes, com.data);
    };
    fetch();
  }, []);

  if (likes.includes(currentUser._id)) ok = true;

  const handleLike = async (e) => {
    e.preventDefault();
    if (likes.length !== 0 && ok) {
      ok = false;
      const de = await axios.post("http://localhost:8800/api/likes/del", { postID: post._id, userID: currentUser._id });
      setLikes(likes.filter((item) => item !== de.data[0]));
    } else {
      ok = true;
      const newlike = await axios.post("http://localhost:8800/api/likes/like", { postID: post._id, userID: currentUser._id });
      setLikes(...likes, newlike.data);
    }
  };

  const Likes = () => {
    return ok ? (
      <div>
        <FavoriteOutlinedIcon onClick={handleLike} />
      </div>
    ) : (
      <div>
        <FavoriteBorderOutlinedIcon onClick={handleLike} />
      </div>
    );
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    if (post) {
      const de = await axios.delete("http://localhost:8800/api/posts/" + post._id, { postID: post._id });
      setPosts(posts.filter((item) => item._id !== de.data));
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={currentUser.profilepic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userID}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{currentUser.name}</span>
              </Link>
              <span className="date">{moment(post.createdat).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && <button onClick={handleDelete}>delete</button>}
        </div>
        <div className="content">
          <p>{post.postdesc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            <Likes />
            {likecount + likes.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Comment
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post._id} key={post._id} />}
      </div>
    </div>
  );
};

export default Post;
