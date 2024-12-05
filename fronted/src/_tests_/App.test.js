import { render, screen, fireEvent } from '@testing-library/react';
import SignUpForm from '../Authentication/SignScreen';
import RightScreen from '../Authentication/RightScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // import BrowserRouter
import Comment from './Comment';
import Post from './Post';
import PostButtons from './PostButtons';
import '@testing-library/jest-dom/extend-expect';

describe('SignUpForm Component', () => {
    test('passwords do not match validation', () => {
        render(<SignUpForm />);

        // Simulate password and confirm password inputs
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm password');
        fireEvent.change(passwordInput, { target: { value: 'HR1234567' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'HR12345678' } });

        // Submit form
        const submitButton = screen.getByText('Sign Up');
        fireEvent.click(submitButton);

        // Assert that validation message is displayed
        expect(screen.getByText(/Rewrite your password/i)).toBeInTheDocument();
    });
});
test('handleLogin function with incorrect credentials', () => {
        const mockAlert = jest.fn();
        window.alert = mockAlert;

        // Render the RightScreen component inside BrowserRouter
        render(
            <BrowserRouter>
                <RightScreen />
            </BrowserRouter>
        );

        // Get username input field
        const usernameInput = screen.getByLabelText('User name');
        // Get password input field
        const passwordInput = screen.getByLabelText('Password');

        // Set incorrect username and password values
        fireEvent.change(usernameInput, { target: { value: 'incorrectUsername' } });
        fireEvent.change(passwordInput, { target: { value: 'incorrectPassword' } });

        // Simulate clicking the login button
        const loginButton = screen.getByText('Log In');
        fireEvent.click(loginButton);

        // Check if the user receives an alert for wrong username or password
        expect(mockAlert).toHaveBeenCalledWith('Wrong username or password');

        // Restore original window.alert
        window.alert.mockRestore();
    });
describe('Comment Component', () => {
    test('editing comment updates content ', () => {
        // Render the Comment component
        render(
            <Comment
                id={1}
                Postid={1}
                CommentprofilePicture="profile.jpg"
                CommentfirstName="John"
                CommentlastName="Doe"
                Commentcontent="Original Comment Content"
            />
        );

        // Get the comment content 
        const commentContent = screen.getByText('Original Comment Content');

        // Click on the Edit button to start editing
        const editButton = screen.getByText('Edit Comment');
        fireEvent.click(editButton);

        // Get the input field for editing
        const editInput = screen.getByRole('textbox');
        // Change the content of the comment
        fireEvent.change(editInput, { target: { value: 'Edited Comment Content' } });

        // Click on the Save button to save the changes
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // Check if the comment content has been updated
        expect(screen.queryByText('Original Comment Content')).toBeNull();
        expect(screen.getByText('Edited Comment Content')).toBeInTheDocument();
    });
});
test('editing a post updates the content', () => {
    // Mock initial post data
    const initialPost = {
        id: 1,
        profilePicture: 'profile.jpg',
        firstName: 'John',
        lastName: 'Doe',
        time: 'Today',
        content: 'Initial post content',
        photo: 'post.jpg',
        likes: 0,
        comments: [],
        shares: 0,
        onDelete: jest.fn(), // Mock the onDelete function
    };

    // Render the Post component with initial data
    render(<Post {...initialPost} />);

    // Click on the Edit button to start editing
    const editButton = screen.getByText('Edit post');
    fireEvent.click(editButton);

    // Get the input field for editing content
    const editContentInput = screen.getByDisplayValue('Initial post content');

    // Change the content of the post
    fireEvent.change(editContentInput, { target: { value: 'Edited post content' } });

    // Click on the Save button to save the changes
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Check if the post content has been updated
    expect(screen.queryByText('Initial post content')).toBeNull();
    expect(screen.getByText('Edited post content')).toBeInTheDocument();
});
describe('Comment Component2', () => {
    test(' deleting comment removes it', () => {
        // Render the Comment component
        render(
            <Comment
                id={1}
                Postid={1}
                CommentprofilePicture="profile.jpg"
                CommentfirstName="John"
                CommentlastName="Doe"
                Commentcontent="Original Comment Content"
            />
        );

        // Click on the Delete button to delete the comment
        const deleteButton = screen.getByText('Delete Comment');
        fireEvent.click(deleteButton);

        // Check if the comment is removed from the view
        expect(screen.queryByText('Edited Comment Content')).toBeNull();
    });
});
describe('SignUpForm component', () => {
    test('valid inputs', () => {
        render(<SignUpForm />);

       const firstNameInput = screen.getByLabelText('First name');
        fireEvent.change(firstNameInput, { target: { value: 'John' } });

        const lastNameInput = screen.getByLabelText('Last name');
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

        const usernameInput = screen.getByLabelText('User name');
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });

        
        const submitButton = screen.getByText('Sign Up');
        fireEvent.click(submitButton);

       
        const elements = screen.queryAllByText(/Letters only, up to about 20 letters/i);
        elements.forEach(element => {
            const textContent = element.textContent.trim(); 
            expect(textContent).toMatch(/Letters only, up to about 20 letters/i); 
        });

        expect(usernameInput.value).toBe('johndoe');
    });

    test('invalid inputs', () => {
        render(<SignUpForm />);

        const firstNameInput = screen.getByLabelText('First name');
        fireEvent.change(firstNameInput, { target: { value: '123' } });

        const lastNameInput = screen.getByLabelText('Last name');
        fireEvent.change(lastNameInput, { target: { value: 'Doe@' } });

        const usernameInput = screen.getByLabelText('User name');
        fireEvent.change(usernameInput, { target: { value: 'user name with spaces' } });

        const submitButton = screen.getByText('Sign Up');
        fireEvent.click(submitButton);

        const elements = screen.queryAllByText(/Letters only, up to about 20 letters/i);
        elements.forEach(element => {
            const textContent = element.textContent.trim(); // ���� ������ ������ ���� �����
            expect(textContent).toMatch(/Letters only, up to about 20 letters/i); 
        });

        expect(usernameInput.value).toBe('user name with spaces');
    });
});

