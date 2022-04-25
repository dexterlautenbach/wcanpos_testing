
        const StripeTerminal = loadStripeTerminal();
        var terminal = StripeTerminal.create({
            onFetchConnectionToken: async ()=>{
                const apiSearch = "https://test.wateringcanworkshops.com/wp-json/pos_bridge/v1/stripe_connection_token?";
                const consumerKey = 'consumerKey=U59ws06BB0B00A2gL2saOx92o44w68R6ti1o26aquDYcT65b4728vcfYN7xA7XIifHenpr8qG6V0Cw76kJp7xsbeiHSdGUjxB2hUts74RGjBM3AHgm1HYb1xC4yg6k8yqo8nQN4QJa8aYvii1T0ot0VQ6nyDe0KARlvIv03Z84wO369LrY9V8Bm6v5L9N9fax0hJvj45';
                const secret = 'secret=VTE5eXq2zim496P6a82Y31x5xIUaI4reWI6dlKC5KZkDX7J1h3isK518yG6Ntngtt58lQcnIRxain39uK776pJ7QXR60600PX92RgmcSrFJ2s9getmfdB4mX4jo1HLjt850cyL139Q1eCBk3ZB5ZU5osmMjD6Ucl9mS0vjAilcf01p18f78aXM1oUa283dvkkf5Vi3c3';

                const url = apiSearch + consumerKey + "&" + secret;
                const response =  fetch(url);
                const data =  response.json();
                //console.log(data);

                console.log(data.secret);
                return data.secret;
            },
            onUnexpectedReaderDisconnect: unexpectedDiscounnect,
        });

        function unexpectedDiscounnect() {
            console.log('shitty');
        }

