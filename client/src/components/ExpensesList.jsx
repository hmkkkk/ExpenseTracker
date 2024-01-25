import Expense from "./Expense";
import BulletPoint from "./BulletPoint";
import ExpensesListFilters from "./ExpensesListFilters";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import EditExpenseModalForm from "./EditExpenseModalForm";

const ExpensesList = () => {
    const { transactions, shoppers, getTransactions, dbLoading, getUsersList, getTransaction } = useContext(GlobalContext);

    const [transactionToEdit, setTransactionToEdit] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getTransactions(0);
        getUsersList();
    }, []);

    const displayModal = async id => {
        const transaction = await getTransaction(id);
        setTransactionToEdit(transaction)
        setModalVisible(true)
    }
    
    if (!dbLoading) {
        return (
            <>
                <h3 className="border-bottom">Historia</h3>
                <div className="flex justify-center">
                    <div className="loader"></div> 
                </div>
            </>)
    }
        
    return (
        <>
            <h3 className="border-bottom">Historia</h3>
            <ExpensesListFilters />
            <h4>Legenda</h4>
            <ul className="colored-bullet-list">
                {shoppers.map(shopper => (<BulletPoint key={shopper.id} shopper={shopper} />))}
            </ul>
            <ul className="list">
                {transactions.map(transaction => (<Expense key={transaction.id} transaction={transaction} displayModal={displayModal} /> ))}
            </ul> 

            <h2>SUMA: {transactions.reduce((sum, curr) => sum + curr.amount ,0)} PLN</h2>

            <EditExpenseModalForm transaction={transactionToEdit} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}

export default ExpensesList