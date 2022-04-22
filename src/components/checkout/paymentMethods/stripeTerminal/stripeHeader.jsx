import React, {Component} from "react";

class StripeHeader extends Component {
    state = {};


    render() {
        return (
            <div className="modal-header">
                <div>
                    <h4 className="modal-title" id="staticBackdropLabel">Payment Card - ${(Math.round(this.props.getTotalDue()*20)/20).toFixed(2)}</h4>
                </div>
                <div>
                    <button onClick={() => this.props.handleStripe(false)}
                            className="btn-danger">Exit
                    </button>
                </div>
            </div>
        )
    }


}

export default StripeHeader;