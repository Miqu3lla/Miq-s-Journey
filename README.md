# Miq's Journey 🚀

A personal learning journal and progress tracker - your private space to document coding experiences, track growth, and organize thoughts.

## 📖 Overview

Miq's Journey is a full-stack web application that serves as a personalized social media-like platform for tracking learning progress. It combines the journaling experience with an intuitive dashboard to help visualize your coding journey over time.

## ✨ Features

- **Personal Dashboard**: Access your personalized space to view all your learning entries
- **Create Entries**: Document your daily learning progress, thoughts, and experiences
- **Progress Timeline**: Track your journey over time with timestamped posts
- **Secure Authentication**: Login system to keep your journey private
- **Tag System**: Organize posts with custom tags for easy filtering

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Iconify** - Icon framework
- **Axios** - HTTP client
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Miq-s-Journey/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database schemas
│   ├── router/          # API routes
│   ├── app.js           # Express app configuration
│   ├── index.js         # Server entry point
│   └── miq.js           # User seed script
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable Vue components
│   │   ├── router/      # Vue Router configuration
│   │   ├── stores/      # State management
│   │   ├── styles/      # Global styles
│   │   └── views/       # Page components
│   └── public/          # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Miqu3lla/Miq-s-Journey.git
   cd Miq-s-Journey
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGOOSE_URI=your_mongodb_connection_string
   PORT=4000
   ```

4. **Seed the database (optional)**
   ```bash
   node miq.js
   ```

5. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:4000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 🎯 API Endpoints

### Posts
- `POST /api/post` - Create a new post
- `GET /api/post` - Get all posts

### User
- `POST /api/user/login` - User login

## 🎨 Design Features

- Gradient backgrounds with smooth transitions
- Responsive design (desktop and mobile)
- Interactive hover effects
- Modern card-based UI
- Clean and minimal interface

## 🔒 Security

- Password hashing with bcrypt (12 salt rounds)
- Pre-save middleware for automatic password hashing
- Environment variables for sensitive data
- CORS enabled for secure cross-origin requests

## 📝 Future Enhancements

- [ ] Rich text editor for posts
- [ ] Image upload functionality
- [ ] Search and filter posts
- [ ] Export journal entries
- [ ] Dark/Light theme toggle
- [ ] Analytics dashboard
- [ ] Comment system for self-reflection
- [ ] Categories and advanced tagging

## 👤 Author

**Miquella**
- GitHub: [@Miqu3lla](https://github.com/Miqu3lla)

## 📄 License

This project is a personal learning project.

---

*Built with ❤️ as part of my coding journey*
