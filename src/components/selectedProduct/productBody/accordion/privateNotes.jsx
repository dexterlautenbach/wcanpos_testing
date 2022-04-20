import React, {Component} from "react";

class PrivateNotesOption extends Component {
    state = {};


    render() {
        return (
            <div className="accordion-item">
                <h2 className="accordion-header" id='description-heading'>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Private Notes
                    </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse"
                     aria-labelledby="description-heading"
                     data-bs-parent="#product-accordion">
                    <div className="accordion-body">
                        <div className="wrapper">
                            <div className='recipe m-1'>
                                <pre>{this.props.product.recipe}</pre>
                            </div>
                            <hr/>
                            <div className="privateNotes">
                                <label>
                                    Private Notes:
                                    <textarea rows="5" cols="50" name="cardMessage" id="cardMessage" className="m-2">
                            </textarea>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    fixRecipe=(recipe) =>{
        let str = recipe
        var regex = /<br\s*[\/]?>/gi;
        return str.replace(regex, "\n");
    }

}

export default PrivateNotesOption;