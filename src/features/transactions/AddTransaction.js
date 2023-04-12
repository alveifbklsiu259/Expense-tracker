import { useState } from "react"
import { useDispatch} from 'react-redux'
import { addTransaction } from "./transactionsSlice";
import Swal from 'sweetalert2'


export default function AddTransaction() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const cansave = [text, amount].every(Boolean)
    const dispatch = useDispatch()

    function handleAddTransaction() {
        if (cansave) {
                dispatch(addTransaction({text, amount:Number(amount), id: (Math.random() * 10000).toFixed(0)}))
                setText('');
                setAmount('');
        } else {
            Swal.fire('please enter some text and amount')
        }
    }
    return (
        <>
            <h3>Add new transaction</h3>
            <form>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input 
                        type="text" 
                        placeholder="Enter text..." 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                        >Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input 
                        type="number"
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button onClick={(e) => {e.preventDefault(); handleAddTransaction()}} className="btn">Add transaction</button>
            </form>
        </>
    )
}