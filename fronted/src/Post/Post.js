import { useState, useRef } from 'react';
import PostEditForm from './PostEditForm';
import { deletePost, savePostEdit } from '../services/PostService';
import PostHeader from './PostHeader';
import CommentsSection from '../Comment/CommentsSection';
import { useAuth } from '../Authentication/AuthContext';

function Post({ post, onDeletePost, handleDeleteFriend, friendsList }) {
    const postRef = useRef(null);
    const [commentsList, setCommentList] = useState([]);
    const [postContent, setPostContent] = useState(post.content);
    const [postPhoto, setPostPhoto] = useState(post.photo);
    const [editingData, setEditingData] = useState({ content: null, photo: null });
    const { token, myUser } = useAuth();

    async function handleDeletePost() {
        try {
            const response = await deletePost(myUser.userName, post._id, token);
            if (response.ok) {
                onDeletePost(post._id);
            } else if (response.status === 404) {
                alert('problem deleting');
            } else if (response.status === 401 || response.status === 403) {
                alert('you are not allowed to delete this post');
            }
        } catch (error) {
            alert('error delete post.');
        }
    }

    async function handleSaveEdit() {
        try {
            const response = await savePostEdit(myUser.userName, post._id, token, editingData);
            if (response.ok) {
                setPostContent(editingData.content);
                setPostPhoto(editingData.photo);
                setEditingData({ content: null, photo: null });
            } else if (response.status === 404) {
                alert('problem editing');
            } else if (response.status === 401 || response.status === 403) {
                alert('you are not allowed to edit this post');
            } else if (response.status === 409) {
                alert('link is invalid, please try another words');
            }

        } catch (error) {
            alert('error saving edits.');
        }
    }

    const handleEditPost = () => {
        setEditingData({ content: postContent, photo: postPhoto });
    };


    return (
        <div className="card mt-3 " style={{ width: '40rem' }} ref={postRef}>
            <div className="card-body d-flex flex-column">
                <PostHeader
                    post={post}
                    handleDeletePost={handleDeletePost}
                    handleEditPost={handleEditPost}
                    handleDeleteFriend={handleDeleteFriend}
                    friendsList={friendsList}
                />
                {editingData.content !== null ? (
                    <PostEditForm
                        editingData={editingData}
                        setEditingData={setEditingData}
                        onSaveEdit={handleSaveEdit}
                    />
                ) : (
                    <div>
                        <p className="card-text mt-2" >{postContent} </p>
                        <img src={postPhoto} className="card-img-bottom" style={{ maxHeight: '500px' }} alt=""></img>
                    </div>
                )}
                <CommentsSection
                    postId={post._id}
                    commentsList={commentsList}
                    setCommentsList={setCommentList}
                />
            </div>
        </div>
    );
}

export default Post;