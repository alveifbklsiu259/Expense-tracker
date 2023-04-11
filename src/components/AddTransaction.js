import { GlobalContext } from "../context/GlobalState";
import { useState, useContext} from "react"
import Swal from 'sweetalert2'

export default function AddTransaction() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const {dispatch} = useContext(GlobalContext);
    const cansave = [text, amount].every(Boolean)

    function handleAddTransaction() {
        if (cansave) {
            dispatch({
                type: "ADD_TRANSACTION",
                payload: {
                    id: (Math.random() * 100000000).toFixed(0),
                    text,
                    amount: Number(amount)
                }
            });
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