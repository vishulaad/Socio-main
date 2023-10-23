import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext, PostContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser,logout } = useContext(AuthContext);
  const { setSearch } = useContext(PostContext);
  const navigate = useNavigate();
  
  const handleLogout = async(e)=>{
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (ee) {
      console.log(ee.response.data.message);
    }
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socio</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="right">
        <div className="user">
          <img src={currentUser.profilepic} alt="" />
          <Link to={`/profile/${currentUser._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <span className="name">{currentUser.name}</span>
          </Link>
        </div>
        <div classname="logout">
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
