import PropTypes from 'prop-types'
import style from './contactListItem.module.css'

const ContactListItem = ({ contact, deleteContact}) => {
    const [ id, name, number ] = contact
    return (
        <li className={style.item}>
            <span className={style.span}>{ name }</span>
            <a href={`tel:${number}`} className={style.link}>{number}</a>
            <button 
            type="button"
            className={style.button_delete}
            onClick={() => deleteContact(id)}
            >
                Delete
            </button>
        </li>
    )
}

ContactListItem.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
    deleteContact: PropTypes.func.isRequired,
}

export default ContactListItem