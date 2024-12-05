import { useState, useRef } from 'react';
import DropdownMenu from '../user/DropdownMenu';

function Comment({ CommentprofilePicture, CommentfirstName, CommentlastName, Commentcontent }) {
    const [editedContent, setEditedContent] = useState(Commentcontent);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const commentInputRef = useRef(null);

    const handleEditComment = () => setIsEditing(true);
    const handleSaveEdit = () => {
        setEditedContent(commentInputRef.current.value);
        setIsEditing(false);
    };
    const handleCancelEdit = () => setIsEditing(false);
    const handleDeleteComment = () => setIsDeleted(true);

    if (isDeleted) return null;

    return (
        <div className="card border-0 mb-3" style={{ width: '40rem', height: '8rem' }}>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src={CommentprofilePicture}
                        className="rounded-circle me-2"
                        style={{ width: '40px', height: '40px' }}
                        alt=""
                    />
                    <div className="card-body bg-light" style={{ width: 'calc(100% - 50px)', maxWidth: '550px', borderRadius: '16px' }}>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{CommentfirstName} {CommentlastName}</h6>
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    defaultValue={editedContent}
                                    ref={commentInputRef}
                                />
                                <div className="row">
                                    <button className="btn btn-primary btn-sm col-md-6" onClick={handleSaveEdit}>
                                        Save
                                    </button>
                                    <button className="btn btn-secondary btn-sm col-md-6" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="card-text">{editedContent}</p>
                        )}
                    </div>
                </div>
                <DropdownMenu handleDelete={handleDeleteComment} handleEdit={handleEditComment} deleteObject="Delete Comment" editObject="Edit Comment" />
            </div>
        </div>
    );
}

export default Comment;
