# User Authentication and Profile Management API

This API provides user authentication and profile management functionalities, including user registration, login, token generation, and profile updates. The API is designed to handle various user-related operations and is implemented using Node.js with MongoDB as the database.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Usage](#usage)
- [License](#license)

## Installation

To install and set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:

    ```bash
    npm start
    ```

## Environment Variables

The following environment variables need to be configured in a `.env` file at the root of the project:

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: The secret key for JWT token generation.
- `REFRESH_TOKEN_SECRET`: The secret key for refresh token generation.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image uploads.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.

## API Endpoints

### 1. **Register User**

   - **Endpoint**: `/api/auth/register`
   - **Method**: `POST`
   - **Description**: Registers a new user and uploads their avatar to Cloudinary.
   - **Request Body**:
     ```json
     {
       "fullName": "John Doe",
       "email": "john@example.com",
       "username": "johndoe",
       "password": "password123",
       "avatar": "avatar_file"
     }
     ```
   - **Response**:
     - `201`: User registered successfully.
     - `400`: Missing required fields.
     - `409`: User already exists.

### 2. **Login User**

   - **Endpoint**: `/api/auth/login`
   - **Method**: `POST`
   - **Description**: Logs in the user by validating credentials and generating access and refresh tokens.
   - **Request Body**:
     ```json
     {
       "username": "johndoe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     - `200`: User logged in successfully.
     - `400`: Missing required fields.
     - `404`: User not found.
     - `401`: Invalid credentials.

### 3. **Logout User**

   - **Endpoint**: `/api/auth/logout`
   - **Method**: `POST`
   - **Description**: Logs out the user by clearing their refresh token and cookies.
   - **Response**:
     - `200`: User logged out successfully.

### 4. **Refresh Access Token**

   - **Endpoint**: `/api/auth/refresh-token`
   - **Method**: `POST`
   - **Description**: Generates a new access token using a valid refresh token.
   - **Request Body**:
     ```json
     {
       "refreshToken": "your_refresh_token"
     }
     ```
   - **Response**:
     - `200`: Access token refreshed successfully.
     - `401`: Unauthorized request.

### 5. **Change Current Password**

   - **Endpoint**: `/api/auth/change-password`
   - **Method**: `POST`
   - **Description**: Changes the user's password after validating the old password.
   - **Request Body**:
     ```json
     {
       "oldPassword": "old_password",
       "newPassword": "new_password"
     }
     ```
   - **Response**:
     - `200`: Password changed successfully.
     - `400`: Invalid old password.

### 6. **Get Current User**

   - **Endpoint**: `/api/auth/me`
   - **Method**: `GET`
   - **Description**: Retrieves the current user's profile.
   - **Response**:
     - `200`: User fetched successfully.

### 7. **Update Account Details**

   - **Endpoint**: `/api/auth/update-account`
   - **Method**: `PUT`
   - **Description**: Updates the user's account details like full name and email.
   - **Request Body**:
     ```json
     {
       "fullName": "John Doe",
       "email": "john_new@example.com"
     }
     ```
   - **Response**:
     - `200`: Account details updated successfully.
     - `400`: Missing required fields.

### 8. **Update User Avatar**

   - **Endpoint**: `/api/auth/update-avatar`
   - **Method**: `PUT`
   - **Description**: Updates the user's avatar by uploading a new image to Cloudinary.
   - **Request Body**:
     ```json
     {
       "avatar": "new_avatar_file"
     }
     ```
   - **Response**:
     - `200`: Avatar image updated successfully.
     - `400`: Avatar file is missing or upload error.

### 9. **Update User Cover Image**

   - **Endpoint**: `/api/auth/update-cover-image`
   - **Method**: `PUT`
   - **Description**: Updates the user's cover image by uploading a new image to Cloudinary.
   - **Request Body**:
     ```json
     {
       "coverImage": "new_cover_image_file"
     }
     ```
   - **Response**:
     - `200`: Cover image updated successfully.
     - `400`: Cover image file is missing or upload error.

### 10. **Get User Channel Profile**

   - **Endpoint**: `/api/users/:username`
   - **Method**: `GET`
   - **Description**: Retrieves a user's public channel profile based on their username.
   - **Response**:
     - `200`: User channel fetched successfully.
     - `400`: Missing username.
     - `404`: Channel does not exist.

### 11. **Get User Watch History**

   - **Endpoint**: `/api/users/watch-history`
   - **Method**: `GET`
   - **Description**: Retrieves the user's watch history.
   - **Response**:
     - `200`: Watch history fetched successfully.

## Error Handling

All errors are handled using the `ApiError` class. The API returns a structured JSON response with the following fields:

- `statusCode`: The HTTP status code.
- `message`: A message describing the error.
- `errors`: Additional error details, if any.

## Usage

To interact with the API, you can use tools like Postman or cURL. Ensure that the necessary environment variables are configured and that the MongoDB instance is running.

### Example Request

```bash
curl -X POST \
  http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123"
  }'
