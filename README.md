# Bondify  
**Linking People, Creating Bonds**  

Welcome to **Bondify**, a cutting-edge social network designed to connect friends and users around the world (much like Facebook). Bondify is a web application that combines sleek design with powerful functionality. Dive into an interactive experience that showcases modern web development techniques, featuring user management, dynamic content, and the fascinating world of **Bloom Filters**!

Whether you're connecting with friends or exploring dynamic content, Bondify has something for everyone!

---
## Table of Contents  
1. [About the Project](#about-the-project)
2. [Technologies Used](#technologies-used)  
3. [Features](#features)    
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [ScreenShots](#screenshots)

---
## About the Project
Foobar is a web application built as part of a comprehensive project to explore and implement advanced software development concepts, including a backend server that manages all user requests. From creating a user-friendly interface inspired by Facebook's iconic design to building a high-performance Bloom Filter system for URL filtering, this app is packed with exciting features.

---

## Technologies Used
- Frontend: React, HTML5, CSS, Bootstrap
- Backend: Node.js, Express, MongoDB, c++
- Testing: Jest, React Testing Library
  
---
## Features
### 🔐 **Sign Up & Log In**
- **Sign Up**: New here? Create an account by entering a username and password. Fill out the required fields and you're ready to go!
- **Log In**: Already have an account? Log in using your credentials to access the feed.

### 📣 **Post Content**
- Share your thoughts and updates with ease—just post to your feed.
- **Post Editing & Deletion**: You can edit or delete your own posts, but not anyone else’s.
- **Malicious Link Protection**: We use the **Bloom Filter protocol** to automatically block harmful links from being posted.

### 👯 **Friends**
- **Send Friend Requests**: Discover users you'd like to connect with and send them a friend request.
- **View Friend’s Profile**: Click on a friend’s name to view their posts and personal page.
- **Manage Friendships**: Accept or reject friend requests via the right-side panel.

### 🧑‍💻 Account Settings
- **Edit Name**: Change your account name to something new.
- **Edit Profile Picture**: Update your profile picture to reflect your personality.
- **Delete Account**: Permanently delete your account if you no longer wish to use the platform.
  
---
## Getting Started
### **Prerequisites**  
- Node.js 
- NPM or Yarn  
- MongoDB 
### **Setup**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repo/Bondify.git
   cd Bondify
2. Install dependencies:
   ```bash
   npm install
3.  First, make the TCP server work.
   
   Navigate to the BloomFilter directory and run the following commands for compile and run:
   ```bash
   g++ tcp.cpp -pthread App.cpp AddUrl.cpp CheckUrl.cpp BloomFilter.cpp H1.cpp H2.cpp IHash.cpp
   ./a.out
```
4. Start the development server:
   Navigate to the backend directory and run the command:
   ```bash
   npm start
5.In your browser (no matter if chrome/ any other explorer) nacigate to 'localhost12345' and enjoy.

---

## Project Structure  

The project is built with multiple layers to ensure a modular approach:

- TCP Server handles communication and security via the Bloom Filter.
- Backend Server provides API endpoints and connects to MongoDB for persistent data.
- Web Application lets users interact with FOOBAR from any browser.

---
## Screenshots
- if you have an account you can log in by enter a userName and password
![image](https://github.com/user-attachments/assets/b6d6ed40-89d2-492b-a99c-a1e781733865)
- if you don't have an account you can sign up
![image](https://github.com/user-attachments/assets/70d48f54-b234-4628-9a4b-6f43a455d1bf)
-after log in, you can see the feed and posts of your friends.
![image](https://github.com/user-attachments/assets/bb780549-3fd9-4388-8eea-99ab1dd9bc93)
-pay attention! you can not post malicious links
![image](https://github.com/user-attachments/assets/93a6c896-b2e5-46b9-a7e5-140e57e0db07)
-you can see your own posts/your friend's posts in your own page by clickn on your name/your friend's name
![image](https://github.com/user-attachments/assets/7aebf5b6-fc21-4c1c-af60-3ab7370999b2)
- you can approve and send friend's request
![image](https://github.com/user-attachments/assets/0bfd8730-465b-4dcc-b0cf-ef4397c582a5)
-you can edit/ delete your posts
![image](https://github.com/user-attachments/assets/8a98a21b-e12b-4563-86d2-25058165a1b6)
We’ve got even more features waiting for you! Dive into our website to explore and enjoy the full experience!

---
For your own comfort: you can download these databases to your mongodb and log in as one of the users.

(We are recommendng to use the username: 'dobby', password: 'dd1234567')

[test.articles.json](https://github.com/user-attachments/files/18025893/test.articles.json)


[test.users.json](https://github.com/user-attachments/files/18025894/test.users.json)



