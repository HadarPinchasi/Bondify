import LogButtons from './LogButttons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sendLoginRequest } from '../services/authService';
import { useAuth } from './AuthContext';

function RightScreen() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useAuth();

    const handleLogin = async () => {
        try {
            const data = { userName, password };
            const serverResponse = await sendLoginRequest(data);
            if (serverResponse.success) {
                setToken(serverResponse.data);
                navigate('/feed', { state: { username: userName } });
            } else {
                alert(serverResponse.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };
    return (
        <div className="col-lg-7 col-s-1 loginScreen" id='openingScreen'>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="usernameInput" value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <label htmlFor="usernameInput">User name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="passwordInput" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label htmlFor="passwordInput" >Password</label>
            </div>
            <div>
                <button className='btn btn-primary' id='startButton' onClick={handleLogin}>
                    Log In
                </button>
                <div>new here?</div>
                <LogButtons />
            </div>
        </div>
    );
}

export default RightScreen;
