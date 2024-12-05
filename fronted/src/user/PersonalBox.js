import { useState } from 'react';
import UserModal from './UserModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

function PersonalBox({ handleDeleteUser, modalRef }) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const { myUser } = useAuth();

    const navigateToPersonalData = () => {
        if (modalRef.current) {
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            modalInstance.hide();
        }
        navigate('/personalData', {
            state: {
                userName: myUser.userName,
            }
        });
    };

    return (
        <li className="list-group-item w-100 m-2 rounded" id='wannaShad'>
            <span className="object m-2">
                <img
                    src={myUser.profilePic}
                    className="rounded-circle"
                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                    alt="profile"
                />
            </span>
            <button type="button" className="btn btn-transparent" data-bs-toggle="modal" data-bs-target="#personalBox">
                {myUser.firstName} {myUser.lastName}
            </button>
            <UserModal
                handleDeleteUser={handleDeleteUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                navigateToPersonalData={navigateToPersonalData}
                modalRef={modalRef}
            />
        </li>
    );
}

export default PersonalBox;
