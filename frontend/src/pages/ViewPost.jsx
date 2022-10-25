import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate, Link, useParams } from 'react-router-dom'
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import dayjs from 'dayjs'
import 'dayjs/locale/fr'


const ViewPost = () => {
    const [post, setPost] = useState([])
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();
    const urlParams = useParams()
    const [login, setLogin] = useState(false)
    

    const getPost = () => {
        axios({
            method:"get",
            url:(`http://localhost:4000/api/posts/${urlParams.id}`),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=>{
            setPost(response.data)
            
        }).catch(err=>{
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 401){
                setErrMsg("Erreur 401");
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
        getPost()       
    },[navigate]);


    return (
        <>  

            <MenuBurger/>
            <Header login={login}/>

            <div className='viewpost_page'>
                <h1 id='viewpost_h1'>Publication</h1>

                <div className='scroll-to-top'>
                    <a href='#viewpost_h1' className='button-scrollToTop'>
                        <i className='bi bi-arrow-up-circle-fill'></i>
                    </a>
		        </div>

                <div className='viewpost_container'>
                    <div className='viewpost_postdate'> <i className='bi bi-clock'></i> Posté le {dayjs(post.createdAt).format('DD/MM/YYYY à HH:mm:ss')} </div>
                    <h3> Posté par {post.userId}</h3>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <img src={post.imageUrl} alt="" />
                    <div className='viewpost_button'>
                        <button>
                            <Link to="/"> Retour </Link>
                        </button>
                    </div>         
                </div>
                
            </div>

            <Footer/>
        </>
    )
}

export default ViewPost