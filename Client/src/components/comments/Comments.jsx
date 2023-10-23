import { useContext } from "react";
import "./comments.scss";
import { AuthContext, PostContext } from "../../context/authContext";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

const Comments = (postID) => {
  const { currentUser } = useContext(AuthContext);

  const { comments, setComments } = useContext(PostContext);

  const [desc, setDesc] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const newcom = await axios.post("http://localhost:8800/api/comments/", { desc, postID, userID: currentUser._id });
    setComments((comments) => [...comments, newcom.data]);
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilepic} alt="" />
        <input type="text" placeholder="write a comment" onChange={(e) => setDesc(e.target.value)} value={desc} />
        <button onClick={handleClick}>Send</button>
      </div>
      {comments.map((comment) =>
        comment.postID === postID.postId ? (
          <div className="comment">
            <img src={currentUser.profilepic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdat).fromNow()}</span>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Comments;
