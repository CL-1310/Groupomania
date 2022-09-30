import {useRef, useState} from 'react'
import axios from "axios";
import Header from "../components/Header"
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const mailRef = useRef();
    const errRef = useRef();
    const [mail, setMail] = useState("");
    const [validMail, setValidMail] = useState(false);
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [setMatchPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [setSuccess] = useState(false);
    let navigate = useNavigate();
    const MAIL_REGEX = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/g
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


    const handleSubmit = async (e) => {
      e.preventDefault();
      const checkMail = MAIL_REGEX.test(mail);
      console.log(checkMail);
      if(checkMail === true){
        setValidMail(true)
      }
      const checkPassword = PWD_REGEX.test(pwd)
      console.log(checkPassword);
      if(checkPassword === true){
        setValidPwd(true)
      }
      if(checkMail === true && checkPassword === true){
        axios.post(
          "http://localhost:4000/api/auth/signup",
          { email:mail, password:pwd }
        ).then(()=>{
          setSuccess(true);
          setMail("");
          setPwd("");
          setMatchPwd("");
          navigate("/login");
        }).catch((err)=>{
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 409) {
            setErrMsg("Username Taken");
          } else {
            setErrMsg("Registration Failed");
          }
          errRef.current.focus();
        });
      }
      
    };

    return (
      <>
        <Header/>
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="usermail">
              Adresse mail:
            </label>
            <input
              type="mail"
              id="usermail"
              ref={mailRef}
              autoComplete="off"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              required
              aria-invalid={validMail ? "false" : "true"}
              aria-describedby="uidnote"
            />
            <p>
              4 à 24 caractères.
              <br />
              Doit commencer par une lettre.
              <br />
              Lettres, nombres, et tirets autorisés.
            </p>
              <label htmlFor="password">
              Mot de passe:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
            />
            <p
              id="pwdnote"
            >
            8 à 24 caractères.
              <br />
              Doit contenir des majuscules et des miniscules, un nombre et un caractère spécial.
              <br />
              Caractères authorisés:{" "}
              <span aria-label="exclamation mark">
                !
              </span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <button>
              S'inscrire
            </button>
          </form>
          <p>
            Déjà inscrit?
            <br />
            <span className="line">
            <Link to="/login">Se connecter</Link>
            </span>
          </p>
        </section>
      </>
    );
  };
  

export default Register;