import {useState} from 'react'
import axios from "axios";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate, Link } from 'react-router-dom';
import "../sass/main.css"
import 'typeface-lato';
// import DefaultAvatar from './user-default.jpg';


const Register = () => {
    const [mail, setMail] = useState("");
    const [validMail, setValidMail] = useState(false);
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [matchPwd, setMatchPwd] = useState("");
    // const [birthdate, setBirthdate] = useState("")
    // const [department, setDepartment] = useState("")
    // const [username, setUsername] = useState("")
    // const [userAvatarInput, setUserAvatarInput] = useState();
    // const [avatar, setAvatar] = useState();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    let navigate = useNavigate();
    const MAIL_REGEX = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/g
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


    // const handleUserAvatar = (e) => {
    //   e.preventDefault();
    //   setUserAvatarInput(e.target.value)
    //   setAvatar(e.target.files[0])
    // }
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
      // if (avatar === ""){
      //   setUserAvatarInput(DefaultAvatar)
      // }
      if(checkMail === true && checkPassword === true){
        axios.post(
          "http://localhost:4000/api/auth/signup",
          { email:mail, password:pwd }
        ).then(()=>{
          setSuccess(true);
          setMail("");
          setPwd("");
          setMatchPwd("");
          // setUsername("");
          // setDepartment("");
          // setBirthdate("");
          navigate("/login");
        }).catch((err)=>{
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 409) {
            setErrMsg("Username Taken");
          } else {
            setErrMsg("Registration Failed");
          }
        });
      }
      
    };

    return (
      <>
        <Header/>

          <div className='register_background'>
            <div className='register_container'>

              <h1>S'inscrire</h1>
                          
              <section>
                <form onSubmit={handleSubmit} className='register_form' encType="multipart/form-data">
                  <label htmlFor="usermail" className='register_mail'>
                    <i className='bi bi-envelope-fill'></i> Adresse mail :
                  </label>
                  <div className='register_mail-input'>
                    <input
                      type="mail"
                      id="usermail"
                      autoComplete="on"
                      onChange={(e) => setMail(e.target.value)}
                      value={mail}
                      required
                      aria-invalid={validMail ? "false" : "true"}
                    />
                    <div className='register_mail-requirements'>
                      <ul>
                        <li>
                          4 à 24 caractères.
                        </li>
                        <li>
                          Doit commencer par une lettre.
                        </li>
                        <li>
                          Lettres, nombres, et tirets autorisés.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <label htmlFor="password" className='register_password'>
                    <i className='bi bi-key-fill'></i> Mot de passe :
                  </label>
                  <div className='register_password-input'>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                    />
                    <div className='register_password-requirements'>
                      <ul>
                        <li>
                          8 à 24 caractères.
                        </li>
                        <li>
                          Doit contenir des majuscules, des miniscules, un nombre et un caractère spécial.
                        </li>
                        <li>
                          Caractères authorisés: @$%#!
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button className='register_button-register'>
                    S'inscrire
                  </button>
                </form>
                <div className='register_button-login-container'>
                  <p>
                    Déjà inscrit?
                  </p>
                  <button className='register_button-login'>
                    <Link to="/login"> Se connecter </Link>
                  </button>
                </div>
              </section>
            </div>
          </div>
          <Footer/>
      </>
    );
  };
  

export default Register;