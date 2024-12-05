// JavaScript source code
import './index.css';
function LeftLogo({ description, subDescription }) {
    return (
        <div className="col-lg-5 col-s-2" id='openingScreen'>
            <ul className=" logo">
                <li>  Bondify </li>
                <li> {description}</li>
                <li> {subDescription}</li>
            </ul>
        </div>
    )
}
export default LeftLogo;