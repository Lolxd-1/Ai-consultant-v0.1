import { NewsArticle } from '../../types/news';

const API_KEY = 'a043c5c9911423af89d420b8d7fe0e6d';
const BASE_URL = 'https://gnews.io/api/v4/search';

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const params = new URLSearchParams({
      q: 'restaurant OR hotel OR hospitality OR dining OR tourism',
      lang: 'en',
      country: 'in',
      max: '6',
      apikey: API_KEY,
      from: yesterday.toISOString(),
      sortby: 'publishedAt'
    });

    const cacheKey = 'news_cache';
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem('news_cache_timestamp');

    // Check if we have valid cached data (less than 5 minutes old)
    if (cachedData && cacheTimestamp) {
      const cacheAge = Date.now() - parseInt(cacheTimestamp);
      if (cacheAge < 5 * 60 * 1000) { // 5 minutes
        return JSON.parse(cachedData);
      }
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0] || 'Failed to fetch news');
    }

    const articles = data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      published_at: article.publishedAt,
      url: article.url
    }));

    // Cache the results
    localStorage.setItem(cacheKey, JSON.stringify(articles));
    localStorage.setItem('news_cache_timestamp', Date.now().toString());

    return articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch news');
  }
}