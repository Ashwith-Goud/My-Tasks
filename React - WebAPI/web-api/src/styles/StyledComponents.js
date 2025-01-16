import styled from 'styled-components';

export const PageWrapper = styled.div`
  font: sans-serif; 
  margin: 20px auto;
  padding: 30px;
  max-width: 1100px;
  background: rgb(173,216,230);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); 
  border-radius: 12px;
`;

export const Title = styled.h1`
  color: #333333; 
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); 
`;

export const Button = styled.button`
  padding: 12px 28px;
  background: linear-gradient(to right, #007bff, #0056b3); 
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  

  &:hover {
    background: linear-gradient(to right, #0056b3, #004085);
    transform: scale(1.05); 
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 30px;
  padding: 10px;
`;

export const Card = styled.div`
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  background: #ffffff;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);  
  }

  p {
    margin: 8px 0;
    font-size: 1rem;
    color: #495057;
  }
`;

export const Address = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ced4da;
  border-radius: 10px;
  background: #f8f9fa; 
  font-size: 0.9rem;
  line-height: 1.5;

  p {
    margin: 5px 0;
    color: #6c757d;
  }
`;

export const StyledSearchInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 16px;
    margin: 0 10px;
  }
`;
