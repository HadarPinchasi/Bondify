// JavaScript source code
import LeftLogo from './LeftLogo';
import SignScreen from './SignScreen';

function Registration() {
    return (
        < div className="container text-center" >
            <div className="row">
                <LeftLogo description='Sign Up' subDescription='Quick and easy' />
                <SignScreen />
            </div>
        </div >
    );
}
export default Registration;