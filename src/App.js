import './App.css';
import Header from './features/transactions/Header';
import Balance from './features/transactions/Balance'
import IncomeExpenses from './features/transactions/IncomeExpenses'
import TransactionList from './features/transactions/TransactionList'
import AddTransaction from './features/transactions/AddTransaction'

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </>
  )
}

export default App;
