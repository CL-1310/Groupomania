import { useEffect, useState} from 'react';
import axios from "axios";
import Header from "../components/Header"
import MenuBurger from '../components/Menu-Burger';
import Footer from "../components/Footer"
import { useNavigate, useParams } from 'react-router-dom';
import "../sass/main.css"

const EditPost = () => {
    const [post, setPost] = useState([])
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState(localStorage.getItem("userToken"))
    const [errMsg, setErrMsg] = useState("");
    const [title, setTitle] = useState('');
    const [validTitle, setValidTitle] = useState("");
    const [description, setDescription] = useState('');
    const [validDescription, setValidDescription] = useState(false);
    const [success, setSuccess] = useState(false);
    const [postImgInput, setPostImgInput] = useState();
    const [imgPostFile, setImgPostFile] = useState();
    const [login, setLogin] = useState(false)
    const POST_REGEX = /^.{2,}$/gm
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
            setTitle(response.data.title)
            setDescription(response.data.description)

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
        setLogin(true)
        getPost()       
    },[navigate]);

    const handlePostImg = (e) => {
        e.preventDefault();
        setPostImgInput(e.target.value)
        setImgPostFile(e.target.files[0])
    }

    const postUpdate = async (e) => {
        e.preventDefault();
        if(title === ""){
            setTitle(post.title)
        }
        if (description === ""){
            setDescription(post.description)
        }
        const checkTitle  = POST_REGEX.test(title);
        if(checkTitle === true){
            setValidTitle(true)
        }
        const checkDescription = POST_REGEX.test(description)
        if(checkDescription === true){
            setValidDescription(true)
        }

        console.log(checkTitle === true && checkDescription === true)
        if(title !== "" && description !== ""){
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

            <main>

                <MenuBurger/>
                <Header login={login}/>

                <div className='newpost_background'>

                    <div className='newpost_container'>

                        <h1>Éditer le post</h1>

                            <section>

                                <form onSubmit={postUpdate} encType="multipart/form-data">

                                    <label htmlFor="title" className='newpost_title'>

                                        Titre :
                                        <input
                                            type="text"
                                            onChange={(e) => setTitle(e.target.value)}
                                            defaultValue={post.title}
                                            required
                                        />
                                    </label>
                                    
                                    <label htmlFor="description" className='newpost_description'>

                                        Description :
                                        <textarea
                                            type="text"
                                            onChange={(e) => setDescription(e.target.value)}
                                            defaultValue={post.description}
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

            </main>
        </> 
    );

}


export default EditPost;