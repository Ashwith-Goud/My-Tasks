import axios from 'axios';

const fetchNews = async (category, language) => {
  const API_TOKEN = process.env.REACT_APP_NEWS_API_TOKEN;

  try {
    const response = await axios.get('https://api.thenewsapi.com/v1/news/all', {
      params: {
        api_token: API_TOKEN,
        categories: category,
        language: language,
      },
    });
    return response.data; 
  } catch (error) {
    throw new Error('Failed to fetch news');
  }
};

export default fetchNews;

