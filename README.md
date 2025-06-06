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
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the root directory and add the following:

   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   DB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   ```

4. Run the application:
   ```bash
   node app.js
   ```

5. Open your browser and visit: [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
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
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository  
2. Create your feature branch  
3. Commit your changes  
4. Push to the branch  
5. Open a pull request  
