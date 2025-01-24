import React from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchNews from './FetchNews';
import { NewsList, NewsItem, NewsTitle, ToggleButton, SavedLinkItem } from '../styles/Styled-Components';

const NewsPage = ({ category, language }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['news', category, language], 
    queryFn: () => fetchNews(category, language),
  });

  const [bookmarkedArticles, setBookmarkedArticles] = React.useState(
    JSON.parse(localStorage.getItem('bookmarkedArticles')) || []
  );

  const toggleBookmark = (article) => {
    const isAlreadyBookmarked = bookmarkedArticles.some((savedArticle) => savedArticle.url === article.url);

    const updatedBookmarks = isAlreadyBookmarked
      ? bookmarkedArticles.filter((savedArticle) => savedArticle.url !== article.url) // Remove if already bookmarked
      : [...bookmarkedArticles, article]; // Add if not bookmarked

    setBookmarkedArticles(updatedBookmarks);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
  };

  if (isLoading) return <p>Loading news...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  // Ensure proper structure of data 
  const articles = data && data.data ? data.data : [];

  return (
    <div>
      <h1>Top Headlines - {category}</h1>

      <NewsList>
        {articles.map((article) => {
          const isSaved = bookmarkedArticles.some((savedArticle) => savedArticle.url === article.url);
          return (
            <NewsItem key={article.url}> 
              <NewsTitle href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </NewsTitle>
              <ToggleButton
                isSaved={isSaved}
                onClick={() => toggleBookmark(article)}
              >
                {isSaved ? 'Remove' : 'Save'}
              </ToggleButton>
            </NewsItem>
          );
        })}
      </NewsList>

      <div>
        <h2>Saved Articles</h2>
        <ul>
          {bookmarkedArticles.map((article) => (
            <SavedLinkItem key={article.url}> {/* Use article.url as the key */}
              <NewsTitle href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </NewsTitle>
            </SavedLinkItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsPage;

