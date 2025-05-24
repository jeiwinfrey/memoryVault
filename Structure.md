/Users/jeiwinfrey/Desktop/patrick gang/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   └── uploads/          // For storing user uploaded images
├── views/
│   ├── partials/         // For reusable HTML snippets (header, footer)
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs         // Homepage / Main memory view
│   ├── login.ejs         // Login page
│   ├── signup.ejs        // Signup page
│   ├── add-memory.ejs    // Form to add a new memory
│   └── edit-memory.ejs   // Form to edit an existing memory
├── routes/
│   ├── auth.js           // Authentication routes (login, signup, logout)
│   └── memories.js       // Routes for CRUD operations on memories
├── models/
│   └── user.js           // User model (if using an ORM or for DB interactions)
│   └── memory.js         // Memory model (if using an ORM or for DB interactions)
├── controllers/          // (Optional, for more complex logic separation)
│   ├── authController.js
│   └── memoryController.js
├── config/
│   └── database.js       // Database connection configuration
├── middleware/
│   └── isAuthenticated.js // Middleware to protect routes
├── .gitignore
├── package.json
├── server.js             // Main application file (Express server setup)
└── MemoryVault_PRD.md