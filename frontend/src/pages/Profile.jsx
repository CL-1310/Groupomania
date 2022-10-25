import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import dayjs from 'dayjs'
import 'dayjs/locale/fr'


const Profile = () => {

    const [userId, setUserId] = useState(localStorage.getItem("userConnected"))
    const [user, setUser] = useState([])
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    const [login, setLogin] = useState(false)
    let navigate = useNavigate();

    const getProfile = () => {
        axios({
            method:"get",
            url:(`http://localhost:4000/api/auth/user/${userId}`),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=>{
            setUser(response.data)
        }).catch(err=>{
            if (!err?.response) {
                setErrMsg("No Server Response");
            }

        })
    }

    useEffect(() => {
        if(!localStorage.getItem("userConnected")){
            navigate("/login");
        }

        setUserId(localStorage.getItem("userConnected"))
        setToken(localStorage.getItem("userToken"))
        setLogin(true)
        getProfile()  
    },[navigate]);

    return (
        <>  

            <main>
                
                <MenuBurger/>
                <Header login={login}/>

                <div className='profile_background'>

                    <div className='profile_container'>

                        <h1>Profil</h1>

                        <section>

                            <div className='profile_info'>

                                <h3> Nom d'utilisateur : {user.username}</h3>

                                <h4>Service : {user.department}</h4>

                                <h4>Date de naissance : {dayjs(user.birthdate).format('DD/MM/YYYY')}</h4>

                                <img src={user.avatar} alt="" />

                                <div className='profile_edit-button'>

                                    <button >
                                        <Link to={"/edit-profile/"+ user._id}>Modifier</Link>
                                    </button>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <Footer/>

            </main>
        </>
    )
}


export default Profile