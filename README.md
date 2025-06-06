# CampQuest

Live Demo: [campquest-5img.onrender.com](https://campquest-5img.onrender.com)

CampQuest is a full-stack web application that allows users to explore, create, and review campgrounds. This project was developed as my first full-stack endeavor, integrating various technologies to provide a seamless user experience.

## 🚀 Features

- **User Authentication**: Secure registration and login functionalities.
- **Campground Management**: Create, edit, and delete campground listings.
- **Reviews**: Add and delete reviews for campgrounds.
- **Image Upload**: Upload images for campgrounds using Cloudinary.
- **Responsive Design**: Mobile-friendly interface using Bootstrap.

## 🛠️ Tech Stack

| Category          | Technologies                          |
|-------------------|---------------------------------------|
| Frontend          | HTML5, CSS3, Bootstrap, EJS           |
| Backend           | Node.js, Express.js                   |
| Database          | MongoDB, Mongoose                     |
| Authentication    | Passport.js, Express-Session          |
| Image Storage     | Cloudinary                            |
| Deployment        | Render                                |

## 📸 Screenshots

*Note: Screenshots can be added here to showcase the application's interface.*

## 🧰 Installation & Setup

### Prerequisites

- Node.js installed on your machine.
- MongoDB installed and running locally or a MongoDB Atlas account.
- Cloudinary account for image storage.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Sushant0412/CampQuest.git
   cd CampQuest
   
### Installation

### Install dependencies
```bash
npm install

Set up environment variables
Create a .env file in the root directory and add the following:

env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
Run the application
bash
node app.js
The application will be available at http://localhost:3000.

Project Structure
text
CampQuest/
├── cloudinary/          # Cloudinary configuration
├── controllers/         # Route handlers
├── models/              # Mongoose schemas
├── public/              # Static assets
├── routes/              # Express routes
├── seeds/               # Database seed files
├── utils/               # Utility functions
├── views/               # EJS templates
├── app.js               # Main application file
├── middleware.js        # Custom middleware
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation
Contributing
Contributions are welcome! Please:

Fork the repository

Create your feature branch

Commit your changes

Push to the branch

Open a pull request

text

Key formatting notes:
1. Used proper markdown headers (## and ###)
2. Added code blocks with language specification (bash, env)
3. Maintained the directory tree structure in a code block
4. Formatted the contributing section as a numbered list
5. Used backticks for inline code and paths
6. Added proper spacing between sections

This will render correctly on GitHub and most markdown viewers while remaining perfectly readable in plain text editors.
