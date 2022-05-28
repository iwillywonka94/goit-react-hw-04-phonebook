import { Component } from "react";
import { nanoid } from "nanoid";

import ContactForm from './components/ContactForm';
import ContactList from "components/ContactList";
import Filter from "components/Filter";

import './index.css'

class App extends Component {

  // Стейт

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount () {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts })
    }

  };

  componentDidUpdate ( prevProps ,prevState ) {
    const currentStateContacts = this.state.contacts;
    const preventStateContacts = prevState.contacts;

    if( currentStateContacts !== preventStateContacts ) {
      localStorage.setItem('contacts', JSON.stringify(currentStateContacts))
    }

  };

  // Метод який виконує перевірку на дуплікати стейт і нові контакти, та записує в стейт значення отримані від сабміту по формі

  addContact = (newContact) => {
    const duplicate = this.state.contacts.find(contact => contact.name === newContact.name)
    if(duplicate) {
      alert(`${newContact.name} is already on contacts`);
      return;
    }
    this.setState((prevState) =>  {
      const contact = {
        id: nanoid(),
        name: newContact.name,
        number: newContact.number
      }
      return {
        contacts: [...prevState.contacts, contact]
      }
    });
  };

  // Метод для відслідковування поля фільтрації та запису в стейт

  changeFilter = (event) => {
    this.setState({filter: event.currentTarget.value})
  }

  // Метод для видалення контактів з Contact List

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilterContact = () => {
    const { filter, contacts } = this.state;
    if(!filter) {
      return contacts;
    }
    const filterContact = filter.toLowerCase();
    const filteredContact = contacts.filter(({ name }) => {
      const result = name.toLowerCase().includes(filterContact)
      return result;
    })

    return filteredContact;
  }

  render () {
    const { filter } = this.state
    const filterContacts = this.getFilterContact();

    return (
      <div className="container">
        <h1>Phone book</h1>
        <ContactForm onSubmit={this.addContact}/>
        <h2>Contacts</h2>
        <Filter  value={filter} onChange={this.changeFilter}/>
        <ContactList contacts={filterContacts} deleteContact={this.deleteContact}/>
      </div>
    )
  }
}

export default App;