import React, {Component} from "react";
import MessageOption from "./messageOption";
import ProductOption from "./productOption";
import DescriptionOption from "./descriptionOption";
import PrivateNotesOption from "./privateNotes";

class Accordion extends Component {
    state = {};


    render() {
        return (
            <div className="modal-body" align="center">
                <div className="accordion" id="product-accordion">


                    <MessageOption
                        product={this.props.product}
                    />

                    <ProductOption
                        product={this.props.product}
                        getVariation = {this.props.getVariation}
                    />

                    <DescriptionOption
                        product={this.props.product}
                    />

                    <PrivateNotesOption
                        product={this.props.product}
                    />
                </div>
            </div>
        )
    }


}

export default Accordion;