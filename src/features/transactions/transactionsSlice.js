import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    transactions: []
};

export const getHistory = createAsyncThunk('transactions/getHistory', async () => {
    const response = await fetch('http://localhost:3010/transactions');
    const data = await response.json();
    return data
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (transaction) => {
    const response = await fetch('http://localhost:3010/transactions', {
        method: "POST",
        headers: {
            "Content-type":  "application/json"
        },
        body: JSON.stringify(transaction)
    });
    const data = await response.json();
    return data
});

export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async (id) => {
    await fetch(`http://localhost:3010/transactions/${id}`, {
        method: "DELETE",
    });
    return id;
})

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getHistory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.transactions = action.payload
                state.status = 'idle'
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                return {...state, transactions: [...state.transactions, action.payload]}
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                return {...state, transactions: state.transactions.filter(transaction => transaction.id !== action.payload)}
            })
    }
});

export default transactionsSlice.reducer;

export const selectTransactions = state => state.transactions.transactions;
export const selectStatus = state => state.transactions.status