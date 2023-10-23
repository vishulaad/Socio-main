import { useContext, useState } from "react";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import FileBase from "react-file-base64"

const Update = ({ setOpenupdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const { setCurrentUser } = useContext(AuthContext);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value][0] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const ID = user._id;
    const newuser = await axios.put("http://localhost:8800/api/users", { uuser: { ...texts, coverpic: cover, profilepic: profile }, ID });
    setCurrentUser(newuser.data);
    setOpenupdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={cover ? "" : cover} alt="" />
                {/* <CloudUploadIcon className="icon" /> */}
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setCover(base64)} />
              </div>
            </label>
          {/* </div>
          <div> */}
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={profile ? "" : profile} alt="" />
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setProfile(base64)} />
              </div>
            </label>
          </div>
          <label>Email</label>
          <input type="text" value={texts.email} name="email" onChange={handleChange} />
          <label>Password</label>
          <input type="text" value={texts.password} name="password" onChange={handleChange} />
          <label>Name</label>
          <input type="text" value={texts.name} name="name" onChange={handleChange} />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenupdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
