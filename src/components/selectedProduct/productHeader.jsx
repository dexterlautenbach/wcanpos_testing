import React, {Component} from "react";

class ProductHeader extends Component {
    state = {};


    render() {
        return (
            <div className="modal-header">
                <div>
                    <h5 className="modal-title" id="staticBackdropLabel">{this.props.name} </h5>
                </div>
                <div>
                    <button onClick={() => this.props.handleCloseProduct()}
                            className="btn-danger">Exit
                    </button>
                </div>
            </div>
        )
    }


}

export default ProductHeader;