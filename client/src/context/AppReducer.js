export default (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                loading: false,
                transactions: state.transactions.filter(transaction => transaction.id !==
                    action.payload)
            }
        case 'EDIT_TRANSACTION':
            return {
                ...state,
                loading: false,
                transactions: state.transactions.map(transaction => 
                    transaction.id !== action.payload.id ? transaction : action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                loading: false,
                transactions: [...state.transactions, action.payload]
            }
        case 'GET_SHOPPERS':
            return {
                ...state,
                loading: false,
                shoppers: action.payload
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            }
        
        default:
            return state;
    }
}