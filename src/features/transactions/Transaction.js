import { deleteTransaction } from "./transactionsSlice";
import { useDispatch } from "react-redux";

export default function Transaction({transaction}) {
    const dispatch = useDispatch()

    const sign = transaction.amount > 0 ? '+' : '-'

    function handleDelete(id) {
        dispatch(deleteTransaction(id))
    }

    return (
        <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
            {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span><button onClick={() => handleDelete(transaction.id)} className="delete-btn">x</button>
        </li>
    )
}