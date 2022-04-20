import React, {Component} from "react";
import CashHeader from "./cashHeader";
import CashBody from "./cashBody";
import CashConfirm from "./cashConfirm";



class Cash extends Component {
    state = {
        cashTender : 0.0,
    };

    handleCashTender = (amount) =>{
        amount = Number(amount);
        this.setState({cashTender : amount});
    }


    render() {
        return (
            <div className='container'>
                <div>
                    {this.props.cash ?
                        <div>
                            <div className="modal modal-dialog-centered cash-modal" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog productModal">
                                    <div className="modal-content">
                                       <CashHeader
                                            handleCash = {this.props.handleCash}
                                            getTotalDue = {this.props.getTotalDue}
                                       />
                                        <CashBody
                                            handleCashTender = {this.handleCashTender}
                                        />
                                        <CashConfirm
                                            handleCash = {this.props.handleCash}
                                            cashTender = {this.state.cashTender}
                                            handleTendered = {this.props.handleTendered}
                                            handlePaymentMethods = {this.props.handlePaymentMethods}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        ''}
                </div>
            </div>

        );
    }

}

export default Cash;