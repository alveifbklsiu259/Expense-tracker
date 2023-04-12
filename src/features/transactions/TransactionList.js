import Transaction from './Transaction'
import {selectTransactions, selectStatus} from "./transactionsSlice";
import { useSelector } from 'react-redux';

export default function TransactionList() {
    const transactions = useSelector(selectTransactions);
    const status = useSelector(selectStatus)
    

    let content;
    if (status === 'loading') {
        content = <p>Loading...</p>
    } else if (status === 'idle') {
        content = (
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction}/>
                ))}
            </ul>
        )
    } else {
        content = <p style={{color: 'red'}}>Please connect to the json server at port 3010</p>
        // npx json-server --watch data/db.json --port 3010
    }
    return (
        <>
            <h3>History</h3>
            {content}
        </>
    )
}