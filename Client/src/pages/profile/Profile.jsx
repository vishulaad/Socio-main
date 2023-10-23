import "./profile.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Posts from "../../components/posts/Posts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext, PostContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openupdate, setOpenupdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { rel, setRel } = useContext(PostContext);
  const userID = useLocation().pathname.split("/")[2];
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fun = async () => {
      const newuser = await axios.post("http://localhost:8800/api/users/find/" + userID, { userID: userID });
      setUser(newuser.data);
    };
    fun();
  }, []);

  const handleFollow = async (e) => {
    e.preventDefault();

    if (rel.includes(userID)) {
      const del = await axios.post("http://localhost:8800/api/rel/del", { userID, currentUser });
      setRel(rel.filter((item) => item !== del.data[0]));
    } else {
      const newrel = await axios.post("http://localhost:8800/api/rel", { userID, currentUser });
      setRel(...rel, newrel.data);
    }
  };

  return (
    <div className="profile">
      <div className="images">
        <img src={user.coverpic} alt="" className="cover" />
        <img src={user.profilepic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <PersonOutlineIcon />
            <span>{user.username}</span>
          </div>
          <div className="center">
            <span>{user.name}</span>
            <div className="info">
            </div>
            {userID === currentUser._id ? <button onClick={() => setOpenupdate(true)}>update</button> : <button onClick={handleFollow}>{rel.includes(userID) ? "Following" : "Follow"}</button>}
          </div>
          <div className="right">
            <AlternateEmailIcon />
            <span>{user.email}</span>
          </div>
        </div>
        {openupdate && <Update setOpenupdate={setOpenupdate} user={user} />}
        <Posts usr={userID} />
      </div>
    </div>
  );
};

export default Profile;
