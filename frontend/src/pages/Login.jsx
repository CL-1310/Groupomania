import {useState, useContext} from 'react'
import axios from "axios";  
import {userContext} from "../context/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/Header/index";
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import "../sass/main.css"
import 'typeface-lato';


const Login = () => {
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
      if(setMail(e.target.usermail.value) === true){
        setValidMail(true)
      }
      if(setPwd(e.target.password.value) === true){
        setValidPwd(true)
      }
      axios.post(
          "http://localhost:4000/api/auth/login",
          { email:mail, password:pwd }
      ).then(response=>{
        setSuccess(true);
        localStorage.setItem('userConnected',`${response.data.userId}`);
        localStorage.setItem('userToken',`${response.data.token}`);
        setCurrentUser(`${response.data.token}`);
        navigate("/");
      }).catch((err)=>{
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Identifiant ou mot de passe incorrect");
        }
      });
    }

      return (
        <>

          <main>

              <MenuBurger/>
              <Header/>

              <div className='login_background'>

                <div className='login-container'>

                    <h1>Se connecter</h1>

                    <section className='login_section'>

                      <form onSubmit={handleSubmit} className='login_form'>

                        <label htmlFor="usermail" className='login_usermail'>

                          <i className='bi bi-envelope-fill'></i> Adresse mail :

                        </label>

                        <input
                          type="mail"
                          id="usermail"
                          name="usermail"
                          autoComplete="on"
                          onChange={(e) => setMail(e.target.value)}
                          value={mail}
                          required
                          aria-invalid={validMail ? "false" : "true"}
                          aria-describedby="uidnote"
                          className='login_usermail-input'
                        />

                        <label htmlFor="password" className='login_password'>

                          <i className='bi bi-key-fill'></i> Mot de passe :

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
                          className='login_password-input'
                        />

                        <button className='login_button-login'>
                          Se connecter
                        </button>

                      </form>

                      <div className='login_button-register-container'>

                        <p>
                          Pas encore inscrit?
                        </p>

                        <button className='login_button-register'>
                          <Link to="/register">S'inscrire</Link>
                        </button>

                      </div>
                    </section>
                </div>
              </div>
              <Footer/>
            </main>
        </>
)}

export default Login