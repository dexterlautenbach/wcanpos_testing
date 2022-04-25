import React, {Component} from "react";
import '@stripe/react-stripe-js';
import '@stripe/stripe-js';
import '@stripe/terminal-js';
import {loadStripeTerminal} from '@stripe/terminal-js';



class StripeBody extends Component {
    state = {};



    render() {
        return (
            <div className="modal-body">
                hi
            </div>
        )
    }


}

export default StripeBody;