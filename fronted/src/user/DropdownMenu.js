// JavaScript source code
import React from 'react';
import '../Feed/feed.css';

function DropdownMenu({ handleDelete, handleEdit, deleteObject, editObject }) {
    return (
        <div className="dropdown rounded-circle d-flex justify-content-center align-items-center" id='wannaShadow' style={{
            width: '30px', height: '30px'
        }} >
            <button className=" btn btn-secondary dropdown-toggle border-0 text-dark" style={{ backgroundColor: 'transparent' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                ...
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
                <a className="dropdown-item active" style={{ cursor: 'pointer' }} onClick={handleDelete}>{deleteObject} </a>
                <li><a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleEdit}>{editObject}</a></li>
            </ul>
        </div>
    );
}

export default DropdownMenu;
