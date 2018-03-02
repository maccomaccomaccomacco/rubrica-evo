import React from 'react';
import ReactDOM from 'react-dom';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './css/style.css';

import Phonebook from './components/phonebook.js'

const phonebook = {
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

class App extends React.Component {
    render() {
        return(
            <Phonebook phonebookContacts={phonebook}/>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));