/** to create a stripe terminal, we must first get some information from the server */

var terminal;
function initializeTerminal(url) {
     terminal = StripeTerminal.create({
        onFetchConnectionToken: async () => {

            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            // console.log(data.secret);
            return data.secret;
        },
        onUnexpectedReaderDisconnect: unexpectedDiscounnect,
    });
}

function unexpectedDiscounnect() {
    console.log('shitty');
    alert("looks like the terminal has been disconnected. Probably have to do a page refresh. I don't know. We are pretty untested here.");
}


function discoverReaders(terminalID, location) {
    const config = {simulated: false, location: location}
    terminal.discoverReaders(config).then(function (discoverResult) {
        if (discoverResult.error) {
            console.log('Failed to discover: ', discoverResult.error);
            alert('Cant find readers. Please contact IT Support');
        } else if (discoverResult.discoveredReaders.length === 0) {
            console.log('No available readers.');
            alert('Cant find readers. Please contact IT Support');
        } else {
            // You should show the list of discoveredReaders to the
            // cashier here and let them select which to connect to (see below).
            //  console.log(discoverResult);
            connectReader(discoverResult, terminalID);
        }
    });


}

function connectReader(discoverResult, terminalID) {
    // Just select the first reader here.
    terminalID = 'terminal ' + terminalID;
    var selectedReader;
    // console.log(discoverResult);

    var arrayLength = discoverResult.discoveredReaders.length;
    for (var i = 0; i < arrayLength; i++) {
        //console.log(discoverResult.discoveredReaders[i]);
        if (terminalID == discoverResult.discoveredReaders[i].label) {
            selectedReader = discoverResult.discoveredReaders[i];
        }

    }
    //var selectedReader = discoverResult.discoveredReaders[0];

    terminal.connectReader(selectedReader).then(function (connectResult) {
        if (connectResult.error) {
            console.log('Failed to connect: ', connectResult.error);
            alert('unable to connect to payment terminal. Please contact IT support');
        } else {
            // console.log('Connected to reader: ', connectResult.reader.label);
            terminal.clearReaderDisplay();
            alert("Connected to: " + terminalID);
        }

    });
}


//discoverReaders();


/** TRY TO GET THE TERMINAL CONNECTION */

var stripeConfirmation = 0;
var paymentIntentID = 0;

async function stripeCheckout(totalDue, url, url2) {
    stripeConfirmation = 0; //reset this for next payment
    paymentIntentID = 0; //reset this for next payment

    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    // console.log(data.secret);
    const clientSecret = data.client_secret;
    paymentIntentID = data.piID.id;
    // const paymentIntent = data.piID;

    // clientSecret is the client_secret from the PaymentIntent you created in Step 1.
    terminal.collectPaymentMethod(clientSecret).then(function (result) {
        if (result.error) {
            // Placeholder for handling result.error
            alert('we have an error on the payment method. Please try again.')
        } else {
            // Placeholder for processing result.paymentIntent
            // console.log(result.paymentIntent)

            //process payment?????
            terminal.processPayment(result.paymentIntent).then(function (result) {
                if (result.error) {
                    // Placeholder for handling result.error
                    console.log(result.error)
                    alert('Payment DID NOT go through');
                } else if (result.paymentIntent) {
                    // Placeholder for notifying your backend to capture result.paymentIntent.id
                   // console.log(result.paymentIntent);
                   // console.log(result.paymentIntent.charges.data[0].payment_method_details.interac_present);
                    // alert('we paid');

                    //console.log(Array.isArray(result.paymentIntent.charges.data[0].payment_method_details.interac_present);
                    /** Capture the payment by sending the payment intent ID back to the server         */
                    if (typeof result.paymentIntent.charges.data[0].payment_method_details.interac_present != "undefined") {
                       // console.log('is array');
                        stripeConfirmation = result.paymentIntent;
                    } else {
                        capturePayment(result.paymentIntent.id, url2);
                       // console.log('is not array');
                    }

                }
            });
        }
    });

}


async function capturePayment(piID, url2) {

    url2 = url2 + '&piID=' + piID;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    //  console.log(data2);
    stripeConfirmation = data2;

}


function stripeCartDisplay(cart, tax, subtotal) {
    // const lineItems = stripeCartLineItems(cart);
    terminal.setReaderDisplay({
        type: 'cart',
        cart: {
            line_items: cart,
            tax: Number(tax),
            total: Number(subtotal),
            currency: 'cad',
        },
    });
}

function clearStripeDisplay() {
    terminal.cancelCollectPaymentMethod().then(function (result) {
        if (result.error) {
            // Placeholder for handling result.error
            console.log(result.error)
            alert('Cancel failed. Restart?');
        } else {
          //  console.log(result);
        }
    });
}

function clearStripeCartDisplay () {
    terminal.clearReaderDisplay()
}





