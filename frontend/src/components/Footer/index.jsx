import logo from "../Footer/logo.png"

function Footer() {
    return (
        <div className='footer_container'>
            <img src={logo} alt='Groupomania'/>
            <ul>
                <li> <i className='bi bi-currency-euro'></i> Tarifs </li>
                <li> <a href="mailto:contact@groupomania.com"> <i className='bi bi-envelope-fill'></i> Contact </a> </li>
                <li> <a href="mailto:support@groupomania.com"> <i className='bi bi-tools'></i> Support technique </a> </li>
                <li> <i className='bi bi-info-circle-fill'></i> Mentions légales </li>
            </ul>
        </div>
    )
}

export default Footer