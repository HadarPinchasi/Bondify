// services.js
export async function fetchSignInfo(formData) {
    try {
        const response = await fetch('http://localhost:12345/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.status === 409) {
            return { success: false, message: 'UserName already exists. Try another username' };
        } else if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        }
    } catch (error) {
        console.error('Error sending data to the server:', error);
        return { success: false, message: 'An unexpected error occurred while sending data. Please try again later.' };
    }
    return { success: false, message: 'Failed to submit data to the server.' };
}
