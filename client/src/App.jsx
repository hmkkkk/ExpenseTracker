import './App.css'
import ExpensesList from './components/ExpensesList'
import NewExpenseForm from './components/NewExpenseForm'
import { GlobalProvider } from './context/GlobalState'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalProvider>
        <div className='app-card'>
          <h1 className='text-center'>😭🌸Nasze wydatki🌸😭</h1>
          <div className='container'>
            <NewExpenseForm />
            <ExpensesList />
            <ToastContainer position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light" />
          </div>
        </div>
        
      </GlobalProvider>
    </>
  )
}

export default App
