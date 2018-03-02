import React from 'react';

import SingleContact from './singlecontact.js';

class PhonebookContent extends React.Component {
    render() {
        if(this.props.visibleLetter == "tutti") {
            return(
                <section className="col-sm-12 table-responsive">
                    <AllContacts contactsList={this.props.contactsList} handleDeleteContact={this.props.handleDeleteContact} handleEditContact={this.props.handleEditContact} />
                </section>
            )
        } else {
            const contactsListForLetter = this.props.contactsList[this.props.visibleLetter];
            return(
                <section className="col-sm-12 table-responsive">
                    <SingleLetterTableContainer letter={this.props.visibleLetter} contactsList={contactsListForLetter} handleDeleteContact={this.props.handleDeleteContact} handleEditContact={this.props.handleEditContact} />
                </section>
            )
        }
    }
}        

class AllContacts extends React.Component {
    render() {
        const availableLetters = Object.keys(this.props.contactsList);
        const availableList = availableLetters.map( (letter,i) => (<SingleLetterTableContainer key={i} letter={letter} contactsList={this.props.contactsList[letter]} handleDeleteContact={this.props.handleDeleteContact} handleEditContact={this.props.handleEditContact} />) );
        
        return(
            <div>{availableList}</div>
        )
    }
}

class SingleLetterTableContainer extends React.Component {
    render() {
        return(
            <table className="table-contacts table" id={this.props.letter}>
                <LetterTableHead letter={this.props.letter} />
                <ContactsList letter={this.props.letter} contactsList={this.props.contactsList} handleDeleteContact={this.props.handleDeleteContact} handleEditContact={this.props.handleEditContact} />
            </table>
        ) 
    }
}

class LetterTableHead extends React.Component {
    render() {
        return(
            <thead>
                <tr><th>{this.props.letter}</th></tr>
            </thead>
        ) 
    }
}

class ContactsList extends React.Component {
    render() {
        if(this.props.contactsList){
            const contactData = this.props.contactsList.map( (singleContact,i) => (
                <SingleContact key={i} letter={this.props.letter} id={singleContact.id} name={singleContact.name} number={singleContact.number} handleDeleteContact={this.props.handleDeleteContact} handleEditContact={this.props.handleEditContact} />
            ) );
            return(
                <tbody>
                    {contactData}
                </tbody>
            ) 
        } else {
            return(
                <tbody>
                    <tr>
                        <td>
                            {"Nessun tuo contatto inizia con questa lettera"}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            ) 
        }
    }
}

export default PhonebookContent;