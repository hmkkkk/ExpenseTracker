import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../context/GlobalState";
import { formatDateForInputFromApi, formatDateForInputFromDate } from "../Helpers/DateHelpers"
import { toast } from "react-toastify";
import SelectOption from "./SelectOption"

const EditExpenseModalForm = ({transaction, modalVisible, setModalVisible}) => {
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(formatDateForInputFromDate(new Date()))
    const [shopperId, setShopperId] = useState(1)

    const { editTransaction, getUsersList, shoppers } = useContext(GlobalContext);

    useEffect(() => {
        getUsersList();
        if (transaction) {
            setTitle(transaction.title)
            setAmount(transaction.amount)
            setDate(formatDateForInputFromApi(transaction.date))
            setShopperId(transaction.shopper.id)
        }
        
    }, [transaction]);


    const submitForm = e => {
        e.preventDefault()
        
        const formData = {
            amount, title, date, shopperId,
            id: transaction.id
        }

        toast.promise(
            editTransaction(formData),
            {
              pending: 'Wysyłanie zmian',
              success: 'Zapisano!',
              error: 'Nie udało się edytować'
            })
        setModalVisible(false)
    }

    return ( 
        <>
            <div className={"modal " + (modalVisible ? "modal-visible" : "")}>
                <div className="modal-content">
                    <div className="flex justify-between">
                        <h2>Edytuj wpłatę</h2>
                        <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
                    </div>
                    <form onSubmit={submitForm}>
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
                </div>
            </div>
        </>
    )
}

export default EditExpenseModalForm;