import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";


const Transaction = ({transaction, displayModal}) => {

    const { deleteTransaction } = useContext(GlobalContext);


        return (
            <li className='transaction-li' style={{borderColor: transaction.shopper.color}}>
                <label className="transaction-card-title">{transaction.title}</label>
                <label>
                    {Math.abs(transaction.amount).toFixed(2)} PLN
                </label>
                <button onClick={() => displayModal(transaction.id)} className="fontawesome-btn padding-x edit-btn">
                    <FontAwesomeIcon icon={faPen} size='xs' />
                </button>
                <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn fontawesome-btn">
                    <FontAwesomeIcon icon={faTrash} size='xs' />
                </button>
            </li>
         )
}

export default Transaction