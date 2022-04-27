/** to create a stripe terminal, we must first get some information from the server */
var terminal = StripeTerminal.create({
    onFetchConnectionToken: async () => {
        const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_connection_token?";
        const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
        const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

        const url = apiSearch + consumerKey + "&" + secret;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log(data.secret);
        return data.secret;
    },
    onUnexpectedReaderDisconnect: unexpectedDiscounnect,
});

function unexpectedDiscounnect() {
    console.log('shitty');
    alert("looks like the terminal has been discounted. Probably have to do a page refresh. I don't know. We are pretty untested here.");
}


function discoverReaders() {
    const config = {simulated: false, location: 'tml_EmOigwn7me7ov0'}
    terminal.discoverReaders(config).then(function (discoverResult) {
        if (discoverResult.error) {
            console.log('Failed to discover: ', discoverResult.error);
        } else if (discoverResult.discoveredReaders.length === 0) {
            console.log('No available readers.');
        } else {
            // You should show the list of discoveredReaders to the
            // cashier here and let them select which to connect to (see below).
            console.log(discoverResult);
            connectReader(discoverResult);
        }
    });


}

function connectReader(discoverResult) {
    // Just select the first reader here.
    var selectedReader = discoverResult.discoveredReaders[0];

    terminal.connectReader(selectedReader).then(function (connectResult) {
        if (connectResult.error) {
            console.log('Failed to connect: ', connectResult.error);
            alert('unable to connect to payment terminal');
        } else {
            console.log('Connected to reader: ', connectResult.reader.label);
        }

    });
}


discoverReaders();


/** TRY TO GET THE TERMINAL CONNECTION */


async function clientSecret() {
    const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_payment_intent?";
    const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
    const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

    const url = apiSearch + consumerKey + "&" + secret;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // console.log(data.secret);
    return data;


}

//  clientSecret();

async function stripeCheckout(totalDue) {

    const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_payment_intent?";
    const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
    const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

    const url = apiSearch + consumerKey + "&" + secret + "&totalDue=" + totalDue;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // console.log(data.secret);
    const clientSecret = data.client_secret;
    // const paymentIntent = data.piID;

    // clientSecret is the client_secret from the PaymentIntent you created in Step 1.
    terminal.collectPaymentMethod(clientSecret).then(function (result) {
        if (result.error) {
            // Placeholder for handling result.error
            alert('we have an error on the payment method')
        } else {
            // Placeholder for processing result.paymentIntent
            console.log(result.paymentIntent)

            //process payment?????
            terminal.processPayment(result.paymentIntent).then(function (result) {
                if (result.error) {
                    // Placeholder for handling result.error
                    console.log(result.error)
                    alert('Payment DID NOT go through');
                } else if (result.paymentIntent) {
                    // Placeholder for notifying your backend to capture result.paymentIntent.id
                    console.log(result.paymentIntent);
                    alert('we paid');

                    /** Capture the payment by sending the payment intent ID back to the server         */
                   capturePayment(result.paymentIntent.id);

                   return'fuck this';

                }
            });
        }
    });

}

var stripeConfirmation = 'not ready';

async function capturePayment(piID) {
    const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
    const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

    const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_capture?";

    const url2 = apiSearch + consumerKey + "&" + secret + '&piID=' + piID;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    // console.log(data2);
    stripeConfirmation = data2;
    return data2;
}



