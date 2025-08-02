## 🔗 Demo Video for User Management

Watch the screen recording of the project running locally:  
Click here to watch on Google Drive =>  https://drive.google.com/file/d/1qapFP2AaoRSp6RvE2JQpj57RnaSY5hOj/view?usp=sharing


 ##   User Management Application with Role-Based Access

This is a full-stack User Management application built with **React**, **Node.js**, **Express.js**, and **MySQL**.  
It includes authentication, role-based access, email verification, and many more useful features.

---

## 🚀 Technologies Used

### 🖥️ Frontend
- React.js

### ⚙️ Backend
- Node.js
- Express.js

### 🗃️ Database
- MySQL
- Sequelize ORM

### 🧠 Caching
- Redis

---

## 🔐 Authentication & Authorization

- Used **JWT (JSON Web Token)** for secure login and authentication.
- **Role-based access**:  
  - Regular users can access user features.  
  - Admin users can log in with the same credentials (if their role is `admin`) and access the admin panel.

---

## 📧 Email Verification

- Used **NodeMailer** to send emails.
- A new user must **verify their email** after registration to activate the account.
- Included **Forget Password** feature:
  - Users can request a password reset via email verification.

---

## 👤 User Features

- Users can **upload a profile picture** using **Multer**.
- Users can **edit their username** from their profile page.

---

## 🛠️ Admin Features

- Admin can **see all registered users** in a table.
- Admin can **search users** by:
  - Name
  - Email
  - Role
- Each listed user shows:
  - Name
  - Email ID
  - Profile picture
  - Role
- Implemented **pagination** to manage large user lists.

---
