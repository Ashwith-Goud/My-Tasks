import React from 'react';
import { Container, NewsTitle, SavedLinkItem ,ClearButton } from '../styles/Styled-Components';

const HomePage = ({ setSavedArticles }) => {
  const savedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];

  const clearLocalStorage = () => {
    localStorage.removeItem('bookmarkedArticles'); // Remove all saved articles
    if (setSavedArticles) {
      setSavedArticles([]);
    }
    alert('All saved articles have been removed.');
  };

  return (
    <Container>
      <h1>Welcome to the News Portal</h1>
      <p>Select a category from the navigation bar to view the latest news.</p>

      {savedArticles.length > 0 ? (
        <div>
          <h2>Saved Articles</h2>
          <ul>
            {savedArticles.map((article, index) => (
              <SavedLinkItem key={index}>
                <NewsTitle href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </NewsTitle>
              </SavedLinkItem>
            ))}
          </ul>
          <ClearButton onClick={clearLocalStorage} style={{ marginTop: '1rem' }}>
            Clear Saved Articles
          </ClearButton> {/* Added button */}
        </div>
      ) : (
        <p>No articles saved yet. Start exploring and save your favorites!</p>
      )}
    </Container>
  );
};

export default HomePage;

