import { useGetTransactionsQuery } from "../api/apiSlice";

export default function IncomeExpenses() {
  const {data: transactions = []} = useGetTransactionsQuery()
    const amounts = transactions.map(transaction => transaction.amount);
    const incomes = amounts.filter(amount => amount > 0);
    const expenses = amounts.filter(amount => amount < 0);
    const incomeTotal = incomes.reduce((accu, item) => accu + item, 0).toFixed(2);
    const expenseTotal = Math.abs(expenses.reduce((accu, item) => accu + item, 0)).toFixed(2);
    return (
        <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+${incomeTotal}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-${expenseTotal}</p>
        </div>
      </div>
    )
}