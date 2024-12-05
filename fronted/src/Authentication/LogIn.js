// JavaScript source code
import LeftLogo from './LeftLogo';
import RightScreen from './RightScreen';

function LogIn() {
    return (
        < div className="container text-center" >
            <div className="row">
                <LeftLogo description='Connect with your friends' subDescription='' />
                <RightScreen />
            </div>
        </div >
    );
}
export default LogIn;