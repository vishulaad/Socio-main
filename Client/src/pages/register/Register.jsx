import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios"
import FileBase from "react-file-base64"

const Register = () => {

  const [inputs,setInputs]=useState({
    username:"",
    email:"",
    password:"",
    name:"",
    website:"",
    city:""
  })

  const [err,setErr]=useState(null);

  const navigate=useNavigate();
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const handleChange = e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  };

  const handleClick = async e=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/api/auth/register",{...inputs,profilepic:profile,coverpic:cover});
      navigate("/login")
      setInputs({
        username:"",
        email:"",
        password:"",
        name:"",
      })
      setCover(null)
      setProfile(null);
    }catch(er)
    {
      // console.log(er.response.data.message);
      setErr(er.response.data.message);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1> svvv socio!</h1>
          <p>
          Join us and become part of a vibrant online community where you can connect, collaborate, and contribute to the spirit of innovation at SVVV. Register now and discover the possibilities that await you.
            
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={cover ? "" : cover} alt="" />
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setCover(base64)} />
              </div>
            </label>
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={profile ? "" : profile} alt="" />
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setProfile(base64)} />
              </div>
            </label>
          </div>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} value={inputs.username}/>
            <input type="email" placeholder="Email"  name="email" onChange={handleChange} value={inputs.email}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}  />
            <input type="text" placeholder="Name"  name="name" onChange={handleChange} value={inputs.name}/>
            {err&&err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
