import { createContext, useReducer, useState } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    transactions: [],
    shoppers: [],
    error: null,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [loading, setLoading] = useState(null);
    const [dbLoading, setDbLoading] = useState(null);


    async function getUsersList() {
        try {
            const res = await axios.get(`/api/Shoppers`);
            setDbLoading(true);
            dispatch({
                type: 'GET_SHOPPERS',
                payload: res.data,
                
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getTransactions(uid, dateFrom, dateTo) {
        
        try {
            const res = await axios.get(`/api/Expenses?uid=${uid}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
            setDbLoading(true);
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data,
                
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

   async function deleteTransaction(id) {
        try {
            await axios.delete(`api/Expenses/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
        
    }

    async function editTransaction(transaction) {
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put('/api/Expenses', transaction, config)
            dispatch({
                type: 'EDIT_TRANSACTION',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
        
    }

    async function addTransaction(transaction) {
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/Expenses', transaction, config)
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
        
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading,
        dbLoading,
        setDbLoading,
        getTransactions,
        deleteTransaction,
        editTransaction,
        addTransaction,
        getUsersList,
        setLoading
    }}>
        {children}
    </GlobalContext.Provider>);
}