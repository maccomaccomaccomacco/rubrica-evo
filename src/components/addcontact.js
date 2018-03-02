import React from 'react';

class AddContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: ""
        }
    }

    onNameChange = (event) => {
        if(event.target.value.length <= 20){
            this.setState({
                name: event.target.value
            });
        }
    }

    onNumberChange = (event) => {
        const filteredInputNumber = event.target.value.replace(/[^0-9]/g, '');
        if(filteredInputNumber.length <= 20){
            this.setState({
                number: filteredInputNumber
            });
        }
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
                                <div className="contact-buttons btn-group">
                                    <button className="btn btn-default" data-toggle="collapse" data-target="#new-contact" >Annulla</button>
                                    <button className="btn btn-default" onClick={this.onClickAddContact}>Salva</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AddContact;