# Node.js CRUD API with Authentication and Redis Token Blacklisting

This is a simple Node.js CRUD (Create, Read, Update, Delete) API with user authentication implemented using JSON Web Tokens (JWT) and token blacklisting with Redis. The API provides endpoints to perform operations on posts, including storing, fetching, showing, and deleting posts. 

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Set up your environment variables by creating a `.env` file and adding the necessary configuration (see `.env.example` for reference).
5. Ensure that Redis is installed and running on your machine.
6. Start the application using `npm start`.

## Usage

### Authentication

- **Register**: `POST /auth/register`
  - Registers a new user.
  - Requires a JSON object containing `name`, `email`, and `password` in the request body.

- **Login**: `POST /auth/login`
  - Logs in an existing user.
  - Requires a JSON object containing `email` and `password` in the request body.

### Posts

- **Create Post**: `POST /posts`
  - Creates a new post.
  - Requires authentication (JWT token) in the request header.
  - Requires a JSON object containing `title`, `content`, `imageUrl`, and `categoryId` in the request body.

- **Get All Posts**: `GET /posts`
  - Retrieves all posts.
  - Requires authentication (JWT token) in the request header.

- **Get Single Post**: `GET /posts/:id`
  - Retrieves a single post by ID.
  - Requires authentication (JWT token) in the request header.

- **Update Post**: `PUT /posts/:id`
  - Updates an existing post by ID.
  - Requires authentication (JWT token) in the request header.
  - Requires a JSON object containing `title`, `content`, `imageUrl`, and `categoryId` in the request body.

- **Delete Post**: `DELETE /posts/:id`
  - Deletes a post by ID.
  - Requires authentication (JWT token) in the request header.

## Technologies Used

- Node.js: Runtime environment for running JavaScript code.
- Express.js: Web application framework for building APIs.
- JSON Web Tokens (JWT): Used for authentication and authorization.
- Redis: In-memory data structure store used for token blacklisting.
- Sequelize: ORM (Object-Relational Mapping) for interacting with the database.

## Contributors

- [Your Name](https://github.com/yourusername)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
