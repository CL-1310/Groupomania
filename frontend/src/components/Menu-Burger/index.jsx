import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import logo from "../Header/logo.png"
import Radium from 'radium';


function MenuBurger() {
    let RadiumLink = Radium(Link);

    return (
        <>
            <div className='menuburger_container'>
                <img src={logo} alt='Groupomania'/>
                <Menu right>
                    <div className='menuburger_links'>
                        <RadiumLink className="menu-item" to="/"> <i className='bi bi-house-door-fill'> <span>Accueil</span> </i>  </RadiumLink>
                        <RadiumLink className="menu-item" to="/profile"> <i className='bi bi-person-circle'> <span>Profil</span> </i>  </RadiumLink>
                        <RadiumLink className="menu-item" to="/create-post"> <i className='bi bi-pencil-square'> <span>Nouveau post</span> </i>  </RadiumLink>
                        <RadiumLink className="menu-item" to="/logout"> <i className='bi bi-box-arrow-right'> <span>Se déconnecter</span> </i>  </RadiumLink>
                    </div>
                </Menu>
            </div>
        </>
    )   
}


export default MenuBurger;