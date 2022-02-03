const rp = require("request-promise");

function geocode(address, cb){
    const url = 'https://puzzle.mead.io/puzzle'
    debugger
    rp({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to location services!', undefined)
        // } else if (body.features.length === 0) {
        //     callback('Unable to find location. Try another search.', undefined)
        } else {
            cb(undefined, body)
        }
    })
}

// fetch("https://puzzle.mead.io/puzzle").then((res) => {
//         console.log(res);
//         res.json().then((data) => {
//             console.log(data);
//             console.log(address);
            
//         messageOne.textContent = address;
//         messageTwo.textContent = JSON.stringify(data);
//         })
//     });

module.exports = geocode;