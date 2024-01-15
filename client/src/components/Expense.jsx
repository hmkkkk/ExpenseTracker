import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const Transaction = ({transaction}) => {

    const { deleteTransaction } = useContext(GlobalContext);
    library.add(faTrash);

        return (
            <li className='transaction-li' style={{borderColor: transaction.shopper.color}}>
                <label className="transaction-card-title">{transaction.title}</label>
                <label>
                    {Math.abs(transaction.amount).toFixed(2)} PLN
                </label>
                <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">
                    <FontAwesomeIcon icon={faTrash} size='xs' />
                </button>
            </li>
         )
}

export default Transaction