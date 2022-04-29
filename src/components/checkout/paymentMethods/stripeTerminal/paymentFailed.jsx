import React, {Component} from "react";
import ReactToPrint from "react-to-print";
import PrintFailedReceipt from "./failedReceipt";

class PaymentFailed extends Component {
    state = {};


    render() {
        return (
            <div className='container'>
                <div>
                    <div>
                        <div className="modal modal-dialog-centered" id="staticBackdrop" data-bs-backdrop="static"
                             data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button className="btn-warning btn-sm" onClick={this.props.handlePaymentFailedComplete}>X</button>
                                    </div>
                                    <div className="modal-header">
                                        <ReactToPrint
                                            trigger={() => {
                                                return <button className="btn-danger btn-lg">Print Decline</button>
                                            }}
                                            content={() => this.componentRef}
                                        />
                                        <div style={{display: "none"}}>
                                            <PrintFailedReceipt ref={(el) => (this.componentRef = el)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PaymentFailed;