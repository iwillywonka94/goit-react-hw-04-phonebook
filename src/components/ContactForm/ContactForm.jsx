import { Component } from 'react';

import style from './contactForm.module.css'

class ContactForm extends Component {
    // Стейт

    state = {
        name: '',
        number: '',
    };

    // Метод який записує в стейт значення з інпуту

    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value,
        });
    };

    // Метод який формує новий контакт і передає в зовнішній метод і скидає значення полів форми

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({ name: '', number: '' })
    }


    render() {
        const { name, number } = this.state
        return (
            <form className={style.form} onSubmit={this.handleSubmit}>
                <label htmlFor="name" className={style.label}>Name</label>
                <input
                    value={name}
                    type="text"
                    name="name"
                    className={style.input}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
}

export default ContactForm;