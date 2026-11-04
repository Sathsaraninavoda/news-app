# News App

A simple web application to search and display news articles using the NewsAPI. Built with Node.js, Express, HTML, CSS, and JavaScript.

## Features

- 🔍 Search news articles by keyword
- 📅 Filter by date
- 🌍 Filter by language
- 📱 Responsive design with modern UI
- 🎨 Beautiful card-based layout for articles

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A NewsAPI key (free at [newsapi.org](https://newsapi.org/))

## Project Structure

```
news-app/
├── server.js              # Express server entry point
├── routes/
│   └── news.js           # News API routes
├── public/               # Frontend files
│   ├── index.html       # Main HTML file
│   ├── css/
│   │   └── style.css    # Stylesheet
│   └── js/
│       └── app.js       # Frontend JavaScript
├── package.json         # Node.js dependencies
├── .env                 # Environment variables (create this)
├── .env.example         # Example environment file
└── README.md           # This file
```

## Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Get a NewsAPI key:**
   - Visit [https://newsapi.org/](https://newsapi.org/)
   - Sign up for a free account
   - Copy your API key

5. **Add your API key to `.env`:**
   ```
   NEWS_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

## Running the Application

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000`

3. **Search for news:**
   - Enter a keyword (required)
   - Optionally select a date
   - Optionally select a language
   - Click "Search News"

## API Endpoints

### GET `/api/news/search`

Search for news articles.

**Query Parameters:**
- `keyword` (required): Search keyword
- `date` (optional): Date in YYYY-MM-DD format
- `language` (optional): Language code (en, es, fr, de, etc.)

**Example:**
```
GET /api/news/search?keyword=technology&date=2024-01-15&language=en
```

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Axios (HTTP client)
  - dotenv (environment variables)
  - CORS

- **Frontend:**
  - HTML5
  - CSS3 (with Flexbox and Grid)
  - Vanilla JavaScript (ES6+)

## Notes

- The free NewsAPI plan has rate limits (100 requests per day)
- Some articles may not have images or descriptions
- The API may take a few seconds to respond

## Troubleshooting

**Error: "Invalid API key"**
- Make sure your `.env` file exists and contains a valid `NEWS_API_KEY`
- Restart the server after updating `.env`

**Error: "API rate limit exceeded"**
- You've exceeded the free tier limit (100 requests/day)
- Wait 24 hours or upgrade your NewsAPI plan

**No articles found**
- Try different keywords
- Check if the date is not too far in the future
- Some keywords may not return results

## License

ISC




