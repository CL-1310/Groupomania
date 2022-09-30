import {useRef, useState, useEffect, useContext} from 'react'
import axios from "axios";  
import {userContext} from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header/index";
// import {userId, token} from ""

const Login = () => {
    // const mailRef = useRef();
    // const errRef = useRef();
    const [mail, setMail] = useState("");
    const [validMail, setValidMail] = useState(false);
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    let navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(userContext);
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.usermail.value,e.target.password.value)
        if(setMail(e.target.usermail.value) === true){
          setValidMail(true)
        }
        if(setPwd(e.target.password.value) === true){
          setValidPwd(true)
        }
        console.log(mail,pwd)
        axios.post(
            "http://localhost:4000/api/auth/login",
            { email:mail, password:pwd }
        ).then(response=>{
          setSuccess(true);
          console.log(response.data);
          localStorage.setItem('userConnected',`${response.data.userId}`);
          localStorage.setItem('userToken',`${response.data.token}`);
          setCurrentUser(`${response.data.userId}`);
          navigate("/");
        }).catch((err)=>{
          console.log(err)
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 409) {
            setErrMsg("Identifiant ou mot de passe incorrect");
          }
        });
    }

      return (
        <>
          <Header/>
          <section>
            <p
              // ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="usermail">
                Adresse mail:
              </label>
              <input
                type="mail"
                id="usermail"
                name="usermail"
                // ref={mailRef}
                autoComplete="off"
                onChange={(e) => setMail(e.target.value)}
                value={mail}
                required
                aria-invalid={validMail ? "false" : "true"}
                aria-describedby="uidnote"
              />
              <p>
              </p>
                <label htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
              />
              <button>
                Se connecter
              </button>
            </form>
          </section>
        </>
)}

export default Login