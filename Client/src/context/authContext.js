import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const PostContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  
  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };
  const logout = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(res.data);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login,setCurrentUser,logout }}>{children}</AuthContext.Provider>;
};

export const PostContextProvider = ({ children }) => {
  
  const [posts,setPosts]=useState([]);
  const [rel,setRel]=useState([]);
  const [search,setSearch]=useState("");
  const [comments,setComments]=useState([]);

  useEffect(() => {
    const fetch = async ()=>
    {
      const res = await axios.post("http://localhost:8800/api/posts");
      setPosts(res.data);
      const res2 = await axios.get("http://localhost:8800/api/rel");
      setRel(res2.data);
      const com= await axios.get("http://localhost:8800/api/comments/");
      setComments(com.data);
    }
    fetch();
  }, []);

  // console.log(rels);

  return <PostContext.Provider value={{ posts,rel,setPosts, setRel,comments,setComments ,search,setSearch}}>{children}</PostContext.Provider>;
};
