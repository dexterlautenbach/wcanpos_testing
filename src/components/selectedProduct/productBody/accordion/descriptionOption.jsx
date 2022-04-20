import React, {Component} from "react";

class DescriptionOption extends Component {
    state = {};


    render() {
        return (
            <div className="accordion-item">
                <h2 className="accordion-header" id='description-heading'>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Description
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse"
                     aria-labelledby="description-heading"
                     data-bs-parent="#product-accordion">
                    <div className="accordion-body">
                        <div className="wrapper">
                            <div className='productImageDiv m-1'>
                                <img src={this.props.product.image}
                                     className="img-thumbnail rounded float-left productImage"
                                     alt={this.props.product.name}/>
                            </div>
                            <div className="vr"></div>
                            <div className="productDescriptionDiv m-1">
                                {this.props.product.shortDescription}
                                <br/>
                                {this.props.product.description}
                            </div>
                    </div>

                </div>
            </div>
    </div>
    )
    }


}

export default DescriptionOption;