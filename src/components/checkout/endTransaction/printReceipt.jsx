import React, {Component} from "react";

/** This is the component that will create the receipt
 *
 */

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
                        www.thewateringcan.ca
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

                <div className="receipt-body">
                    <table className="product-table">
                        <thead>
                        <tr className="product-table-header">

                            <th>Description</th>
                            <th>QTY</th>
                            <th>Total</th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.props.cartList?.map(function (product, i) {
                            return <tr key={i}>
                                <td className="prodName">{product.name}<br/>#{product.id} @ {product.price}</td>
                                <td className="prodQty">{product.quantity}</td>
                                <td className="prodPrice">${(product.price * product.quantity).toFixed(2)}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                    <div className="subtotal-wrapper">
                        <div className="bottom-title">Subtotal</div>
                        <div className="bottom-info">${this.props.getSubtotal().toFixed(2)}</div>
                    </div>
                    <div className="HST-wrapper">
                        <div className="bottom-title">HST (13%)</div>
                        <div className="bottom-info">${this.props.getHST().toFixed(2)}</div>
                    </div>
                    <div className="Total-wrapper">
                        <div className="bottom-title">Total</div>
                        <div className="bottom-info">${this.props.getTotal().toFixed(2)}</div>
                    </div>

                    <div className="payments-wrapper">
                        <div className="payments-title">Payments</div>
                        {this.props.paymentMethods?.map(function (method, i) {
                            return <div key={i} className="payment-method-wrapper">
                                <div className='method-name payment-separator'>{method.name}</div>
                                <div className='method-value'>${Number(method.value).toFixed(2)}</div>
                                {(method.name !== 'cash') ?
                                    <div className="CreditCardInfoWrapper">
                                        <div className='method-name'>Card:</div>
                                        <div className='method-value'>**** **** **** {method.last4}</div>
                                        <div className='method-name'>Acc. Type:</div>
                                        <div className='method-value'>{method.account_type}</div>
                                        <div className='method-name'>App Name:</div>
                                        <div className='method-value'>{method.application_preferred_name}</div>
                                        <div className='method-name'>File Name:</div>
                                        <div className='method-value'>{method.dedicated_file_name}</div>
                                    </div>
                                    :
                                    ''}
                            </div>
                        })}

                        <div className="payment-total">
                            <div className="total-title">Total Paid</div>
                            <div className="total-paid">${this.props.amountTendered.toFixed(2)}</div>
                        </div>
                        <div className="change">
                            <div className="change-title">Change Due</div>
                            <div className="change-paid">${(this.props.getTotalDue() * -1).toFixed(2)}</div>
                        </div>

                    </div>


                </div>

                <div className="receipt-footer">
                    Thank you for shopping at The Watering Can
                    <br/>
                    HST# 81925 7544 RC0001
                </div>


            </div>
        )
    }

//hi
}

export default PrintReceipt;