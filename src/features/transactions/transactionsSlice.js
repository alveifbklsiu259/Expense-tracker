import {createEntityAdapter, createSelector} from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const transactionsAdapter = createEntityAdapter();
const initialState = transactionsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransactions: builder.query({
            query: () => '/transactions',
            providesTags: ['transaction'],
            transformResponse: responseData => {
                return transactionsAdapter.setAll(initialState, responseData)
            }
        }),
        addTransaction: builder.mutation({
            query: transaction => ({
                url: '/transactions',
                method: 'POST',
                body: transaction
            }),
            invalidatesTags: ['transaction']
        }),
        deleteTransaction: builder.mutation({
            query: id => ({
                url: `/transactions/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['transaction']
        })
    })
});

export const {
    useGetTransactionsQuery,
    useAddTransactionMutation,
    useDeleteTransactionMutation
} = apiSlice;

export const selectTransactionsResult = extendedApiSlice.endpoints.getTransactions.select();

export const selectTransactionData = createSelector([selectTransactionsResult], transactionsResult => transactionsResult.data);

export const {selectAll: selectTransactions} = transactionsAdapter.getSelectors(state => selectTransactionData(state) ?? initialState)
