import PersonalBoxPost from './PersonalBoxPost';
import DropdownMenu from '../user/DropdownMenu';
import { useAuth } from '../Authentication/AuthContext';


function PostHeader({ post, handleDeletePost, handleEditPost, handleDeleteFriend, friendsList }) {
    const { token, myUser } = useAuth();

    const formattedTime = new Date(post.time).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <div className="d-flex align-items-center">
            <img
                src={post.profilePic}
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px' }}
                alt=""
            />
            <div>
                <h5 className="card-title m-0">
                    <PersonalBoxPost
                        post={post}
                        handleDeleteFriend={handleDeleteFriend}
                        friendsList={friendsList}
                    />
                </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary m-1" >
                    {formattedTime}
                </h6>
            </div>
            {myUser.userName === post.userName && (
                <DropdownMenu
                    handleDelete={handleDeletePost}
                    handleEdit={handleEditPost}
                    deleteObject="Delete post"
                    editObject="Edit post"
                />
            )}
        </div>
    );
}

export default PostHeader;
