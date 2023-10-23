import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext, PostContext } from "../../context/authContext";
import FileBase from "react-file-base64";
import axios from "axios";

const Share = () => {
  const { posts, setPosts } = useContext(PostContext);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    const newpost = await axios.post("http://localhost:8800/api/posts/create", { desc, img: file, userID: currentUser._id });
    setPosts([newpost.data, ...posts]);
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilepic} alt="" />
            <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={(e) => setDesc(e.target.value)} value={desc} />
          </div>
          <div className="right">{file && <img className="file" alt="" src={file}></img>}</div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <FileBase type="file" id="filePicker"multiple={false} onDone={({ base64 }) => setFile(base64)}/>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
