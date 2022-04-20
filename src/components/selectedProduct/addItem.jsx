import React, {Component} from "react";


class AddItem extends Component {
    state = {};


    render() {
        return (

            <div className="modal-footer" align="right">
                <button onClick={this.props.handleAddItem} className="btn-success btn-lg">Add Item</button>
            </div>

        )
    }


}

export default AddItem;