import React, {Component} from "react";

class StripeConfirm extends Component {
    state = {};

onClick = () => {
    console.log('hi');
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

export default StripeConfirm;