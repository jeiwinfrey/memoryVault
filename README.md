# Memory Vault

A calm, aesthetically pleasing web application where users can privately store personal memories (title, caption, and images) in their own individual vault.

## Features

- **User Authentication**: Secure signup, login, and logout functionality
- **Memory Management**: Create, view, edit, and delete personal memories
- **Image Upload**: Support for multiple image uploads per memory
- **Date Filtering**: Filter memories by date range
- **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- **Frontend**: HTML, Bootstrap 5, jQuery
- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: Passport.js
- **File Uploads**: Multer

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a MySQL database named `memory_vault`
4. Copy `.env.example` to `.env` and update the database credentials
5. Run the application:
   ```
   npm start
   ```

## Project Structure

```
/
├── public/                  # Static assets
│   ├── css/                 # CSS files
│   ├── js/                  # JavaScript files
│   ├── images/              # Static images
│   └── uploads/             # User uploaded images
├── views/                   # EJS templates
│   ├── partials/            # Reusable template parts
│   ├── index.ejs            # Main memories view
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   ├── add-memory.ejs       # Add memory form
│   └── edit-memory.ejs      # Edit memory form
├── routes/                  # Express routes
│   ├── auth.js              # Authentication routes
│   └── memories.js          # Memory CRUD routes
├── models/                  # Sequelize models
│   ├── user.js              # User model
│   ├── memory.js            # Memory model
│   └── image.js             # Image model
├── controllers/             # Route controllers
├── config/                  # Configuration files
│   └── database.js          # Database connection
├── middleware/              # Custom middleware
│   └── isAuthenticated.js   # Auth middleware
├── .env.example             # Environment variables example
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
└── server.js                # Main application file
```

## Usage

1. Register a new account
2. Log in with your credentials
3. Add memories with title, date, caption, and images
4. View all your memories in a beautiful grid layout
5. Filter memories by date range
6. Edit or delete memories as needed

## Design

The application follows a calm, Lo-Fi aesthetic with:
- Pastel colors and soft gradients
- Rounded corners and smooth transitions
- Clean, minimalist interface
- Responsive design for all devices
# Memory Vault

A modern web application for privately storing and managing personal memories with images.

## Features

- **User Authentication**: Secure login and registration system
- **Memory Management**: Create, view, edit, and delete personal memories
- **Image Handling**: Upload multiple images per memory with preview functionality
- **Date Filtering**: Filter memories by date range
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, minimalist interface with smooth animations

## Technology Stack

### Frontend
- HTML5/CSS3
- Bootstrap 5 for responsive layout and components
- jQuery for DOM manipulation and AJAX requests
- Font Awesome for icons

### Backend
- Node.js with Express.js framework
- SQLite database for data storage
- Sequelize ORM for database interactions
- Passport.js for authentication
- Multer for handling file uploads

## Installation

1. Clone the repository
   ```
   git clone https://github.com/jeiwinfrey/memoryVault.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   SESSION_SECRET=your_session_secret_here
   ```

4. Start the application
   ```
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Usage

1. **Register/Login**: Create an account or log in to access your memories
2. **Add Memories**: Click "Add New Memory" to create a new entry with title, date, caption, and images
3. **View Memories**: Browse your memories on the home page
4. **Filter Memories**: Use the date filter to find memories from specific time periods
5. **Edit/Delete**: Manage your memories with the edit and delete options

## Design Philosophy

Memory Vault follows a calm, Lo-Fi aesthetic with:
- Pastel color palette
- Subtle animations and transitions
- Rounded corners and smooth edges
- Clean, minimalist interface
- Responsive design for all devices
