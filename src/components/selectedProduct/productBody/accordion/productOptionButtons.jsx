import React, {Component} from "react";
import {logDOM} from "@testing-library/react";

class ProductOptionButtons extends Component {
    state = {

    };


    render() {
        return (
            <button className="btn-secondary m-1" key={this.props.id}>{this.props.name}</button>
        );
    }


}

export default ProductOptionButtons;