import Expense from "./Expense";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const ExpensesList = () => {
    const { transactions, getTransactions, dbLoading } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
    }, []);
    
    if (!dbLoading) {
        return (
            <>
                <h3 className="border-bottom">Historia</h3>
                <h4>Loading...</h4>
            </>)
    }
        
    return (
        <>
            <h3 className="border-bottom">Historia</h3>
            
            <ul className="list">
                {transactions.map(transaction => (<Expense key={transaction.id} transaction={transaction} /> ))}
            </ul> 

            <h2>SUMA: {transactions.reduce((sum, curr) => sum + curr.amount ,0)} PLN</h2>
        </>
    )
}

export default ExpensesList