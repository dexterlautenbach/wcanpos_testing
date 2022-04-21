import React, {Component} from "react";

class PrintReceipt extends Component {
    state = {};


    render() {
        return (
            <div className="receipt-wrapper">
                <div className="logo-div">
                    <img className="twc-logo" src={require('./TWC-Logo.png')}/>
                </div>
                <div className="company-header">
                    <div className="company-info">
                        3711 King St. Vineland, ON, LOR 2C0
                    </div>
                    <div className="company-info">
                        905-562-0088
                    </div>
                    <div className="company-info">
                        www.thewateringcan.cad
                    </div>
                </div>

                <div className="receipt-info">
                    <div className="info-wrapper">
                        <div className="info-title">Receipt#</div>
                        <div className="info-info">{this.props.orderID}</div>
                    </div>
                    <div className="info-wrapper">
                        <div className="info-title">Date</div>
                        <div className="info-info">{this.props.wooOrder.date_created}</div>
                    </div>
                </div>
            </div>
        )
    }


}

export default PrintReceipt;