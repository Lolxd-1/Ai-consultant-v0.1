import { useState, useEffect } from 'react';
import { NewsArticle } from '../types/news';
import { fetchNewsArticles } from '../lib/api/news';

interface NewsState {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
}

export function useNews() {
  const [state, setState] = useState<NewsState>({
    articles: [],
    isLoading: false,
    error: null
  });

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const articles = await fetchNewsArticles();
      setState({
        articles,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch news'
      }));
    }
  };

  return {
    ...state,
    fetchNews
  };
}