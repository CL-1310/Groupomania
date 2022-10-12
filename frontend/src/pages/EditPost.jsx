import { useEffect, useContext, useState} from 'react';
import axios from "axios";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate, useParams } from 'react-router-dom';
import "../sass/main.css"
// import { userContext } from '../context/UserContext';

const EditPost = () => {
    const [post, setPost] = useState([])
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    const [title, setTitle] = useState("");
    const [validTitle, setValidTitle] = useState(false);
    const [description, setDescription] = useState("");
    const [validDescription, setValidDescription] = useState(false);
    const [success, setSuccess] = useState(false);
    const [postImgInput, setPostImgInput] = useState();
    const [imgPostFile, setImgPostFile] = useState();
    const POST_REGEX = /^.{2,}$/
    const urlParams = useParams()

    let navigate = useNavigate();

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
        if (post.authorId !== localStorage.getItem("userConnected")){
            setErrMsg("Vous ne disposez pas des authorisations nécéssaires pour pouvoir modifier cette publication");
        }
        setUserId(localStorage.getItem("userConnected"))
        getPost()       
    },[]);

    const handlePostImg = (e) => {
        e.preventDefault();
        setPostImgInput(e.target.value)
        setImgPostFile(e.target.files[0])
    }

    const postUpdate = (e) => {
        e.preventDefault();
        console.log(title)
        // if title vide + description vide
        const checkTitle  = POST_REGEX.test(title);
        if(checkTitle === true){
        setValidTitle(true)
        }
        console.log(checkTitle)
        const checkDescription = POST_REGEX.test(description)
        if(checkDescription === true){
        setValidDescription(true)
        }
        console.log(checkDescription)
        if(checkTitle === true && checkDescription === true){
            console.log("checkComplete")
            const formData = new FormData()
            formData.append("title",title)
            formData.append("description",description)
            formData.append("imagePost",imgPostFile)
            formData.append("userId",userId)
            axios.put(
                `http://localhost:4000/api/posts/${urlParams.id}`,
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
    }

    return (
        <>
            <Header/>
            <div className='newpost_background'>
                <div className='newpost_container'>
                    <h1>Nouveau post</h1>

                    <section>
                        <form onSubmit={postUpdate} encType="multipart/form-data">
                            <label htmlFor="title" className='newpost_title'>
                                Titre :
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e) => setTitle(e.target.value)}
                                    defaultValue={post.title}
                                    // value={title}
                                    required
                                />
                            </label>
                            
                            <label htmlFor="description" className='newpost_description'>
                                Description :
                                <textarea
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    defaultValue={post.description}
                                    // value={description}
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

}


export default EditPost;