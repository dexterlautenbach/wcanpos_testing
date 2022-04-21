import React, {Component} from "react";

class CashConfirm extends Component {
    state = {};

    onClick = () => {
        this.props.handleTendered(this.props.cashTender);
        this.props.handleCash(false);
        const totalDue = (Math.round(this.props.getTotalDue()*20)/20).toFixed(2);
        let change = this.props.cashTender - totalDue;
        if (change < 0){ change = 0;}
        const nickleAdjustment = this.props.getTotalDue() - totalDue;
        const paymentMethod = {
            name: 'Cash',
            value: this.props.cashTender,
            change: change,
            cashAdjustment : nickleAdjustment,
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