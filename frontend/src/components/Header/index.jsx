import { Link } from 'react-router-dom'
import logo from "../Header/logo.png"
 
function Header() {
    return (
        <div className='header_container'>
            <nav>
                <img src={logo} alt='Groupomania'/>
                <div className='header_links'>
                    <Link to="/"> <i className='bi bi-house-door-fill'></i> Accueil </Link>
                    <Link to="/profile"> <i className='bi bi-person-circle'></i> Profil </Link>
                    <Link to="/create-post"> <i className='bi bi-pencil-square'></i> Nouveau post </Link>
                    <Link to="/logout"> <i className='bi bi-box-arrow-right'></i> Se déconnecter </Link>
                </div>
            </nav>
        </div>
    )
}

export default Header