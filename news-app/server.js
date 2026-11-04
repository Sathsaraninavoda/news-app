require('dotenv').config();

if (!process.env.NEWS_API_KEY) {
  console.error('ERROR: NEWS_API_KEY is not set. Add it to your .env file.');
  process.exit(1);
}

const express = require('express');
const path = require('path');
const cors = require('cors');

const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/news', newsRoutes);

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




