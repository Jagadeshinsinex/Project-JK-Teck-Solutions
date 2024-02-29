const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch {
    res.status(500).send();
  }
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    // Implement session or token logic here for authenticated user
    res.send('Logged in successfully');
  } else {
    res.status(400).send('Email or password is wrong');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors({
    origin: 'http://yourfrontendorigin.com' // Replace with your actual frontend origin
}));

app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.json({ success: true, email: user.email }); // Send back success status and email
    } else {
      res.json({ success: false, message: "Email or password is wrong" });
    }
  });
  

  
