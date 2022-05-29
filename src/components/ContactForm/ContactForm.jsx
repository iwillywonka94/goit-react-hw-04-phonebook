import { useState } from 'react';
import PropTypes from 'prop-types';

import style from './contactForm.module.css'

const ContactForm = ({ onSubmit }) => {
    const [state, setState] = useState({
        name: '',
        number: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setState({
            ...state,
            [name]: value,
        })
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({...state})
        setState({ name: '', number: '' })
    }

    const { name, number } = state
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="name" className={style.label}>Name</label>
            <input
                value={name}
                type="text"
                name="name"
                className={style.input}
                onChange={handleChange}
                placeholder="Please enter a name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />

            <label htmlFor="name" className={style.label}>Number</label>
            <input
                value={number}
                type="tel"
                name="number"
                className={style.input}
                onChange={handleChange}
                placeholder="Please enter a phone number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />

            <div className={style.button_container}>
                <button type="submit" className={style.button}>
                    Add Contact
                </button>
            </div>
        </form>
    )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;