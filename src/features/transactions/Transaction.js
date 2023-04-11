import { useDeleteTransactionMutation } from "./transactionsSlice";

export default function Transaction({transaction}) {
    const [deleteTransaction] = useDeleteTransactionMutation() 

    const sign = transaction.amount > 0 ? '+' : '-'

    async function handleDelete(id) {
        await deleteTransaction(id)
    }

    return (
        <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
            {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span><button onClick={() => handleDelete(transaction.id)} className="delete-btn">x</button>
        </li>
    )
}