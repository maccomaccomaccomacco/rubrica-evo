import React from 'react';
import ReactDOM from 'react-dom';

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

export default AddContact;