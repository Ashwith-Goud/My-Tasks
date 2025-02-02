import { notification } from 'antd';
import data from '../data/data.json'; 

export const fetchProducts = async (dispatch) => {
  try {
    const allProducts = data.products; 

    // Dispatch action to set the fetched products into context
    dispatch({ type: 'SET_PRODUCTS', payload: allProducts });
  } catch (error) {
    notification.error({
      message: 'Failed to load products',
      description: error.message,
    });
  }
};
