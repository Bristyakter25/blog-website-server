## Blog Website (Server-Side)
### Overview:
**This blog website provides a dynamic platform for users to read, write, and interact with blog posts. Built using React, the frontend is designed to be responsive, ensuring seamless user experience across both desktop and mobile devices. Users can browse through various blog posts, interact with them, and manage their profile via secure authentication.**



### Technologies Used:
- Node.js: A JavaScript runtime used to build scalable and efficient server-side applications.
- MongoDB: A NoSQL database used to store blog posts, user data, and other dynamic content. It's highly scalable and flexible.
- JWT (JSON Web Token): Used for secure user authentication and authorization by generating a token that verifies the user's identity.
- CORS (Cross-Origin Resource Sharing): Middleware for handling requests from different domains and enabling API access from the frontend.
- dotenv: For managing environment variables and configuration settings securely (e.g., database credentials, JWT secret).
### Features:
 1. CRUD Operations for Blog Posts:
  - Create, Read, Update, and Delete blog posts.
  - Admin users can manage all posts, while regular users can only manage their own.
 2. MongoDB Database:
  - Store and manage blog posts, user data, and comments.
  - Use Mongoose for schema validation and database management.
 3. Error Handling:
  - Use try/catch blocks and middleware for centralized error handling.
  - Clear, user-friendly error messages for issues like invalid data or unauthorized access.
 4. CORS Configuration:
  - Handle requests from the frontend running on a different domain.
### Dependencies:
- Node.js: The JavaScript runtime to build the backend server.
- MongoDB: NoSQL database to store blog posts, users, and comments.
- JWT (JSON Web Token): Secure token-based authentication for users.
- dotenv: For managing environment variables (e.g., database credentials, JWT secret).
- CORS: Middleware for handling cross-origin requests between the frontend and backend.
- Nodemon: Development tool to automatically restart the server during changes.



### How to Run the Project Locally

1. Clone the repository:

   git clone https://github.com/Bristyakter25/blog-website-server.git

2. Navigate into the project directory:

   cd blog-website-server

3. Install dependencies:

   npm install

4. Set up environment variables

  Create a .env file in the root directory of the project and configure the following variables:

  env
  Copy code
  PORT=5000
  MONGO_URI=your-mongodb-connection-string
  JWT_SECRET=your-secret-key

5. Run the server
   npm run dev



### Live Demo:
 **https://blog-website-8c111.web.app/**
### Github Server side repo: 
 **https://github.com/Bristyakter25/blog-website-server**
