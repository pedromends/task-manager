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
    });
  };

  return (
    <div>
      {authUser ? (
        <div className="bar">
          <div style={{display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '1rem'}}>
            <img src="./assets/hourglass.svg" style={{width: '3rem'}} alt="" />
            <p style={{pointerEvents: 'none'}}>The Hourglass</p>
          </div>
          <div className="log" style={{display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '10px'}}>
            <p>{`Logado como ${authUser.email}`}</p>
            <Button onClick={userSignOut} sx={{backgroundColor: 'rgba(168,204,204,1)', color: '#006666', ":hover":{backgroundColor: 'rgba(240,247,247,1)'}}}>Sair</Button>
          </div>
        </div>
      ) : (
        <p>Sair</p>
      )}
    </div>
  );
};

export default AuthDetails;