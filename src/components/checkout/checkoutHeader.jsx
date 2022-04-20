import React, {Component} from "react";

class CheckoutHeader extends Component {
    state = {};


    render() {
        return (
            <div className="modal-header">
                <div>
                    <h5 className="modal-title" id="staticBackdropLabel">Checkout Time:</h5>
                </div>
                <div>
                    <button onClick={this.props.handleCheckoutClick}
                            className="btn-danger">Exit
                    </button>
                </div>
            </div>
        )
    }


}

export default CheckoutHeader;