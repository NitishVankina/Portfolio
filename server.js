const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware for static file serving
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique name for each file
    }
});
const upload = multer({ storage: storage });

// API endpoint to get all posts
app.get('/posts', (req, res) => {
    fs.readFile('public/posts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to load posts' });
        }
        res.json(JSON.parse(data));
    });
});

// API endpoint to save a new post
app.post('/save-post', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : ''; // Save the image path if exists

    const newPost = { title, content, imagePath };

    fs.readFile('public/posts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read posts' });
        }

        const posts = JSON.parse(data);
        posts.push(newPost); // Add the new post to the posts array

        fs.writeFile('public/posts.json', JSON.stringify(posts), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Unable to save post' });
            }
            res.status(200).json({ message: 'Post saved successfully' });
        });
    });
});

// Create the 'uploads' folder if it doesn't exist
fs.existsSync('public/uploads') || fs.mkdirSync('public/uploads');

// Ensure the posts file exists
fs.existsSync('public/posts.json') || fs.writeFileSync('public/posts.json', JSON.stringify([]));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
