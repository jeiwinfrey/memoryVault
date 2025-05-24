# Product Requirements Document: Memory Vault

## 0. Project Context
- **Project Name:** Memory Vault
- **Subject:** Web Application Development

## 1. Introduction & Objective
Design and build a calm, aesthetically pleasing web application where customers can privately store personal memories (title, caption, and images) in their own individual vault. Each customer account corresponds to one private vault. Memories are visible only to the account owner and can be filtered by date.

## 2. Target User
Customers who want a personal, digital space to privately store meaningful moments.

### 2.1. User Profile
- Each user has their own private vault, created upon signup.

### 2.2. Use Cases
- Journaling personal thoughts and experiences.
- Storing photo memories with context (titles, captions, dates).
- Emotional reflection and revisiting past moments.

## 3. Aesthetic & Design Guidelines

### 3.1. Theme
Calm, soft, positive – inspired by Lo-Fi aesthetics.

### 3.2. Colors
Pastel tones, soft gradients, warm backgrounds.

### 3.3. Typography
Rounded or handwritten fonts.

### 3.4. UI Elements
Rounded buttons, smooth transitions, soft shadows, relaxing background patterns.

## 4. Core Features

### 4.1. User Authentication
- **Process:** Simple signup and login.
- **Credentials:**
    - Email
    - Password
- **Security:** Credentials to be stored securely in the database.
- **Access Control:** Only the logged-in user can access their memories.
- **Sign Out:** Users must be able to sign out of their account.

### 4.2. Add Memory
- **Form Inputs:**
    - Title (text)
    - Caption (textarea)
    - Date (date picker)
    - Image Upload (multiple images, no strict limit)
- **Validation:**
    - **File types:** `.jpg`, `.jpeg`, `.png`

### 4.3. View Memories
- **Display Order:** Reverse chronological order.
- **Memory Card Content:**
    - Title
    - Date
    - Caption
    - Image carousel (e.g., using Bootstrap) for uploaded images.

### 4.4. Edit Memory
- **Editable Fields:**
    - Title
    - Caption
    - Date
- **Image Management:**
    - Add new images
    - Delete existing images

### 4.5. Delete Memory
- **Functionality:** Permanently delete a memory and all its associated images.

### 4.6. Filter Memories by Date
- **Mechanism:** Allow users to select a start and end date.
- **Result:** Display only memory entries within the selected date range.

## 5. Technical Requirements

### 5.1. Frontend
- **Technologies:** HTML, Bootstrap, jQuery
- **Key Aspects:**
    - Responsive design using Bootstrap grid and cards.
    - jQuery-based form submission and AJAX requests for dynamic interactions.
    - Bootstrap carousel for displaying memory images.
    - UI component for date filtering.

### 5.2. Backend
- **Technologies:** Node.js, Express.js
- **Key Aspects:**
    - RESTful API routes for all CRUD operations and user authentication.
    - Multer for handling image uploads.

### 5.3. Database
- **System:** MySQL

## 6. Non-Functional Requirements

### 6.1. Privacy
- Each user's memories must be strictly isolated and private to their account. Data segregation is critical.

### 6.2. Usability
- The application should be designed to be simple, intuitive, calm, and user-friendly, aligning with the Lo-Fi aesthetic.

### 6.3. Security
- Secure storage of user credentials (e.g., password hashing).
- Protection against common web vulnerabilities (e.g., XSS, CSRF, SQL Injection).

## 7. Constraints
- **Vault Model:** One user account maps to one private vault.
- **Accepted Image Formats:** `.jpg`, `.jpeg`, `.png`.


