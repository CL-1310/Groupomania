import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate, Link, useParams } from 'react-router-dom'
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import erasePost from "./Home"
import Like from "./Home"
import Dislike from "./Home"


const ViewPost = () => {
    const [post, setPost] = useState([])
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();
    const urlParams = useParams()
    

    const getPost = () => {
        console.log(urlParams.id)
        axios({
            method:"get",
            url:(`http://localhost:4000/api/posts/${urlParams.id}`),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=>{
            console.log(response.data)
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
        getPost()       
    },[navigate]);

    return (
        <>  

            <MenuBurger/>
            <Header/>

            <div className='viewpost_page'>
                <h1 id='viewpost_h1'>Publication</h1>

                <div className='viewpost_container'>
                    <div className='viewpost_postdate'> <i className='bi bi-clock'></i> Posté le {dayjs(post.createdAt).format('DD/MM/YYYY à HH:mm:ss')} </div>
                    <h3> Posté par {post.userId}</h3>
                    <h5> Service : </h5>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <img src={post.imageUrl} alt="" />
                    <div className='viewpost_editerase-buttons'>
                        <button>
                            <Link to={"/edit-post/"+ post._id}>Modifier</Link>
                        </button>
                        <button onClick={() => erasePost(post._id)}>Supprimer</button>
                    </div>
                    <div className='viewpost_react-buttons'>
                        <button onClick={() => Like(post._id)} className='like-button'>
                            <i className='bi bi-hand-thumbs-up-fill'></i>
                        </button>
                        <button onClick={() => Dislike(post._id)} className='dislike-button'>
                            <i className='bi bi-hand-thumbs-down-fill'></i>
                        </button>
                        <div className='scroll-to-top'>
                            <a href='#viewpost_h1' className='button-scrollToTop'>
                                <i className='bi bi-arrow-up-circle-fill'></i>
                            </a>
		                </div>
                    </div>         
                </div>
                
            </div>

            <Footer/>
        </>
    )
}

export default ViewPost