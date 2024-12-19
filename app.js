const express = require('express');
const db = require("./db");

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Received login request:', { username, password });

    // Check if user exists
    const [rows] = await db.query('SELECT * FROM login WHERE username = ?', [username]);
    console.log("rows : ", rows)

    if (!rows || rows.length === 0) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    console.log('User found:', user);

    // Compare the provided password directly with the stored password
    if (password !== user.password) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const [existingUsers] = await db.query('SELECT * FROM login WHERE username = ?', [username]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert the new user into the database
    await db.query('INSERT INTO login (username, password) VALUES (?, ?)', [username, password]);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(9000, () => {
  console.log('API listening on port 9000');
});
