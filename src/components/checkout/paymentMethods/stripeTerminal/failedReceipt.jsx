import React, {Component} from "react";

/** This is the component that will create the receipt
 *
 */

class PrintFailedReceipt extends Component {
    state = {
        error: window.errorCode,
    };


    render() {

        return (
            <div className="receipt-wrapper">
                <div className="payments-wrapper">
                    <div className="payments-title">Payment Declined</div>
                    <div className="payment-method-wrapper">
                        <div className='method-name payment-separator'>Code</div>
                        <div className='method-value payment-separator'>{this.state.error.code}</div>
                    </div>
                    <div className="payment-method-wrapper">
                        <div className='method-name payment-separator'>Decline Code</div>
                        <div className='method-value payment-separator'>{this.state.error.decline_code}</div>
                    </div>
                    <div className="payment-method-wrapper">
                        <div className='method-name payment-separator'>Message</div>
                        <div className='method-value payment-separator'>{this.state.error.message}</div>
                    </div>
                </div>
            </div>

        )
    }

//hi
}

export default PrintFailedReceipt;