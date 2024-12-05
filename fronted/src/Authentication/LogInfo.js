// JavaScript source code
import './index.css';
import React from 'react';

function LogInfo({ write }) {
    return (
        <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput"></input>
            <label for="floatingInput">{write}</label>
        </div>
    )
}
export default LogInfo;