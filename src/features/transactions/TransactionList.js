import { selectTransactions, selectStatus } from "./transactionsSlice";
import { useSelector } from 'react-redux'
import Transaction from './Transaction'

export default function TransactionList() {
    const transactions = useSelector(selectTransactions) ?? []
    let content;
    const loadingStatus = useSelector(selectStatus);
    if (loadingStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (loadingStatus === 'idle') {
        content = (
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction}/>
                ))}
            </ul>
        )
    }
    return (
        <>
            <h3>History</h3>
            {content}
        </>
    )
}