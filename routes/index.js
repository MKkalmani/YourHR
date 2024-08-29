const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db/connection'); // Separate out DB connection logic
const multer = require('multer');
const bcrypt = require('bcrypt');
// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Directory to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
    }
});

const upload = multer({ storage: storage }); // Initialize multer with the defined storage

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../home/start.html'));
})

// Signup Page
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Handle form submission
router.post('/signup', upload.single('resume'), async (req, res) => {
    const { name, email, password } = req.body;
    const resumePath = req.file.path;
  
    // Hash the password before inserting into the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Insert into MySQL database
    const sql = "INSERT INTO users (name, email, password, resume) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, resumePath], (err, result) => {
      if (err) throw err;
      res.redirect('/success');
    });
  });

// Success Page
router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/success.html'));
});

module.exports = router;
