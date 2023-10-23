import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, PostContext } from "../../context/authContext";
import "./rightBar.scss";

const RightBar = () => {
  const [users, setUsers] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { rel, setRel } = useContext(PostContext);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:8800/api/users");
      setUsers(res.data);
    };
    fetch();
  }, []);

  const handleFollow = async (e) => {
    e.preventDefault();
    const userID = e.target.value;
    if (!rel.includes(userID)) {
      const newrel = await axios.post("http://localhost:8800/api/rel", { userID, currentUser });
      setRel([...rel, newrel.data[0]]);
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    const userID = e.target.value;
    if (rel.includes(userID)) {
      const del = await axios.post("http://localhost:8800/api/rel/del", { userID, currentUser });
      try {
        setRel(rel.filter((item) => item !== del.data[0]));
      } catch (e) {
        setRel([]);
      }
    }
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {users.map(
            (user) =>
              user._id !== currentUser._id && (
                <div className="user">
                  <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="userInfo">
                      <img src={user.profilepic} alt=""></img>
                      <span>{user.name}</span>
                    </div>
                  </Link>
                  <div className="buttons">
                    <button onClick={handleFollow} value={user._id}>
                      follow
                    </button>
                    <button onClick={handleUnfollow} value={user._id}>
                      dismiss
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
