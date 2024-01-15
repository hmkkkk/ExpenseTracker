import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const BulletPoint = ({shopper}) => {
    library.add(faCircle);

    return (
        <li>
            <label><FontAwesomeIcon className='bullet-point' icon={faCircle} size='xs' style={{color: shopper.color}} /></label>
            <label>{shopper.name}</label>
        </li>
        )
}

export default BulletPoint