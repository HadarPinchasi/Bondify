// JavaScript source code
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import TopScreenIcons from "./TopScreenIcons";
import RoundedButton from "./RoundedButton";
import { useAuth } from '../Authentication/AuthContext.js';

function TopScreen({ profilePic }) {
    const { setToken, setMyUser } = useAuth();

    function toggleMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');

    }
    function logOut() {
        setToken(null);
        setMyUser(null);
    }
    return (
        <nav className="navbar fixed-top bg-body-tertiary shadow p-3 d-none d-lg-block ">
            <div className="container ">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="d-flex align-items-center">
                                <FaFacebook className="col-3 fs-1 text-primary" />
                                <input className="form-control me-2 col-9" type="search" placeholder="Search Facebook" aria-label="Search" style={{ width: "10rem" }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <TopScreenIcons />
                    </div>
                    <div className="col d-flex justify-content-end">
                        <Link to='/'>
                        <RoundedButton onClick={logOut}>Log Out</RoundedButton>
                        </Link>
                        <RoundedButton onClick={toggleMode}>Change Mode</RoundedButton>
                        <img src={profilePic} className="rounded-circle me-2" style={{ width: '45px', height: '45px' }} height='100%' alt="" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopScreen;
