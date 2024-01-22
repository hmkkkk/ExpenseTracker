import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../context/GlobalState";
import { formatDateForInput } from "../Helpers/DateHelpers"
import SelectOption from "./SelectOption"

const ExpensesListFilters = () => {
    const { shoppers, getTransactions, getUsersList } = useContext(GlobalContext);
    const [dateFrom, setDateFrom] = useState(formatDateForInput(new Date()))
    const [dateTo, setDateTo] = useState(formatDateForInput(new Date()))
    const [shopperId, setShopperId] = useState(0)
    
    useEffect(() => {
        getUsersList();

        const currentDate = new Date();
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 30);
        setDateFrom(formatDateForInput(newDate));
    }, []);

    const submitForm = e => {
        e.preventDefault();

        getTransactions(shopperId, dateFrom, dateTo);
    }
    
    return (
        <>
            <h4>Filtruj</h4>
            <div className="row border-bottom padding-bottom">
                <form onSubmit={submitForm}>
                    <div>
                        <label className="formLabel">Od</label>
                        <input required type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} placeholder="wprowadź datę" />
                    </div>
                    <div>
                        <label className="formLabel">Do</label>
                        <input required type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} placeholder="wprowadź datę" />
                    </div>
                    <div>
                        <label className="formLabel">Kupujący</label>
                        <select required value={shopperId} onChange={e => setShopperId(e.target.value)}>
                            <option value={0}>Wszyscy</option>
                            {shoppers.map(shopper => (<SelectOption key={shopper.id} option={shopper} />))}
                        </select>
                    </div>
                    <div>
                        <button className="submitButton" type="submit">Filtruj</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ExpensesListFilters; 