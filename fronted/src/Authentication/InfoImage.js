// JavaScript source code
import './index.css';
import React from 'react';

function InfoImage() {
    return (
        <div className="col-md-4">
            <label htmlFor="validationCustom06" className="form-label">Profile picture</label>
            <input type="file" className="form-control" id="validationCustom06" required />
            <img id="previewImage" className="mt-2" alt="" style={{ maxWidth: '100%', maxHeight: '180px' }} />        </div>
    );
}
export default InfoImage;