import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './css/style.css';

class Phonebook extends React.Component {
    constructor() {
        super();
        this.state = {
            "contacts": {
                "a": [
                    {
                        "id": 1,
                        "name": "Antonio",
                        "number": "3335678435"
                    },
                    {
                        "id": 2,
                        "name": "Andrea",
                        "number": "3768799002"
                    }
                ],
                "b": [
                    {
                        "id": 3,
                        "name": "Barbara",
                        "number": "3335678435"
                    },
                    {
                        "id": 4,
                        "name": "Bombolo",
                        "number": "3768799002"
                    }
                ]
            },
            "visibleLetter": "tutti"
        }
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
            <Header visibleLetter={this.state.visibleLetter} handleLetterClick={this.handleLetterClick} />
            <AddContact handleAddContact={this.handleAddContact} />
            <PhonebookContent visibleLetter={this.state.visibleLetter} contactsList={this.state.contacts} handleDeleteContact={this.handleDeleteContact} handleEditContact={this.handleEditContact} />
            </div>
        )
    }
}


class Header extends React.Component {
    render() {
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const menuOfLetters = alphabet.map( (letter,n) => (
            <LetterLink key={n} letter={letter} handleLetterClick={this.props.handleLetterClick} />
        ))
        return (
            <div>
                <header className="navbar">
                        <ul className="nav navbar-nav pull-left">
                            <li><a><b>Rubrica</b></a></li>
                            <li className="hidden-xs hidden-sm letters-list dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Voce <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <LetterLink letter={"tutti"} handleLetterClick={this.props.handleLetterClick} />
                                    <li role="separator" className="divider"></li>
                                    {menuOfLetters}
                                </ul>
                            </li>

                            <li className="hidden-md hidden-lg letters-list">
                                <a data-toggle="collapse" data-target="#show-letters-onmobile">
                                    <div>
                                        Voce <span className="caret"></span>
                                    </div>
                                </a>
                
                            </li>
                        </ul>
                        <ul className="nav navbar-nav pull-right">
                            <li><a data-toggle="collapse" data-target="#new-contact">Nuovo contatto</a></li>
                        </ul>
                </header>
                <div className="show-letters-onmobile col-sm-12 collapse" id="show-letters-onmobile" > 
                    <ul className="nav nav-pils">
                        <LetterLink letter={"tutti"} handleLetterClick={this.props.handleLetterClick} />
                        <li role="separator" className="divider"></li>
                        {menuOfLetters}
                    </ul>
                </div>
            </div>
        )
    }
} 

class LetterLink extends React.Component {
    handleOnClickLetter = () => {
        this.props.handleLetterClick(this.props.letter);
    }

    render() {
        return(
            <li><a href={"#" + this.props.letter} onClick={this.handleOnClickLetter} >{this.props.letter}</a></li>
        )
    }
}


class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: ""
        }
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    onNumberChange = (event) => {
        const filteredInputNumber = event.target.value.replace(/[^0-9]/g, '');
        this.setState({
            number: filteredInputNumber
        });
    }

    onClickAddContact = () => {
        this.props.handleAddContact(this.state.name, this.state.number);
        this.setState({
            name: "",
            number: ""
        })
    }

    render() {
        return(
            <div className="new-contact col-sm-12 table-responsive collapse" id="new-contact" >
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="col-xs-5">
                                <input className="form-control" type="text" placeholder={"Nome contatto"} value={this.state.name} onChange={this.onNameChange} />
                            </td>
                            <td className="col-xs-5">
                                <input className="col-xs-5 form-control" type="text" placeholder={"Numero"} value={this.state.number} onChange={this.onNumberChange} />
                            </td>
                            <td className="col-xs-1">
                                <input className="btn btn-default pull-right" type="submit" onClick={this.onClickAddContact} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}



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

class SingleContact extends React.Component {
    constructor() {
        super();
        this.state = {
            showEditForm: false
        }
    }

    handleToggleEdit = () => {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    render() {
        if(!this.state.showEditForm){
            return(
                <SingleContactData id={this.props.id} letter={this.props.letter} name={this.props.name} number={this.props.number} handleToggleEdit={this.handleToggleEdit} handleDeleteContact={this.props.handleDeleteContact} />
            )
        } else {
            return(
                <SingleContactForm id={this.props.id} letter={this.props.letter} name={this.props.name} number={this.props.number} handleToggleEdit={this.handleToggleEdit} handleEditContact={this.props.handleEditContact} />
            )
        }
    }
}


class SingleContactData extends React.Component {
    onClickDeleteContact = () => {
        this.props.handleDeleteContact(this.props.id, this.props.letter);
    }

    render() {
        return(
            <tr id={this.props.id}>
                <td className="name col-xs-5 col-md-offset-1">{this.props.name}</td>
                <td className="number col-xs-5">{this.props.number}</td>
                <td className="contact-buttons btn-group col-xs-1">
                    <button className="btn btn-default" onClick={this.props.handleToggleEdit}>Modifica</button>
                    <button className="btn btn-default" onClick={this.onClickDeleteContact}>Cancella</button>
                </td>
            </tr>
        )
    }
}


class SingleContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            number: this.props.number
        }
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    onNumberChange = (event) => {
        const filteredInputNumber = event.target.value.replace(/[^0-9]/g, '');
        this.setState({
            number: filteredInputNumber
        });
    }

    onClickSave = () => {
        this.props.handleEditContact(this.props.letter, this.props.id, this.state.name, this.state.number);
        this.props.handleToggleEdit();
    }

    render() {
        return(
            <tr>
                <td className="name col-xs-5 col-md-offset-1"><input className="col-xs-5 form-control" type="text" value={this.state.name} onChange={this.onNameChange} /></td>
                <td className="number col-xs-5"><input className="col-xs-5 form-control" type="text" value={this.state.number} onChange={this.onNumberChange} /></td>
                <td className="contact-buttons col-xs-1 btn-group">
                    <button className="btn btn-default" onClick={this.props.handleToggleEdit}>Annulla</button>
                    <button className="btn btn-default" onClick={this.onClickSave}>Salva</button>
                </td>
            </tr>
        )
    }
}

ReactDOM.render(<Phonebook />, document.getElementById('root'));