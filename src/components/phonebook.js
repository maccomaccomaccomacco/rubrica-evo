import React from 'react';

import PhonebookHeader from './phonebookheader.js';
import AddContact from './addcontact.js';
import PhonebookContent from './phonebookcontent.js';

class Phonebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.phonebookContacts
    }

    handleLetterClick = (clickedLetter) => {
        this.setState({
            "visibleLetter": clickedLetter
        });
    }

    handleAddContact = (newName, newNumber) => {
        //cattura prima lettera
        const firstLetterContact = newName[0].toLowerCase();

        //contatti attuali
        const actualContacts = Object.assign({}, this.state.contacts);

        //ultimo id
        var lastIdValue = 0;
        Object.keys(actualContacts).forEach( (letter) => lastIdValue += actualContacts[letter].length );

        if(actualContacts[firstLetterContact] == undefined){
            actualContacts[firstLetterContact] = [];
            actualContacts[firstLetterContact].push({id: lastIdValue+1, name: newName, number: newNumber});               
        } else{
            actualContacts[firstLetterContact].push({id: lastIdValue+1, name: newName, number: newNumber});            
        }

        this.setState({
            contacts: actualContacts
        })
            console.log(actualContacts);   
    }

    handleDeleteContact = (idContact, letter) => {
        const actualContacts = Object.assign({}, this.state.contacts);
        const filteredContactsForLetter = actualContacts[letter].filter( singleContact => singleContact.id !== idContact );

        if(filteredContactsForLetter.length === 0){
            delete actualContacts[letter];
        } else{
            actualContacts[letter] = filteredContactsForLetter;
        }

        this.setState({
            contacts: actualContacts
        })
    }

    handleEditContact = (letter, idContact, nameEdited, numberEdited) => {
        //contatti attuali
        const actualContacts = Object.assign({}, this.state.contacts);
        
        const firstLetterContact = nameEdited[0].toLowerCase();

        if(letter == firstLetterContact){
            actualContacts[letter].forEach( (contact) => {if(contact.id==idContact){contact.name = nameEdited; contact.number = numberEdited}} );
            this.setState({
                contacts: actualContacts
            })
        } else {
            actualContacts[letter].forEach( (contact,index) => {if(contact.id==idContact){actualContacts[letter].splice(index,1)}} );
            
            if(actualContacts[firstLetterContact] == undefined){
                actualContacts[firstLetterContact] = [];
                actualContacts[firstLetterContact].push({id: idContact, name: nameEdited, number: numberEdited});               
            } else{
                actualContacts[firstLetterContact].push({id: idContact, name: nameEdited, number: numberEdited});            
            }
            console.log(actualContacts);
            this.setState({
                contacts: actualContacts
            })
        }
    }

    render() {
        return(
            <div>
            <PhonebookHeader visibleLetter={this.state.visibleLetter} handleLetterClick={this.handleLetterClick} />
            <AddContact handleAddContact={this.handleAddContact} />
            <PhonebookContent visibleLetter={this.state.visibleLetter} contactsList={this.state.contacts} handleDeleteContact={this.handleDeleteContact} handleEditContact={this.handleEditContact} />
            </div>
        )
    }
}

export default Phonebook;