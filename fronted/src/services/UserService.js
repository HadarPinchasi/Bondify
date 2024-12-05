export const deleteUser = async (userName, token) => {
    try {
        const res = await fetch('http://localhost:12345/api/users/' + userName, {
            method: 'DELETE',
            headers: {
                'authorization': 'bearer ' + token
            }
        });

        if (res.status === 200) {
            return { success: true };
        } else if (res.status === 401 || res.status === 403) {
            console.log('You are not allowed to delete this account');
            return { success: false, error: 'Unauthorized' };
        } else if (res.status === 404) {
            console.log('User not found');
            return { success: false, error: 'User not found' };
        } else {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: error.message };
    }
};


export const updateUser = async (userName, userData, token) => {
    try {
        const response = await fetch(`http://localhost:12345/api/users/${userName}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'authorization': `bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(response.status === 404 ? 'User not found' : 'Unauthorized');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('An error occurred while updating the user');  // או שגיאה יותר מפורטת
    }
};

