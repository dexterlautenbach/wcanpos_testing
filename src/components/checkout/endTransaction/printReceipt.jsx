import React, {Component} from "react";

class PrintReceipt extends Component {
    state = {};


    render() {
        return (
            <div className="receipt-wrapper">
               <div className="logo-div">
                   <img className="twc-logo" src={require('./TWC-Logo.png')} />
               </div>
            </div>
        )
    }


}

export default PrintReceipt;