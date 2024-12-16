import React from 'react';
import { useNews } from '../../../hooks/useNews';
import { Newspaper, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

interface NewsSectionProps {
  fullWidth?: boolean;
  compact?: boolean;
}

export function NewsSection({ fullWidth = false, compact = false }: NewsSectionProps) {
  const { articles, isLoading, error, fetchNews } = useNews();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`h-full flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl p-4 transition-all duration-300
      ${fullWidth ? 'animate-in fade-in slide-in-from-right' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-white">Industry News</h2>
        <button
          onClick={fetchNews}
          disabled={isLoading}
          className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5
            flex items-center gap-2 transition-all duration-300 text-sm
            hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        >
          <Newspaper className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className={`flex-1 overflow-y-auto space-y-3 min-h-0
        scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
        hover:scrollbar-thumb-white/20 ${compact ? 'max-h-[calc(50vh-8rem)]' : ''}`}>
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <div className="text-center py-8">
            <Newspaper className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/50 text-sm">
              No news articles found. Try refreshing.
            </p>
          </div>
        )}

        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block group bg-white/5 hover:bg-white/10 rounded-xl p-3
              transition-all duration-300 hover:-translate-y-1
              ${compact ? 'p-2' : 'p-3'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className={`text-white font-medium group-hover:text-blue-400 
                  transition-colors line-clamp-2 ${compact ? 'text-sm' : ''}`}>
                  {article.title}
                </h3>
                {!compact && (
                  <div className="flex items-center gap-2 text-xs mt-2">
                    <span className="text-white/50 truncate">
                      {article.source}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 flex-shrink-0">
                      {formatDate(article.published_at)}
                    </span>
                  </div>
                )}
              </div>
              <ExternalLink className={`text-white/30 group-hover:text-blue-400 
                transition-colors flex-shrink-0 ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}