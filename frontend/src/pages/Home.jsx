import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import logo from "../components/Header/logo.png"
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import BeatLoader from "react-spinners/BeatLoader";



const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const [userId, setUserId] = useState("")
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    const [login, setLogin] = useState(false)
    let navigate = useNavigate();


    useEffect(() => {
        if(!localStorage.getItem("userConnected")){
            navigate("/login");
        }
        setUserId(localStorage.getItem("userConnected"))
        setToken(localStorage.getItem("userToken"))
        setLogin(true)
        getPosts()
    },[navigate]);


    const getPosts = () => {
        axios({
            method:"get",
            url:"http://localhost:4000/api/posts",
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=>{
            setPosts(response.data)

        }).catch(err=>{
            if (!err?.response) {
                setErrMsg("No Server Response");
            }

        })
    }

    const erasePost = (postId) => {
        axios({
            method:"delete",
            url:(`http://localhost:4000/api/posts/${postId}`),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(reponse=>{
            getPosts()

        }).catch(err=>{
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 401){
                setErrMsg("Erreur 401");
            }
        })
        
    }

    const Like = (postId) => {
        const likeStatus = 1
        axios({
            method:"post",
            url:(`http://localhost:4000/api/posts/${postId}/like/${likeStatus}`),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}

        })
        .then(()=>{
            setLike(true);
            navigate("/"); 
        }).catch(err=>{
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 401){
                navigate("/login");
            }
        }
    )}

    const Dislike = (postId) => {
        const dislikedStatus = -1
        axios({
            method:"post",
            url:(`http://localhost:4000/api/posts/${postId}/like/${dislikedStatus}`),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}

        })
        .then(()=>{
            setDislike(true);
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

            <main>

                <div className='loading-spinner'>
                    <img src={logo} alt='Groupomania'/>
                    <BeatLoader color="#FD2D01" className='beatloader'/>
                </div>

                <div className='site'>

                    <MenuBurger/>
                    <Header login={login}/>

                    <div className='home_page'>

                        <h1 id='publications'>Publications</h1>

                        <div className='home_posts-container'>

                            <div className='scroll-to-top'>

                                <a href='#publications' className='button-scrollToTop'>
                                    <i className='bi bi-arrow-up-circle-fill'></i>
                                </a>

                            </div>
                            {
                                posts.map((post)=>
                                    <div key={post._id} className='home_one-post'>

                                        <Link to={"/post/"+ post._id} className='home_one-post-link' >

                                            <div className='home_postdate'> <i className='bi bi-clock'></i> Posté le {dayjs(post.createdAt).format('DD/MM/YYYY à HH:mm:ss')}</div>
                                            
                                            <h3> Posté par {post.userId}</h3>
                                            
                                            <h2>{post.title}</h2>
                                            
                                            <p> {post.description} </p>
                                            
                                            <span className='home_more'> Afficher le post complet </span>
                                            
                                            <img src={post.imageUrl} alt="" />  

                                        </Link>

                                        <div className='home_editerase-buttons'>

                                            <button>
                                                <Link to={"/edit-post/"+ post._id}>Modifier</Link>
                                            </button>

                                            <button onClick={() => erasePost(post._id)}>Supprimer</button>

                                        </div>
                                        <div className='home_react-buttons'>

                                            <button onClick={() => Like(post._id)} className='like-button'>
                                                <i className='bi bi-hand-thumbs-up-fill'></i>
                                            </button>

                                            <button onClick={() => Dislike(post._id)} className='dislike-button'>
                                                <i className='bi bi-hand-thumbs-down-fill'></i>
                                            </button>
                                            
                                        </div>
                                    </div>
                                )
                                
                            } 
                            <div>
                                
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            </main>
        </>
    )
}


export default AllPosts