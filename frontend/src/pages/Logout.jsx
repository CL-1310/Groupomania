import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
    let navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate("/login");
    })

}

export default Logout