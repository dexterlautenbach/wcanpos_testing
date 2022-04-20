import React, {Component} from "react";

class ProductButtons extends Component {
    state = {

    };


    render() {
        return (


            <button onClick={() => this.props.handleProductSelection(this.props.prodID, true)} type="button" className={this.getProdButtonClasses(this.props.name, this.props.row)}
                    value={this.props.prodID}><span className="buttonOverflow">{this.props.name}</span></button>

        );
    }


    getProdButtonClasses(name, row) {
        let classes = "btn-prod";
        classes += (name === 'empty') ? " empty" : "";
        classes += (row === 'row1') ? " row1" : "";
        classes += (row === 'row2') ? " row2" : "";
        classes += (row === 'row3') ? " row3" : "";
        return classes;
    }

}

export default ProductButtons;