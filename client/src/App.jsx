import './App.css'
import ExpensesList from './components/ExpensesList'
import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <>
      <GlobalProvider>
        <div className='app-card'>
          <h1 className='text-center'>😭🌸Nasze wydatki🌸😭</h1>
          <div className='container'>
            <ExpensesList />
          </div>
        </div>
        
      </GlobalProvider>
    </>
  )
}

export default App
