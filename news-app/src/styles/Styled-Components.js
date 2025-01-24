import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
  color: #fff;

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
    font-weight: 500;

    &:hover {
      color: #00d1ff;
      text-decoration: none;
    }

    &:focus,
    &:active {
      color: #00d1ff; 
      border-bottom: 2px solid #00d1ff;
    }
  }
`;

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #e6f7ff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const NewsList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const NewsItem = styled.li`
  padding: 1.5rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f7f7f7;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;

export const NewsTitle = styled.a`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #007bff;
  }
`;

// Wrapper for the Language Selector
export const SelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
`;

// Button Styles
export const LanguageButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;


  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    border: 2px solid white; 
    box-shadow: 3px rgba(0, 123, 255, 0.5);
  }

  &:active {
    background-color: #004085;
    transform: scale(0.98);
  }
`;

export const ToggleButton = styled.button`
  width: 120px; 
  height: 40px;
  background-color: ${(props) => (props.isSaved ? '#dc3545' : '#007bff')}; 
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 20px;
`;

export const SavedLinkItem = styled.li`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;

  &:hover {
    background-color: #f7f7f7;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const ClearButton = styled.button`
  margin-top: 1rem;
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #a71d2a;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #dc3545;
  }

  &:active {
    background-color: #800e1a;
    transform: scale(0.98);
  }
`;

