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
# memoryVault
