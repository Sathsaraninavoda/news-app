const searchForm = document.getElementById('searchForm');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const resultsInfo = document.getElementById('resultsInfo');
const articlesContainer = document.getElementById('articlesContainer');

// Handle form submission
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const keyword = document.getElementById('keyword').value.trim();
    const date = document.getElementById('date').value;
    const language = document.getElementById('language').value;

    // Hide previous results and errors
    hideError();
    hideResults();
    
    // Show loading
    showLoading();

    try {
        // Build query parameters
        const params = new URLSearchParams({ keyword });
        if (date) params.append('date', date);
        if (language) params.append('language', language);

        // Fetch news from backend
        const response = await fetch(`/api/news/search?${params.toString()}`);
        const data = await response.json();

        hideLoading();

        if (!response.ok) {
            showError(data.error || 'Failed to fetch news articles');
            return;
        }

        // Display results
        displayResults(data);

    } catch (err) {
        hideLoading();
        showError('Network error: Could not connect to the server. Please try again.');
        console.error('Error:', err);
    }
});

function displayResults(data) {
    if (!data.articles || data.articles.length === 0) {
        showError('No articles found. Try different search terms.');
        return;
    }

    // Show results info
    resultsInfo.textContent = `Found ${data.totalResults} article(s). Showing ${data.articles.length} result(s).`;
    resultsInfo.classList.remove('hidden');

    // Clear previous articles
    articlesContainer.innerHTML = '';

    // Create article cards
    data.articles.forEach(article => {
        const card = createArticleCard(article);
        articlesContainer.appendChild(card);
    });
}

function getSafeUrl(url) {
    try {
        const parsed = new URL(url, window.location.origin);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.href;
        }
    } catch (err) {
        return null;
    }
    return null;
}

function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'article-card';

    // Format date
    const publishedDate = article.publishedAt 
        ? new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'Date not available';

    // Get source name
    const sourceName = article.source?.name || 'Unknown Source';

    // Image with fallback
    const noImage = document.createElement('div');
    noImage.className = 'no-image';
    noImage.textContent = 'No Image Available';

    const imageUrl = article.urlToImage ? getSafeUrl(article.urlToImage) : null;

    if (imageUrl) {
        const image = document.createElement('img');
        image.className = 'article-image';
        image.src = imageUrl;
        image.alt = article.title || 'News article image';
        image.addEventListener('error', () => {
            image.classList.add('hidden');
            noImage.classList.remove('hidden');
        });
        card.appendChild(image);
        noImage.classList.add('hidden');
    }

    card.appendChild(noImage);

    // Meta (source + date)
    const meta = document.createElement('div');
    meta.className = 'article-meta';

    const sourceSpan = document.createElement('span');
    sourceSpan.textContent = sourceName;

    const dateSpan = document.createElement('span');
    dateSpan.textContent = publishedDate;

    meta.append(sourceSpan, dateSpan);
    card.appendChild(meta);

    const title = document.createElement('h3');
    title.textContent = article.title || 'No Title';
    card.appendChild(title);

    const description = document.createElement('p');
    description.textContent = article.description || 'No description available.';
    card.appendChild(description);

    const articleUrl = article.url ? getSafeUrl(article.url) : null;
    if (articleUrl) {
        const link = document.createElement('a');
        link.href = articleUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'article-link';
        link.textContent = 'Read Full Article →';
        card.appendChild(link);
    }

    return card;
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function hideResults() {
    resultsInfo.classList.add('hidden');
    articlesContainer.innerHTML = '';
}




