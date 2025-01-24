import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './styles/Styled-Components';
import LanguageSelector from './Components/LanguageSelector';
import HomePage from './Components/HomePage';
import NewsPage from './Components/NewsPage';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = React.useState('en');

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar>
          <Link to="/">Home</Link>
          <Link to="/business">Business</Link>
          <Link to="/technology">Technology</Link>
          <Link to="/sports">Sports</Link>
          <Link to="/entertainment">Entertainment</Link>
          <Link to="/science">Science</Link>
        </Navbar>
        <LanguageSelector onSelect={setLanguage} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business" element={<NewsPage category="business" language={language} />} />
          <Route path="/technology" element={<NewsPage category="tech" language={language} />} />
          <Route path="/sports" element={<NewsPage category="sports" language={language} />} />
          <Route path="/entertainment" element={<NewsPage category="entertainment" language={language} />} />
          <Route path="/science" element={<NewsPage category="science" language={language} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

