import React, {Component} from "react";
import NumPad from 'react-numpad';


class CashBody extends Component {
    state = {
        cashReceived: 0,

    };

    handleQuickCash = (quickCashValue) => {
        const currentReceived = this.state.cashReceived;
        let total = currentReceived + quickCashValue;

        this.setState({cashReceived: total});
    }

    handleNumbPad = (value) => {
        value = Number(value);
        this.setState({cashReceived: value});
    }


    render() {
        return (
            <div className="modal-body" align="left">
                <div className="cashQuickButtons">
                    <button onClick={() => this.handleQuickCash(1)} className="cashButton" value={1.00}>$1.00</button>
                    <button onClick={() => this.handleQuickCash(2)} className="cashButton" value={1.00}>$2.00</button>
                    <button onClick={() => this.handleQuickCash(5)} className="cashButton" value={1.00}>$5.00</button>
                    <button onClick={() => this.handleQuickCash(10)} className="cashButton" value={1.00}>$10.00</button>
                    <button onClick={() => this.handleQuickCash(20)} className="cashButton" value={1.00}>$20.00</button>
                    <button onClick={() => this.handleQuickCash(50)} className="cashButton" value={1.00}>$50.00</button>
                    <button onClick={() => this.handleQuickCash(100)} className="cashButton" value={1.00}>$100.00</button>
                </div>

                <NumPad.Number
                    onChange={(value) => {
                       // console.log('value', value);
                        this.props.handleCashTender(value);
                        this.handleNumbPad(value);
                    }}
                    label={'Cash Tendered'}
                    value ={this.state.cashReceived}
                    sync ={true}
                    inline ={true}
                    decimal = {2}
                    negative = {false}
                />
            </div>
        )
    }


}

export default CashBody;