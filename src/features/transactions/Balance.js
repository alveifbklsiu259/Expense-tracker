import { useGetTransactionsQuery } from "../api/apiSlice";

export default function Balance() {
    const {data: transactions = []} = useGetTransactionsQuery()
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((accumulator, item) => {
        return accumulator + item
    }, 0).toFixed(2)
    return (
        <>
            <h4>Your Balance</h4>
            <h1>${total}</h1>
        </>

    )
}