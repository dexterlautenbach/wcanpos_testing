import React, {Component} from "react";

class EndTransaction extends Component {
    state = {


    };



    render() {
        return (

            <div className="modal-footer" align="center">
                <div className="title">
                    <h4>Lets terminate this</h4>
                </div>
                <div className="paymentOptions">
                    <button  className="btn-success btn-lg cashButton">Push to Woo</button>
                </div>
            </div>

        )
    }


}

export default EndTransaction;