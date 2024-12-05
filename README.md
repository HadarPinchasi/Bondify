# Bondify  
**Linking People, Creating Bonds**  

Welcome to **Bondify**, a cutting-edge social network designed to connect friends and users around the world (much like Facebook). Bondify is a web application that combines sleek design with powerful functionality. Dive into an interactive experience that showcases modern web development techniques, featuring user management, dynamic content, and the fascinating world of **Bloom Filters**!

---
## Table of Contents  
1. [About the Project](#about-the-project)
2. [Technologies Used](#technologies-used)  
3. [Features](#features)    
4. [Getting Started](#getting-started)

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
## **Getting Started**  
### **Prerequisites**  
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
   '''bash
   npm install
3. First, make the tcp server work.
   navigate to the BloomFilter directory and run the commands:
   for compile :
   '''bash
   'g++ tcp.cpp -pthread App.cpp AddUrl.cpp CheckUrl.cpp BloomFilter.cpp H1.cpp H2.cpp IHash.cpp'
   for run:
   '''bash
   ./a.out
