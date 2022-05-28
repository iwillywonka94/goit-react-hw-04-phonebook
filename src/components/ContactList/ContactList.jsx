import PropTypes from 'prop-types'
import ContactListItem from "components/ContactListItem";

import style from './contactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
    const contact = contacts.map(({id, name, number}) => (<ContactListItem key={id} contact={[id, name, number]} deleteContact={deleteContact}/>))
    return (
        <ul className={style.list}>
            {contact}
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
    deleteContact: PropTypes.func.isRequired,
}


export default ContactList;