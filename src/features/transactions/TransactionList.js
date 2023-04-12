import Transaction from './Transaction'
import { useGetTransactionsQuery, selectTransactions } from "./transactionsSlice";
import { useSelector } from 'react-redux';

export default function TransactionList() {
    const transactions = useSelector(selectTransactions)
    const {
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
        content = <p style={{color: 'red'}}>Please connect to the json server at port 3010</p>
        // npx json-server --watch data/db.json --port 3010
        console.log(error.error)
    }
    return (
        <>
            <h3>History</h3>
            {content}
        </>
    )
}