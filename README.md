# Web-Application 
This is a web application where users can register, log in, view all users, and search for specific users by username. The application saves JWT tokens in cookies for authentication.  

## Prerequisites  
- **Node.js** (Must be installed)  
- **MongoDB** (Database connection required)  

## Features  
- User registration with duplicate checks  
- Secure login with password hashing  
- Dashboard displaying all users and individual user data  
- Search functionality to find users by username  

## Technologies Used  
- **Backend:** Node.js, Express, Mongoose  
- **Frontend:** EJS  
- **Authentication & Security:** JWT, bcrypt.js, cookie-parser, dotenv  

## How It Works  
1. **Home Page (Sign-up Page):** Users enter their details to register. The system checks if they already exist.  
2. **Login Page:** Validates credentials against hashed passwords stored in the database.  
3. **Dashboard:** Displays all users' data and the logged-in user’s data.  
4. **Search Feature:** Allows searching for users by username.  
5. **JWT Token:** Stored in cookies for authentication.  

## Setup & Installation  
1. Install dependencies:
   ```bash
   npm install
   
2. start the server:
   ```bash
   node server.js
   
4. Open the application in the browser via localhost.
   http://localhost:3000/

Now, you can navigate through the web app and test all the features.  

