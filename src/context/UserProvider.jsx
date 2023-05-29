import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const Usercontext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if(user){
        const {email, photoURL, displayName, uid} = user
        setUser({email, photoURL, displayName, uid})
      }
      else{
        setUser(null)
      }
    });

    return ()=> unSuscribe();
  }, []);

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  return (
    <Usercontext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {props.children}
    </Usercontext.Provider>
  );
};

export default UserProvider;
