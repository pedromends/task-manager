import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { auth } from "../config/firebase-config";
import { Button } from "@mui/material";
import './style.css';

const AuthDetails = () => {

  const [authUser, setAuthUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: any) => {
      user ? setAuthUser(user) : setAuthUser(null);
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    firebase.auth().signOut().then(() => {
        window.localStorage.setItem('auth', 'false');
    }).catch((error) => console.log(error))
    .finally(()=>{
      navigate("/");
      window.location.reload()
    })
  };

  return (
    <div>
      {authUser ? (
        <div className="bar">
          <p>{`Signed In as ${authUser.email}`}</p>
          <Button onClick={userSignOut}>Sair</Button>
        </div>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;