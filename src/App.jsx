import { useState, useRef, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

import ContactForm from './components/ContactForm';
import ContactList from "components/ContactList";
import Filter from "components/Filter";

import './index.css'

function App() {

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      const contacts = localStorage.getItem('contacts');
      const parseContacts = JSON.parse(contacts);
      if (contacts?.length) {
        setContacts(parseContacts);
      }
      firstRender.current = false;

    }
  }, [])

  console.log(contacts);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts])

  const addContact = newContact => {
    const duplicate = contacts.find(contact => contact.name === newContact.name)
    if (duplicate) {
      alert(`${newContact.name} is already on contacts`);
      return;
    }
    setContacts(prevState => {
      const { name, number } = newContact;
      const contact = {
        id: nanoid(),
        name,
        number,
      }
      return [...prevState, contact]
      
    })
  }

  const deleteContact = useCallback(
    id => {
      const del = contacts.filter(contact => contact.id !== id)
      setContacts(del)
    }, [contacts, setContacts]
  );

  const changeFilter = useCallback(
    event => {
      setFilter(event.currentTarget.value)
    }, [setFilter]
  );

  const getFilterContact = () => {
    if (!filter) {
      return contacts;
    }
    const filterContact = filter.toLowerCase();
    const filteredContact = contacts.filter(({ name }) => {
      const result = name.toLowerCase().includes(filterContact)
      return result;
    })

    return filteredContact;
  }

  const filterContacts = getFilterContact()

  console.log(filterContacts);
  return (
    <div className="container">
      <h1>Phone book</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filterContacts} deleteContact={deleteContact} />
    </div>
  )

}

export default App;