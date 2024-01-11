import './App.css'
import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <>
      <GlobalProvider>
        <div className='container'>
          <h1>Wydatki</h1>
          <div>

          </div>
        </div>
        
      </GlobalProvider>
    </>
  )
}

export default App
