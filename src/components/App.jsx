import { Component } from 'react';
import Filter from './Filter/Filter';
import ContactForm from './ContactsForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  render() {
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
      </div>
    );
  }
}
