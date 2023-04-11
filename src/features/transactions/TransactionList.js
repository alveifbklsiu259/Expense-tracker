import Transaction from './Transaction'
import { useGetTransactionsQuery } from "../api/apiSlice";

export default function TransactionList() {
    const {
        data: transactions,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTransactionsQuery()


    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = (
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction}/>
                ))}
            </ul>
        )
    } else if (isError) {
        content = <p>{error.toString()}</p>
    }
    return (
        <>
            <h3>History</h3>
            {content}
        </>
    )
}