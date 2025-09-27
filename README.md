# 📦 Inventory Management System

A **full-stack inventory management application** with a **Next.js frontend** and an **Express.js backend**, powered by **MongoDB** for storage and secured with **JWT authentication**.

---

## 🔗 Live Demo

👉 [inventory-management-mini.vercel.app](https://inventory-management-mini.vercel.app)

---

## 🚀 Features

* 📊 **Real-time inventory tracking & stats**
* 🔍 **Search & filter** products
* ➕ **Add new products** with details
* ✏️ **Update product** information
* 🗑️ **Delete products**
* 👤 **User registration & login system**
* 🔐 **JWT-based authentication** with protected routes
* 🎨 **Modern responsive UI** (Tailwind CSS + shadcn/ui + Lucide icons)
* 🛡️ **Secure backend** with password hashing & token validation

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ **Next.js 14** (App Router)
* 📝 **TypeScript**
* 🎨 **Tailwind CSS**
* 🧩 **shadcn/ui**
* 🖼️ **Lucide React**

### Backend

* 🚀 **Express.js**
* 🍃 **MongoDB** + **Mongoose**
* 🔑 **JWT** for authentication
* 🔒 **bcryptjs** for password hashing
* 🌍 **CORS**
* ⚙️ **dotenv**

---

## ⚡ Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB
* npm or yarn package manager

---

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Run the backend:

```bash
npm run dev
```

Backend runs at: **[http://localhost:5000](http://localhost:5000)**

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Authentication Flow

1. **Register** → New users sign up with username & password
2. **Login** → Valid credentials generate a JWT token
3. **Token Storage** → Stored securely in `localStorage`
4. **Protected Routes** → Inventory APIs require a valid token
5. **Auto-logout** → Expired/invalid tokens redirect to login

---

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description       | Auth |
| ------ | -------------------- | ----------------- | ---- |
| POST   | `/api/auth/register` | Register new user | ❌    |
| POST   | `/api/auth/login`    | User login        | ❌    |

### Products (Protected)

| Method | Endpoint            | Description      | Auth |
| ------ | ------------------- | ---------------- | ---- |
| GET    | `/api/products`     | Get all products | ✅    |
| POST   | `/api/products`     | Create product   | ✅    |
| PUT    | `/api/products/:id` | Update product   | ✅    |
| DELETE | `/api/products/:id` | Delete product   | ✅    |

🔑 Add this header for protected requests:

```
Authorization: Bearer <jwt-token>
```

---

## 🛡️ Security Features

* Password hashing with **bcrypt**
* Token-based **JWT authentication**
* Middleware for **protected routes**
* **Auto logout** on invalid/expired tokens

---

## 📱 Features Overview

* Secure **auth system**
* **Dashboard** with inventory stats
* Full **CRUD** product management
* **Search & filter**
* **Responsive UI** for desktop & mobile
* **Real-time updates**

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch → `git checkout -b feature/amazing-feature`
3. Commit changes → `git commit -m "Add amazing feature"`
4. Push branch → `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

Licensed under the [MIT License](LICENSE).

---

## 💡 Support

If you face issues, please open a GitHub issue or start a discussion.
