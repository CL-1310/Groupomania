import { Link } from 'react-router-dom'
 
function Header() {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/profile">Profil</Link>
            <Link to="/register">S'inscrire</Link>
            <Link to="/login">Se connecter</Link>
        </nav>
    )
}

export default Header