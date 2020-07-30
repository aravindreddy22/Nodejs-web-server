const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geo_code = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const paritalPath = path.join(__dirname, '../templates/partials');

//Setup handlerbars engine and view location
app.set('views', viewsPath);
app.set('view engine', 'hbs');

hbs.registerPartials(paritalPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', name: 'Aravind'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akhil'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'manish'
    });
})


// app.get("/",(req,res)=>{
//     res.send('<p1>Weather</p1>');
// });

// app.get("/help",(req,res)=>{
//     res.send([{
//         name:'Andrew',
//         age:27
//     },{
//         name:'sarah',
//         age:27
//     }]);
// });


// app.use(express.static(aboutPath)).j

// app.get("/about",(req,res)=>{
//     res.send('<h1>About</h1>');
// });


app.get("/products", (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })



});


app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }
    geo_code(req.query.address, (error, data = {}) => {
        if (error) {
            console.log('Error in geo_code', error);
            return res.send({
                error: 'Error while retrieving geo_code Information'
            })
        }
        console.log('Latitude : ', data.latitude);
        console.log('Longitude : ', data.longitude);
        console.log('Location : ', data.location);

        forecast(data.latitude, data.longitude, (error, forcastData) => {
            if (error) {
                console.log('Error in forcast', error);
                return res.send({
                    error: 'Error while retrieving forcast Information'
                })
            }
            res.send({
                location: data.location,
                forecast: forcastData
            })


        });

    })
});



app.get("/weather", (req, res) => {
    res.send({
        Location: 'New York, New York, United States',
        description: 'Heavy snow',
        weather: 'It is currently,-17it is feels like,-35'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aravind',
        errMessage: 'Help article is not found'

    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aravind',
        errMessage: 'Page not found'
    })
});

app.listen(3000, () => console.log('Example app listening at http://localhost:'))