import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../context/GlobalState";
import { formatDateForInputFromDate } from "../Helpers/DateHelpers"
import { toast } from "react-toastify";
import SelectOption from "./SelectOption"

const NewExpenseForm = () => {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(formatDateForInputFromDate(new Date()))
    const [shopperId, setShopperId] = useState(1)
    const [formVisible, setFormVisible] = useState(false)

    const { addTransaction, getUsersList, shoppers } = useContext(GlobalContext);

    useEffect(() => {
        getUsersList();
    }, []);


    const submitForm = e => {
        e.preventDefault()
        
        const formData = {
            amount, title, date, shopperId
        }

        toast.promise(
            addTransaction(formData),
            {
              pending: 'Wysyłanie zmian',
              success: 'Zapisano nową wpłatę!',
              error: 'Nie udało się dodać wpłaty'
            })
        
        
        setTitle('')
        setAmount(0)
        setDate(formatDateForInputFromDate(new Date()))
        setShopperId(1)
        setFormVisible(false)
    }

    const toggleForm = () => {
        setFormVisible(!formVisible)
    }

    if (!formVisible) {
        return (
            <>
                <div className="flex justify-center">
                    <button className="addButton" type="button" onClick={toggleForm}>Chcę dodać wpłatę 🤓</button>
                </div>
            </>
        )
    }

    return ( 
        <>
            <div className="flex justify-center">
                <button className="addButton" type="button" onClick={toggleForm}>Chcę dodać wpłatę 🤓</button>
            </div>
            <form onSubmit={submitForm}>
                <h3 className="border-bottom">Nowa wpłata</h3>
                <div>
                    <label className="formLabel">Tytuł</label>
                    <input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="wprowadź tytuł" />
                </div>
                <div>
                    <label className="formLabel">Kwota</label>
                    <input required type="number" step={0.01} min={0.01} value={amount} onChange={e => setAmount(e.target.value)} placeholder="wprowadź kwotę" />
                </div>
                <div>
                    <label className="formLabel">Data</label>
                    <input required type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="wprowadź datę" />
                </div>
                <div>
                    <label className="formLabel">Kupujący</label>
                    <select required value={shopperId} onChange={e => setShopperId(e.target.value)}>
                        {shoppers.map(shopper => (<SelectOption key={shopper.id} option={shopper} />))}
                    </select>
                </div>
                <div className="flex justify-center">
                    <button className="submitButton" type="submit">Zapisz</button>
                </div>
            </form>
        </>
    )
}

export default NewExpenseForm