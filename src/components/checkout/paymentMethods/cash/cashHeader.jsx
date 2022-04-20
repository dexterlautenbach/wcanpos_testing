import React, {Component} from "react";

class CashHeader extends Component {
    state = {};


    render() {
        return (
            <div className="modal-header">
                <div>
                    <h4 className="modal-title" id="staticBackdropLabel">Cash Purchase - {(Math.round(this.props.getTotalDue()*20)/20).toFixed(2)}</h4>
                </div>
                <div>
                    <button onClick={() => this.props.handleCash(false)}
                            className="btn-danger">Exit
                    </button>
                </div>
            </div>
        )
    }


}

export default CashHeader;