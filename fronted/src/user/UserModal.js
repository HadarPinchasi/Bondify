import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { updateUser } from '../services/UserService';
import { useAuth } from '../Authentication/AuthContext';

function UserModal({ handleDeleteUser, isEditing, setIsEditing, navigateToPersonalData, modalRef }) {
    const { token, myUser, setMyUser } = useAuth();

    const [editingFirstName, setEditingFirstName] = useState(myUser.firstName);
    const [editingLastName, setEditingLastName] = useState(myUser.lastName);
    const [profilePic, setProfilePic] = useState(myUser.profilePic);

    const readImageFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveEdit = async () => {
        try {
            const updatedUser = await updateUser(myUser.userName, {
                firstName: editingFirstName,
                lastName: editingLastName,
                profilePic,
            }, token);
            setMyUser((prev) => ({ ...prev, ...updatedUser }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving edits:', error);
            alert('An error occurred while saving changes.');
        }
    };

    return (
        <div className="modal fade" id="personalBox" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            <img
                                src={profilePic}
                                className="rounded-circle"
                                style={{ width: '30px', height: '30px', marginRight: '10px' }}
                                alt="profile"
                            />
                            {isEditing ? (
                                <>
                                    <input type="text" className="form-control" value={editingFirstName} onChange={(e) => setEditingFirstName(e.target.value)} />
                                    <input type="text" className="form-control" value={editingLastName} onChange={(e) => setEditingLastName(e.target.value)} />
                                    <label className="btn btn-light" style={{ maxHeight: '37px' }}>
                                        Change Profile Picture
                                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={readImageFile} />
                                    </label>
                                </>
                            ) : (
                                <>{editingFirstName} {editingLastName}</>
                            )}
                            <DropdownMenu
                                handleDelete={handleDeleteUser}
                                handleEdit={() => setIsEditing(true)}
                                deleteObject='Delete account'
                                editObject='Edit account'
                            />
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <button className="btn btn-primary col-md-4" onClick={navigateToPersonalData}>Click here to see posts</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserModal;
