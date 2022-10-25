import { Link } from 'react-router-dom'
import logo from "../Header/logo.png"
 
function Header(props) {

    return (
        <div className='header_container'>
            <nav className='header_menu'>
                <img src={logo} alt='Groupomania'/>

                    {
                        props.login === true ?
                        <div className='header_links'>
                            <Link to="/"> <i className='bi bi-house-door-fill'></i> Accueil </Link>
                            <Link to="/profile"> <i className='bi bi-person-circle'></i> Profil </Link>
                            <Link to="/create-post"> <i className='bi bi-pencil-square'></i> Nouveau post </Link>
                            <Link to="/logout"> <i className='bi bi-x-circle-fill'></i> Se déconnecter </Link>
                        </div>
                        :
                        <div className='header_links'>
                            <Link to="/login"> <i className='bi bi-box-arrow-right'></i> Se connecter </Link>
                            <Link to="/register"> <i className='bi bi-plus-circle-fill'></i> S'inscrire </Link>
                        </div>
                    }

            </nav>
        </div>
    )
}

export default Header