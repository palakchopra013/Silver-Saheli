import { useContext } from "react";
import UserContext from "../context/usercontext";

export default function useAuth(){
  const { user, setUser } = useContext(UserContext);

  function login(payload){
    setUser(payload);
  }
  function logout(){
    setUser(null);
    localStorage.removeItem("ss_user");
  }
  return { user, login, logout };
}
