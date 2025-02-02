import React, { createContext, useReducer, useContext } from 'react';

// Load data from localStorage
const loadState = (key, defaultValue) => {
    try {
        const storedState = localStorage.getItem(key);
        return storedState ? JSON.parse(storedState) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};

// Save data to localStorage
const saveState = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

const initialState = {
    products: [],
    orders: loadState('orders', []),
    allOrders: loadState('allOrders', []),
};

const productReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'SET_PRODUCTS':
            newState = { ...state, products: action.payload };
            break;

        case 'ADD_ORDER':
            const newOrder = {
                ...action.payload, 
                id: Date.now(), 
            };
            
            newState = {
                ...state,
                orders: [...state.orders, newOrder],
                allOrders: [...state.allOrders, newOrder], 
            };
            break;

// In the 'CONFIRM_ORDER' case, add the confirmed order to allOrders as well
        case 'CONFIRM_ORDER':
            const confirmedOrder = state.orders.find(order => order.id === action.payload.orderId);
            newState = {
                ...state,
                orders: state.orders.map(order =>
                order.id === action.payload.orderId ? { ...order, isConfirmed: true } : order
            ),
            allOrders: state.allOrders.concat(confirmedOrder), // Add confirmed order to allOrders
        };
        break;

        case 'CANCEL_ORDER':
            newState = {
                ...state,
                orders: Array.isArray(state.orders) ? state.orders.filter(order => order.id !== action.payload) : [],
                allOrders: Array.isArray(state.allOrders) ? state.allOrders.filter(order => order.id !== action.payload) : [],
            };
            break;

        case 'CANCEL_ORDER_ADMIN':
            newState = {
                ...state,
                allOrders: Array.isArray(state.allOrders) ? state.allOrders.filter(order => order.id !== action.payload) : [],
            };
            break;

        default:
            return state;
    }

    saveState('orders', newState.orders);
    saveState('allOrders', newState.allOrders);

    return newState;
};


// Create context
const ProductContext = createContext();

// ProductProvider component to wrap the app
export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use the context
export const useProductContext = () => useContext(ProductContext);

// Fetch products function
export const fetchProducts = async (dispatch) => {
    try {
        const response = await fetch('/path/to/api/products');
        const data = await response.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};


