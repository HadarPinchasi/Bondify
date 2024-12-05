// JavaScript source code
import { useState, useEffect } from 'react';
import Post from '../Post/Post.js';
import TopScreen from '../Feed/TopScreen';
import MenuFeed from '../Feed/MenuFeed.js';
import leftMenuInfos from '../Feed/leftMenuInfos.js';
import { useLocation, useNavigate } from 'react-router-dom';
import Friends from '../Friends/Friends.js';
import { fetchFriends } from '../services/feedApi.js';
import { fetchUserPosts } from '../services/PostService.js';
import { useAuth } from '../Authentication/AuthContext.js';

function PersonalData() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userName } = location.state;
    const [userPostsList, setuserPostsList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const { token, myUser } = useAuth();
    const [FriendfriendsList, setFriendFriendsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch friends
                const friendsData = await fetchFriends(myUser.userName, token);
                setFriendsList(friendsData);
            } catch (error) {
                console.error('Error fetching friends:', error);
                alert('Failed to load friends. Please check your network connection.');
            }
            try {
                // Fetch user posts
                const posts = await fetchUserPosts(userName, token);
                setuserPostsList(posts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
                alert('Failed to load posts. Please check your network connection.');
            }
        };

        fetchData();
    }, [myUser.userName, token, userName]);

    const navigateToFeed = () => {
        navigate('/Feed', {
            state: {
                username: myUser.userName,
            }
        });
    };

    return (
        <div className="container-fluid ">
            <TopScreen />
            <div className="row  second">
                <div className="col d-none d-lg-block">
                    <button type="button" className="btn btn-primary col-md-12"
                        onClick={navigateToFeed}>Go Back To Feed</button>
                    <MenuFeed menuInfos={leftMenuInfos} />
                </div>
                <div className="col-lg-6 col-s-1">
                    {userPostsList.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            friendsList={friendsList}
                        />
                    ))}
                </div>
                <div className="col d-none d-lg-block">
                    <Friends userName={userName} friendsList={FriendfriendsList} setFriendsList={setFriendFriendsList} />
                </div>
            </div>
        </div>
    );
}

export default PersonalData;
