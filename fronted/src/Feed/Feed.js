import { useState, useEffect, useRef } from 'react';
import './feed.css';
import MenuFeed from './MenuFeed.js';
import Post from '../Post/Post.js';
import leftMenuInfos from './leftMenuInfos.js';
import TopScreen from './TopScreen.js';
import BirthdayCard from './BirthdayCard.js';
import { useNavigate, useLocation } from 'react-router-dom';
import AddPost from '../Post/AddPost.js';
import PersonalBox from '../user/PersonalBox.js';
import FriendsRequests from '../Friends/FriendsRequests.js';
import { fetchUserData, fetchPosts, fetchFriends } from '../services/feedApi.js';
import { deleteUser } from '../services/UserService.js';
import { useAuth } from '../Authentication/AuthContext.js';
import Friends from '../Friends/Friends.js';

function Feed() {
    const location = useLocation();
    const { username } = location.state;
    const { token, myUser, setMyUser } = useAuth();
    const navigate = useNavigate();
    const [postsList, setPostList] = useState([]);
    const modalRef = useRef(null);
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        if (!token || !username) {
            navigate('/');
            return;
        }
        const fetchData = async () => {
            const userData = await fetchUserData(username, token);
            setMyUser(userData);
            const [postsData, friendsData] = await Promise.all([
                fetchPosts(token),
                fetchFriends(userData.userName, token)
            ]);

            setPostList(postsData);
            setFriendsList(friendsData);

        };
        fetchData();
    }, [username, token]);

    const handleDeleteUser = async () => {
        const result = await deleteUser(myUser.userName, token);
        if (result.success) {
            if (modalRef.current) {
                const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
                modalInstance.hide();
            }
            setMyUser(null);
            navigate("/");
        } else {
            console.log(result.error);
        }
    };

    const DeletePostFromScreen = (postId) => {
        const updatedPostsList = postsList.filter(post => post._id !== postId);
        setPostList(updatedPostsList);
    };
    const handleDeleteFriend = (userName) => {
        const updatedFriendsList = friendsList.filter(friend => friend.userName !== userName);
        setFriendsList(updatedFriendsList);
    };

    if (myUser === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            {myUser && (
                <>
                    <TopScreen profilePic={myUser.profilePic} />
                    <div className="row second">
                        <div className="col d-none d-lg-block">
                            <PersonalBox
                                handleDeleteUser={handleDeleteUser}
                                modalRef={modalRef}
                                setMyUser={setMyUser}
                            />
                            <MenuFeed menuInfos={leftMenuInfos} />
                        </div>
                        <div className="col-lg-6 col-s-1">
                            <AddPost postsList={postsList} setPostList={setPostList} />
                            {postsList.map((post) => (
                                <Post
                                    key={post._id}
                                    post={post}
                                    onDeletePost={DeletePostFromScreen}
                                    handleDeleteFriend={handleDeleteFriend}
                                    friendsList={friendsList}
                                />
                            ))}
                        </div>
                        <div className="col d-none d-lg-block">
                            <BirthdayCard />
                            <FriendsRequests
                                friendsList={friendsList}
                                setFriendsList={setFriendsList}
                            />
                            <Friends userName={myUser.userName} friendsList={friendsList} setFriendsList={setFriendsList} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}

export default Feed;