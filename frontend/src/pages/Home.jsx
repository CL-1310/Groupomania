import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"


const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const [post, setPost] = useState([])
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    const urlParams = useParams()
    let navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("userConnected")){
            navigate("/login");
        }

        getPosts()    
    },[navigate],[]);

    useEffect(() => {
        // if (post.userId !== localStorage.getItem("userConnected")){
        //     setErrMsg("Vous ne disposez pas des authorisations nécéssaires pour pouvoir modifier cette publication");
        // }else {
            setToken(localStorage.getItem("userToken"))
            setUserId(localStorage.getItem("userConnected"))
        // }

    });

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

    const getPost = () => {
        axios({
            method:"get",
            url:(`http://localhost:4000/api/posts/${post.id}`),
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


    const erasePost = () => {
        axios({
            method:"delete",
            url:(`http://localhost:4000/api/posts/${post.id}`),
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(reponse=>{
            navigate("/")

        }).catch(err=>{
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 401){
                setErrMsg("Erreur 401");
            }
        })
        
    }



    return (
        <>  
            <Header/>

            <div className='home_page'>
                <h1>Publications</h1>

                <div className='home_posts-container'>
                    {
                        posts.map((post)=>
                            <div key={post._id} className='home_one-post'>
                                <Link to={"/post/"+ post._id} >
                                    <div className='home_postdate'> <i className='bi bi-clock'></i> Posté le {post.date} </div>
                                    <h3> Posté par {post.userId}</h3>
                                    <h5>Département : </h5>
                                    <h2>{post.title}</h2>
                                    <p>{post.description}</p>
                                    <img src={post.imageUrl} alt="" />    
                                </Link>
                                <button>
                                    <Link to={"/edit-post/"+ post._id}>Modifier</Link>
                                </button>
                                <button onClick={erasePost(post._id)}>Supprimer</button>
                            </div>
                        )
                        
                    }  

                </div>
            </div>

            <Footer/>
        </>
    )
}


export default AllPosts