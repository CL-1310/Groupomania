import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"

const Profile = () => {

    const [users, setUsers] = useState([])
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();

    const getProfiles = () => {
        axios({
            method:"get",
            url:"http://localhost:4000/api/auth/user/_:id",
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=>{
            setUsers(response.data)

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

        getProfiles()    
    },[navigate]);

    return (
        <>  
            <Header/>

            <div className=''>
                <h1>Profil</h1>

                <div className=''>
                    {
                        users.map((user)=>
                            <div key={user._id} className=''>
                                <h3> Nom d'utilisateur {user.username}</h3>
                                <h4>Département : {user.department}</h4>
                                <h5>Date de naissance : {user.birthdate}</h5>
                                <img src={user.avatar} alt="" />
                                <Link to="/edit-user/:id">Modifier</Link>
                            </div>
                        )
                        
                    }  

                </div>
            </div>

            <Footer/>
        </>
    )
}


export default Profile