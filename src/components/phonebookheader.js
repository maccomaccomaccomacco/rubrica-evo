import React from 'react';
import ReactDOM from 'react-dom';

class PhonebookHeader extends React.Component {
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

export default PhonebookHeader;