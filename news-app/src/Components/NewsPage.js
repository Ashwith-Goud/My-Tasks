import React , {useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchNews from './FetchNews';
import { NewsList, NewsItem, NewsTitle, SaveButton, SavedLinkItem, RemoveButton } from '../styles/Styled-Components';

const NewsPage = ({category, language}) =>{
  const {data, error, isLoading} = useQuery({
    queryKey: ['news', category,language],
    queryFn: () => fetchNews(category, language),
  });

  const [bookmarkedArticles, setBookmarkedArticles] = useState(
    JSON.parse(localStorage.getItem('bookmarkedArticles')) || []
  );

  const handleBookmark = (article) => {
    const updatedBookmarks = [...bookmarkedArticles, article];
    setBookmarkedArticles(updatedBookmarks);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
  };

  const handleRemoveBookmark = (article) => {
    const updatedBookmarks = bookmarkedArticles.filter(
      (savedArticle) => savedArticle.url !== article.url );
    setBookmarkedArticles(updatedBookmarks);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
  };

  if (isLoading) return <p>Loading news...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  return (
    <div>
      <h1>Top Headlines - {category}</h1>

      <NewsList>
        {data.data.map((article, index) => (
          <NewsItem key={index}>
            <NewsTitle href={article.url} >
              {article.title}
            </NewsTitle>
            <SaveButton onClick={() => handleBookmark(article)}>Save</SaveButton>
          </NewsItem>
        ))}
      </NewsList>

      <div>
        <h2>Saved Articles</h2>
        <ul>
          {bookmarkedArticles.map((article, index) => (
            <SavedLinkItem key={index}>
              <NewsTitle href={article.url} >
                {article.title}
              </NewsTitle>
              <RemoveButton onClick={() => handleRemoveBookmark(article)}>Remove</RemoveButton>
            </SavedLinkItem>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default NewsPage;

