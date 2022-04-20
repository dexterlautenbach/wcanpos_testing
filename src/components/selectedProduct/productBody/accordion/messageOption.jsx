import React, {Component} from "react";

class MessageOption extends Component {
    state = {};


    render() {
        return (


            <div className="accordion-item">
                <h2 className="accordion-header" id='message-heading'>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Message
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse"
                     aria-labelledby="message-heading"
                     data-bs-parent="#product-accordion">
                    <div className="accordion-body">
                        <label>
                            Card Message:
                            <textarea rows="5" cols="50" name="cardMessage" id="cardMessage" className="m-2">
                            </textarea>
                        </label>
                    </div>
                </div>
            </div>


        )
    }


}

export default MessageOption;