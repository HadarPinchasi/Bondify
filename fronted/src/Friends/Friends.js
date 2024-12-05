// JavaScript source code
import { useEffect } from 'react';
import Friend from "./Friend";
import { fetchFriends } from '../services/feedApi';
import { useAuth } from '../Authentication/AuthContext';

function Friends({ userName, friendsList, setFriendsList }) {
    const { token } = useAuth();

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendsData = await fetchFriends(userName, token);
                setFriendsList(friendsData);
            } catch (error) {
                console.error("Failed to fetch friends:", error);
            }
        };
        getFriends();
    }, [userName, token]);

    return (
        <ul className="list-unstyled w-100 m-2 rounded">
            <span className="object m-2" style={{ color: '#0dcaf0' }}>
                <i className="bi bi-people"></i>
            </span>{' '}
            friends:
            {friendsList.map((friend) => (
                <Friend key={friend._id} friend={friend} />
            ))}
        </ul>
    );


}

export default Friends;
