# README: User Authentication, Contacts, Groups, and Messaging API

## Overview
This project is a Node.js-based API for user authentication, contact management, group chats, and messaging functionalities. It uses Express as the web framework, MongoDB as the database, and JWT for secure token-based authentication. The project is designed to handle user signups, logins, profile management, file uploads (such as profile images and message attachments), contact searches, group chats, and messaging between users.

## Features
- **User Authentication:** Secure signup, login, and JWT-based session management.
- **Profile Management:** Users can update their profiles, upload/remove profile images, and retrieve user information.
- **Contact Management:** Search and retrieve a list of user contacts for messaging purposes.
- **Group Chats:** Users can create and join groups and retrieve messages specific to groups.
- **Messaging:** Users can send and retrieve messages, with support for file uploads in messages.

## Technologies Used
- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building the API.
- **MongoDB**: Database for storing user and message information.
- **JWT**: JSON Web Tokens for user authentication.
- **Multer**: Middleware for handling file uploads.
- **Mongoose**: ODM for MongoDB.
- **HTTP Status Codes**: Consistent response statuses for HTTP operations.

## Setup

### Prerequisites
- Node.js installed on your machine.
- MongoDB instance running (local or cloud).
- Postman or any API testing tool for testing routes.
- Any terminal for running commands.
- React.js installed on your machine

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Auth Routes (User Authentication & Profile Management)
| Method | Endpoint                | Description                                      | Authentication Required |
|--------|-------------------------|--------------------------------------------------|--------------------------|
| POST   | `/api/auth/signup`       | Register a new user                              | No                       |
| POST   | `/api/auth/login`        | User login and session creation                  | No                       |
| GET    | `/api/auth/userInfo`     | Retrieve authenticated user information          | Yes                      |
| POST   | `/api/auth/updateProfile`| Update user profile information                  | Yes                      |
| POST   | `/api/auth/addProfileImage` | Upload and set user profile image               | Yes                      |
| DELETE | `/api/auth/removeProfileImage` | Remove the user's profile image                | Yes                      |
| POST   | `/api/auth/logout`       | Logout the current user by clearing JWT cookie   | Yes                      |

### Contacts Routes (Search & Retrieve Contacts)
| Method | Endpoint                | Description                                      | Authentication Required |
|--------|-------------------------|--------------------------------------------------|--------------------------|
| POST   | `/api/contacts/search`   | Search contacts by name or email                 | Yes                      |
| GET    | `/api/contacts/getContactsForIM` | Retrieve user contacts for instant messaging  | Yes                      |
| GET    | `/api/contacts/getAllContacts` | Retrieve all contacts of a user               | Yes                      |

### Group Routes (Group Management & Messaging)
| Method | Endpoint                | Description                                      | Authentication Required |
|--------|-------------------------|--------------------------------------------------|--------------------------|
| POST   | `/api/groups/createGroup`| Create a new group                               | Yes                      |
| GET    | `/api/groups/getUserGroups` | Retrieve groups for the logged-in user         | Yes                      |
| GET    | `/api/groups/getGroupMessages/:groupId` | Get messages from a specific group           | Yes                      |

### Messaging Routes (Direct Messaging & File Uploads)
| Method | Endpoint                | Description                                      | Authentication Required |
|--------|-------------------------|--------------------------------------------------|--------------------------|
| POST   | `/api/messages/getMessages` | Retrieve direct messages between users         | Yes                      |
| POST   | `/api/messages/uploadFiles` | Upload files attached to messages              | Yes                      |

## Middleware

- **`authMiddleware.js`**: This middleware checks if the user is authenticated by verifying the JWT token in the request headers. Unauthorized access is blocked if the token is invalid or missing.

## Models

1. **User Model (`userModel.js`)**:
   - Handles user-related data such as email, password, profile image, and JWT token storage.
   - Includes methods for password hashing and JWT generation.
   
2. **Message Model (`messageModel.js`)**:
   - Handles the storage and retrieval of messages exchanged between users.
   
3. **Group Model (`groupModel.js`)**:
   - Stores information related to group chats such as group name, members, and messages.

## Error Handling

- **Custom Errors**: The application uses custom error classes such as `BadRequestError`, `UnauthenticatedError`, and `NotFoundError` to handle different types of errors and ensure consistent error responses.

## File Uploads

- **Multer**: The API uses Multer for handling file uploads. The following routes handle different types of file uploads:
  - `/api/auth/addProfileImage`: Uploads a profile image to the "uploads/profiles" directory.
  - `/api/messages/uploadFiles`: Uploads files attached to messages to the "uploads/files" directory.

## Authentication

- **JWT Tokens**: The API uses JWT tokens to authenticate users. Tokens are generated upon signup and login, and stored in cookies for secure, session-based authentication.
- **Cookies**: Tokens are set as HTTP-only cookies for enhanced security.

## License

This project is open-source and available for use under the [MIT License](LICENSE).

## Contribution

If you wish to contribute, feel free to fork the repository, make changes, and submit a pull request.

## Contact

For any queries or feedback, please reach out to [Ibrahim Farooq](mailto:your-email@example.com).

---

This README provides a structured overview of the key features, setup, and usage of this API.
