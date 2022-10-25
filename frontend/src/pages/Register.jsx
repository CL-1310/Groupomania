import {useState} from 'react'
import axios from "axios";
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import { useNavigate, Link } from 'react-router-dom';
import "../sass/main.css"
import 'typeface-lato';


const Register = () => {
    const [mail, setMail] = useState("");
    const [validMail, setValidMail] = useState(false);
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [matchPwd, setMatchPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    let navigate = useNavigate();
    const MAIL_REGEX = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/g
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


    const handleSubmit = async (e) => {
      e.preventDefault();
      const checkMail = MAIL_REGEX.test(mail);
      if(checkMail === true){
        setValidMail(true)
      }
      const checkPassword = PWD_REGEX.test(pwd)
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
        });
      }
      
    };

    return (
      <>

          <main>
          
            <MenuBurger/>
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
              
          </main> 
      </>
    );
  };
  

export default Register;