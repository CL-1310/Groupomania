import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../sass/main.css"


const ViewPost = () => {

    const [posts, setPosts] = useState([])
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();
    

    const getPosts = () => {
        axios({
            method:"get",
            url:("http://localhost:4000/api/posts/:id"),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=>{

            setPosts(response.data)

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
        getPosts()    
    },);

    return (
        <>  
            <Header/>

            <div className='home_page'>
                <h1>Publication</h1>

                {
                    posts.map((post)=> (
                        <div className='home_one-post'>
                            <div className='home_postdate'> <i className='bi bi-clock'></i> Posté le 00/00/0000 à 00:00 </div>
                            <h3> Posté par {post.userId}</h3>
                            <h5>Département : </h5>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <img src={post.imageUrl} alt="" />
                            <button>
                            <a href='/edit-post' className='home_modify'> <i className='bi bi-pencil-fill'> Modifier </i> </a> 
                            </button>           
                        </div>
                    )
                )}
                
            </div>

            <Footer/>
        </>
    )
}

export default ViewPost