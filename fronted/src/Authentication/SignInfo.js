// JavaScript source code
import './index.css';

function SignInfo({ validationCustom, description, inputType, inputId, patternInput, instructions }) {

    return (
        <div className="col-md-4">
            <label htmlFor={validationCustom} className="form-label">{description}</label>
            <input type={inputType} className="form-control" id={inputId} pattern={patternInput} required />
            <div id="passwordHelpBlock" className="form-text">
                {instructions}
            </div>
        </div>
    )
}
export default SignInfo