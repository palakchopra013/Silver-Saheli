import React from "react";

const UserContext = React.createContext(null);

export function UserProvider({children}){
  const [user,setUser] = React.useState(()=>{
    try { return JSON.parse(localStorage.getItem("ss_user")); } catch(e){ return null; }
  });

  React.useEffect(()=>{ localStorage.setItem("ss_user", JSON.stringify(user)); }, [user]);

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext;
