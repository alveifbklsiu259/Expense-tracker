import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3010'}),
    tagTypes: ['transaction'],
    endpoints: builder => ({
        getTransactions: builder.query({
            query: () => '/transactions',
            providesTags: ['transaction']
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
                url: `transactions/${id}`,
                method: "DELETE"
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