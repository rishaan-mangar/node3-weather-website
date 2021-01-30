const path = require('path') //core node module (load core modules first!)
const express = require('express') //npm module
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config.
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
        name: 'Rishaan Mangar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rishaan Mangar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message.',
        title: 'Help',
        name: 'Rishaan Mangar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found.',
        title: '404',
        name: 'Rishaan Mangar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found.',
        title: '404',
        name: 'Rishaan Mangar'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})