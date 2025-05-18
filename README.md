![Assignment-3](https://i.ibb.co.com/qNWgN9v/DALL-E-2024-12-19-21-40-45-A-detailed-illustration-capturing-the-essence-of-collaborative-problem-so.webp)

<h1 align="center">
  Assignment  project - 3 🚀
</h1>

 # 📝 Blog Management API

I developed a robust backend for a blog site enabling both **user** and **admin** operations, including full CRUD functionality, authentication, and authorization. Users can create, read, update, and delete their blogs, while admins have extended privileges to manage all content. Advanced features include search and filter capabilities for efficient content discovery. The backend is built with modern technologies: Node.js, Express.js, TypeScript, and MongoDB, ensuring scalability and type safety. JWT-based authentication secures user sessions, while role-based authorization protects resources. The application demonstrates clean architecture, modularity, and high performance, making it an efficient and secure solution for a blogging platform.

* * *


## Technologies

*   **TypeScript**
*   **Node.js**
*   **Express.js**
*   **MongoDB with Mongoose**
*   **Zod**
*   **cros**
*   **dotenv**
*   **http-status-codes**
*   **JWT**
*   **bycrpt**


* * *



## 🚀 Features

### User Roles
- **Admin**:
  - Block users.
  - Delete any blog.
  - **Cannot update blogs.**
- **User**:
  - Register and log in.
  - Create, update, and delete their own blogs.
  - **Cannot perform admin actions.**

### Core Features
- **Authentication & Authorization**:
  - Secure JWT-based authentication.
  - Role-based access control for admin and users.
- **Blog API**:
  - Public access to blog listings.
  - Advanced functionalities: search, sort, and filter.

---

## 🛠️ API Endpoints

### Authentication
- **Register**: `POST /api/auth/register`  
- **Login**: `POST /api/auth/login`

### Blog Management
- **Create Blog**: `POST /api/blogs` (Logged-in users only)
- **Update Blog**: `PATCH /api/blogs/:id` (Blog owner only)
- **Delete Blog**: `DELETE /api/blogs/:id` (Blog owner only)
- **View Blogs**: `GET /api/blogs` (Public API with search, sort, filter)

### Admin Actions
- **Block User**: `PATCH /api/admin/users/:userId/block`
- **Delete Any Blog**: `DELETE /api/admin/blogs/:id`

---

## 🛡️ Error Handling
All errors are returned in a structured format with clear messages and status codes.

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details" }
}
```
## 🛠 Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/omarfarukesham/assignment-3.git
   cd assignment-3.git

## 👤 Author

**Omar**  
[GitHub](https://github.com/omarfarukesham) | [LinkedIn](https://www.linkedin.com/in/omar-faruk-reactjsdev/)

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for exploring this project! 🚀
