import React, {Component} from "react";

class CashConfirm extends Component {
    state = {};

    onClick = () => {
        this.props.handleTendered(this.props.cashTender);
        this.props.handleCash(false);
        const paymentMethod = {
            name: 'Cash',
            value: this.props.cashTender,
        };
        this.props.handlePaymentMethods(paymentMethod);
    }


    render() {
        return (

            <div className="modal-footer" align="center">
                <button onClick={() => {
                    this.onClick()
                }} className="btn-success btn-lg cashButton">Confirm
                </button>
            </div>

        )
    }


}

export default CashConfirm;