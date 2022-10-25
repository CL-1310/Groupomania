import {useState} from 'react'
import axios from "axios";
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import { useNavigate } from 'react-router-dom';
import "../sass/main.css"
import 'typeface-lato';
import { useEffect } from 'react';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';


const NewPost = () => {
    const [title, setTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);
    const [description, setDescription] = useState("");
    const [validDescription, setValidDescription] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [postImgInput, setPostImgInput] = useState();
    const [imgPostFile, setImgPostFile] = useState();
    const {currentUser} = useContext(userContext)
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [login, setLogin] = useState(false)
    let navigate = useNavigate();
    const POST_REGEX = /^.{2,}$/gm
    
    useEffect(() => {
        if(!localStorage.getItem("userConnected")){
            navigate("/login")
        }
        setToken(localStorage.getItem("userToken"))
        setUserId(localStorage.getItem("userConnected"))
    })

    const handlePostImg = (e) => {
        e.preventDefault();
        setPostImgInput(e.target.value)
        setImgPostFile(e.target.files[0])
    }
    const postSubmit = (e) => {
        e.preventDefault();
        const checkTitle  = POST_REGEX.test(title);
        if(checkTitle === true){
        setValidTitle(true)
        }
        const checkDescription = POST_REGEX.test(description)
        if(checkDescription === true){
        setValidDescription(true)
        }
        if(checkTitle === true && checkDescription === true){
            const formData = new FormData()
            formData.append("title",title)
            formData.append("description",description)
            formData.append("imagePost",imgPostFile)
            formData.append("userId",userId)
            axios.post(
                "http://localhost:4000/api/posts/create",
                formData,
                {headers:{"Authorization":`Bearer ${token}`}}

            ).then(()=>{
                setSuccess(true);
                setTitle("");
                setDescription("");
                navigate("/"); 
            }).catch(err=>{
                if (!err?.response) {
                    setErrMsg("No Server Response");
                } else if (err.response?.status === 401){
                    navigate("/login");
                }
            }
        )}

    };

    useEffect(() => {
        if(!localStorage.getItem("userConnected")){
            navigate("/login");
        }
        setLogin(true)
   
    },[navigate]);

    return (
        <>
            <MenuBurger/>
            <Header login={login}/>

            <div className='newpost_background'>
                <div className='newpost_container'>
                    <h1>Nouveau post</h1>

                    <section>
                        <form onSubmit={postSubmit} encType="multipart/form-data">
                            <label htmlFor="title" className='newpost_title'>
                                Titre :
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                            </label>
                            
                            <label htmlFor="description" className='newpost_description'>
                                Description :
                                <textarea
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    required
                                />
                            </label>
                            
                            <label htmlFor="imagePost" className='newpost_fileupload'>
                                Ajouter une image :
                                <input
                                    type="file"
                                    id="imagePost"
                                    name="imagePost"
                                    accept="image/png,image/jpeg,image/jpg,image/gif"
                                    onChange={handlePostImg}
                                    defaultValue={postImgInput}
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
};

export default NewPost