const initialState = {
    transactions: [],
    status: null
};

export default function transactionsReducer(state = initialState, action) {
    switch(action.type) {
        case "transactions/addTransaction" : {
            return {...state, transactions:[...state.transactions, action.payload]}
        }
        case "transactions/deleteTransaction" : {
            return {...state, transactions: state.transactions.filter(transaction => transaction.id !== action.payload)}
        }
        case "transactions/transactionsLoaded" : {
            return {...state, status: 'idle', transactions: action.payload}
        }
        case "transactions/transactionsLoading" : {
            return {...state, status: 'loading'}
        }
        case "transactions/transactionsFailed" : {
            return {...state, status: null}
        }
        default :
            return state
    };
};

// action creator
export const addTransactionCreator = transaction => {
    return {
        type: "transactions/addTransaction",
        payload: transaction
    };
};

export const deleteTransactionCreator = id => {
    return {
        type: "transactions/deleteTransaction",
        payload: id
    };
};

export const transactionsLoadingCreator = () => {
    return {
        type: 'transactions/transactionsLoading'
    };
};

export const transactionsLoadedCreator = transactions => {
    return {
        type: "transactions/transactionsLoaded",
        payload: transactions
    };
};

export const transactionsFailedCreator = () => {
    return {
        type: 'transactions/transactionsFailed'
    };
};

// thunk function

export async function getHistory(dispatch, getState) {
    dispatch(transactionsLoadingCreator())
    try {
        const response = await fetch('http://localhost:3010/transactions')
        const data = await response.json();
        dispatch(transactionsLoadedCreator(data))
    } catch {
        dispatch(transactionsFailedCreator())
    }
};

export function addTransaction(transaction) {
    return async function addTransactionThunk(dispatch, getState) {
        const response = await fetch('http://localhost:3010/transactions', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(transaction)
        });
        const data = await response.json();
        dispatch(addTransactionCreator(data))
    }
};

export function deleteTransaction(id) {
    return async function deleteTransactionThunk(dispatch, getState) {
        await fetch(`http://localhost:3010/transactions/${id}`, {
            method: "DELETE",
        });
        dispatch(deleteTransactionCreator(id))
    }
}

// selector
export const selectTransactions = state => state.transactions.transactions
export const selectStatus = state => state.transactions.status