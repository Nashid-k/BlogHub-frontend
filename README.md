# BlogHub Frontend – React.js Blogging Platform

A modern, responsive blogging frontend built with **React.js**, featuring **JWT authentication**, blog CRUD, and profile management.

## 🚀 Features

* **Auth**: Register, Login, Logout, Protected Routes
* **Blogs**: View, Create, Edit, Delete (author-only)
* **Profile**: View & update profile, manage own posts
* **UI/UX**: Responsive design, form validation, loading & error states

## 🛠 Tech Stack

* React 18, React Router DOM, Context API
* Axios, JWT (localStorage)
* CSS/SCSS, React Hooks

## 📁 Structure

```
src/
 ├── components/   # Navbar, BlogCard, BlogForm
 ├── pages/        # Home, Login, Register, Profile, Blog CRUD
 ├── context/      # AuthContext
 ├── services/     # api.js
 ├── App.jsx / index.jsx
```

## ⚡ Quick Start

```bash
git clone https://github.com/Nashid-k/bloghub-frontend.git
cd bloghub-frontend
npm install
```

Add `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Run:

```bash
npm start
```

## 🔗 API Integration

* **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`
* **Blogs**: `/api/blogs`, `/api/blogs/:id` (CRUD, auth required)
* **User**: `/api/users/me`

## 📦 Dependencies

* Core: `react`, `react-router-dom`, `axios`
* Dev: `react-scripts`, `@testing-library/react`

## 🧪 Scripts

* `npm start` – Dev server
* `npm run build` – Production build
* `npm test` – Test suite

## 👨‍💻 Author

**Nashid K**

* GitHub: [@Nashid-k](https://github.com/Nashid-k)
* Email: [nashidk1999@gmail.com](mailto:nashidk1999@gmail.com)
* LinkedIn: [Nashid K](https://www.linkedin.com/in/nashid-k-080909273/)

---

