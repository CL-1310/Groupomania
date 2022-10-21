import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"


const Profile = () => {

    const [userId, setUserId] = useState(localStorage.getItem("userConnected"))
    const [user, setUser] = useState([])
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();

    const getProfile = (userId) => {
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
        getProfile()  
    },[navigate]);

    return (
        <>  
            <Header/>
            <div className='profile_background'>
                <div className='profile_container'>
                    <h1>Profil</h1>

                    <div className='profile_info'>
                        <h3> Nom d'utilisateur : {user.username}</h3>
                        <h4>Service : {user.department}</h4>
                        <h4>Date de naissance : {user.birthdate}</h4>
                        <img src={user.avatar} alt="" />
                        <button className='profile_edit-button'>
                            <Link to={"/edit-profile/"+user._id}>Modifier</Link>
                        </button>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}


export default Profile