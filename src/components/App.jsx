import { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactForm from './ContactsForm/ContactForm';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    this.setState({ contacts: JSON.parse(contacts) });
  }
  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  isNameInPhonebook = name => {
    const nameInLowerCase = name.toLowerCase();
    for (const contact of this.state.contacts) {
      if (contact.name.toLowerCase() === nameInLowerCase) {
        return true;
      }
    }
    return false;
  };

  addContact = contact => {
    const { name } = contact;
    if (!this.isNameInPhonebook(name)) {
      contact.id = nanoid(5);
      this.setState(prevState => prevState.contacts.push(contact));
    } else {
      alert(`${name} is already in contacts`);
    }
  };
  onFilterChange = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value.toLowerCase() });
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return (
      <div
        style={{
          fontSize: 22,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter value={this.state.filter} onChange={this.onFilterChange} />
        <h2>Contacts</h2>
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
