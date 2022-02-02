const path = require("path");
const express = require("express");
const forcast = require("./util/forcast");
const geocode = require("./util/geocode");
const hbs = require('hbs')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nitish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nitish'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be passed to get weather forcast"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forcast :forcastData,
                address : req.query.address
            })
        })
    })


});

app.get("/error", (req, res) => {
    res.send({
        error: "You must provide search string"
    });
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must send search string"
        });
    }
    res.send({
        products: []
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nitish'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nitish',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nitish',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log("Server connected!!");
})