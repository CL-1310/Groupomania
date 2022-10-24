import { useEffect, useState} from 'react';
import axios from "axios";
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import { useNavigate } from 'react-router-dom';
import "../sass/main.css"

const EditProfile = () => {
    const [user, setUser] = useState([])
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    const [birthdate, setBirthdate] = useState("")
    const [department, setDepartment] = useState("")
    const [username, setUsername] = useState("")
    const [userAvatarInput, setUserAvatarInput] = useState();
    const [avatar, setAvatar] = useState();

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
            setUsername(response.user.username)
            setBirthdate(response.user.birthdate)
            setDepartment(response.user.department)

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

    
    const handleUserAvatar = (e) => {
        e.preventDefault();
        setUserAvatarInput(e.target.value)
        setAvatar(e.target.files[0])
    }

    const userUpdate = async (e) => {
        e.preventDefault();
        const userData = new FormData()
        userData.append("username",username)
        userData.append("birthdate",birthdate)
        userData.append("department",department)
        userData.append("avatar",avatar)
        axios.put(
            `http://localhost:4000/api/posts/${user.id}`,
            userData,
            {headers:{"Authorization":`Bearer ${token}`}}

        ).then(()=>{
            setUsername("");
            setBirthdate("");
            setDepartment("");
            navigate("/"); 
        }).catch(err=>{
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 401){
                navigate("/login");
            }
        }
        
    )}

    return (
        <>
            <MenuBurger/>
            <Header/>

            <div className='newpost_background'>
                <div className='newpost_container'>
                    <h1>Éditer le profil</h1>

                    <section>
                        <form onSubmit={userUpdate} encType="multipart/form-data">
                            <label htmlFor="username" className='newpost_title'>
                                Nom d'utilisateur :
                                <input
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    defaultValue={user.username}
                                    required
                                />
                            </label>
                            
                            <label htmlFor="department" className='newpost_description'>
                                Service :
                                <input
                                    type="text"
                                    onChange={(e) => setDepartment(e.target.value)}
                                    defaultValue={user.department}
                                    required
                                />
                            </label>

                            <label htmlFor="birthdate" className='newpost_description'>
                                Date de naissance :
                                <input
                                    type="date"
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    defaultValue={user.birthdate}
                                    required
                                />
                            </label>
                            
                            <label htmlFor="avatar" className='newpost_fileupload'>
                                Ajouter un avatar :
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/png,image/jpeg,image/jpg,image/gif"
                                    onChange={handleUserAvatar}
                                    defaultValue={userAvatarInput}
                                />
                            </label>
                            
                            <button className='newpost_button'>
                                Publier
                            </button>
                        </form>
                    </section>
                </div>
            </div>
            <Footer/>
        </> 
    );

}


export default EditProfile;