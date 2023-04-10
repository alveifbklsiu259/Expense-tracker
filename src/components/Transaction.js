import { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

export default function Transaction({transaction}) {
    const {dispatch} = useContext(GlobalContext)

    const sign = transaction.amount > 0 ? '+' : '-'

    function handleDelete(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    return (
        <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
            {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span><button onClick={() => handleDelete(transaction.id)} className="delete-btn">x</button>
        </li>
    )
}