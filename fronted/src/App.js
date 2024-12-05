import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './Feed/Feed.js';
import LogIn from './Authentication/LogIn';
import Registration from './Authentication/Registration';
import PersonalData from './user/PersonalData.js';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LogIn />}> </Route>
                <Route path="/details" element={<Registration />}> </Route>
                <Route path="/feed" element={<Feed />}> </Route>
                <Route path="/personalData" element={<PersonalData />}> </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;


