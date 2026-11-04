const express = require('express');
const axios = require('axios');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

router.get('/search', async (req, res) => {
  try {
    const { keyword, date, language } = req.query;

    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    const params = {
      q: keyword,
      apiKey: NEWS_API_KEY,
      sortBy: 'publishedAt',
      pageSize: 20
    };

    // ✅ FIXED DATE LOGIC
    if (date) {
      const todayUTC = new Date().toISOString().split('T')[0];

      if (date === todayUTC) {
        params.from = `${todayUTC}T00:00:00Z`;
        params.to   = new Date().toISOString();
      } else {
        params.from = `${date}T00:00:00Z`;
        params.to   = `${date}T23:59:59Z`;
      }
    }

    if (language) {
      params.language = language;
    }

    const response = await axios.get(
      `${NEWS_API_BASE_URL}/everything`,
      { params }
    );

    res.json({
      status: 'ok',
      totalResults: response.data.totalResults,
      articles: response.data.articles
    });

  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Invalid API key. Please check your NEWS_API_KEY in .env file'
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'API rate limit exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch news articles'
    });
  }
});

module.exports = router;
