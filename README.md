# Grama Niladhari Management System

A comprehensive full-stack web application for managing Grama Niladhari (Village Officer) services in Sri Lanka. This system facilitates administrative tasks, citizen requests, institute registrations, certificate generation, and email notifications.
User Page - 
![GramaNildhari User Home](https://github.com/user-attachments/assets/cbdc54ae-aa75-404d-95d6-bd99468b1d72)

Admin Page -
![adminHome](https://github.com/user-attachments/assets/0db4ade1-2e5a-457b-9973-4c1d2601d3d2)
 
## Features

- **Admin Management**: Secure admin login and registration system
- **Citizen Services**: Handle citizen requests and certificate generation
- **Institute Management**: Register and manage institutes
- **Certificate Generation**: Automated PDF certificate creation with admin signatures
- **Email Notifications**: Send certificates and notifications via email
- **File Upload**: Support for document and signature uploads
- **Responsive Design**: Mobile-friendly interface using Bootstrap

## Tech Stack

### Frontend
- React 19.1.1
- Vite (build tool)
- React Router DOM (routing)
- Bootstrap 5.3.8 (styling)
- Axios (HTTP client)
- Framer Motion (animations)
- AOS (animate on scroll)

### Backend
- Node.js with Express 5.1.0
- MongoDB with Mongoose 8.18.2
- JWT (authentication)
- Multer (file uploads)
- Nodemailer (email service)
- PDFKit & Puppeteer (PDF generation)
- CORS (cross-origin resource sharing)

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (version 5.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd grama-niladhari-vite
```

### 2. MongoDB Setup

#### Option A: Local MongoDB Installation

1. **Install MongoDB**:
   - Download and install MongoDB from the official website
   - Follow the installation instructions for your operating system

2. **Start MongoDB Service**:
   ```bash
   # On Windows (run as Administrator)
   net start MongoDB

   # On macOS (using Homebrew)
   brew services start mongodb/brew/mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

3. **Create Database**:
   - Open MongoDB Shell or MongoDB Compass
   - Create a database named `grama_niladhari` (optional, Mongoose will create it automatically)

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the "Connect" section

### 3. Backend Setup

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the `server` directory with the following variables:

   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/grama_niladhari
   # For MongoDB Atlas, use:
   # MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/grama_niladhari?retryWrites=true&w=majority

   # Server
   PORT=5000

   # Email Configuration (for notifications)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # JWT Secret (generate a random string)
   JWT_SECRET=your-jwt-secret-key-here

   # File Upload
   UPLOAD_PATH=./uploads
   ```

   **Note**: For Gmail, you'll need to generate an "App Password" in your Google Account settings.

4. **Start the backend server**:
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

   The server will start on `http://localhost:5000`

### 4. Frontend Setup

1. **Open a new terminal and navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Usage

### Accessing the Application

1. Open your browser and navigate to `http://localhost:5173`
2. For admin access, go to `/admin` to login or register

### API Endpoints

The backend provides the following main API endpoints:

- **Admin Routes** (`/api/admin`):
  - `POST /login` - Admin login
  - `POST /register` - Admin registration
  - `GET /profile` - Get admin profile

- **Certificate Routes** (`/api/certificates`):
  - `POST /generate` - Generate certificate
  - `GET /` - Get all certificates

- **Institute Routes** (`/api/institutes`):
  - `POST /register` - Register institute
  - `GET /requests` - Get institute requests

- **Citizen Routes** (`/api/citizen`):
  - `POST /request` - Submit citizen request
  - `GET /requests` - Get citizen requests

- **Email Routes** (`/api/email`):
  - `POST /send` - Send email with certificate

## Project Structure

```
grama-niladhari-vite/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── Admin/     # Admin pages
│   │   │   └── User/      # User pages
│   │   ├── styles/        # CSS stylesheets
│   │   └── assets/        # Images and icons
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── uploads/          # File uploads directory
│   ├── db.js             # Database connection
│   ├── server.js         # Main server file
│   └── package.json
├── README.md              # This file
└── TODO.md               # Development tasks
```

## Development

### Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend linting
cd client
npm run lint
```

### Building for Production

```bash
# Build frontend
cd client
npm run build

# The built files will be in client/dist/
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check your `MONGO_URI` in `.env`
   - For Atlas, whitelist your IP address

2. **Port Already in Use**:
   - Change the `PORT` in `.env` or stop other processes using port 5000

3. **Email Not Sending**:
   - Verify your Gmail credentials
   - Enable "Less secure app access" or use App Passwords
   - Check spam folder

4. **File Upload Issues**:
   - Ensure the `uploads` directory exists and has write permissions
   - Check file size limits in your server configuration

### Environment Variables

Make sure all required environment variables are set in `server/.env`:

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `EMAIL_USER`: Email address for notifications
- `EMAIL_PASS`: Email password or app password
- `JWT_SECRET`: Secret key for JWT tokens

## Support

For support, please contact the development team or create an issue in the repository.

---

**Note**: This application is designed for use by authorized Grama Niladhari officers and related administrative personnel. Ensure proper authentication and authorization measures are in place before deployment.
