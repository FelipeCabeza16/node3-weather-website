const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('../src/utils/forecast');
const geocode = require('../src/utils/geocode');

const app = express();
const port = process.env.PORT || 3000;



//DEFINE PATHS
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
console.log(viewsPath);
const partialsPath = path.join(__dirname, '../templates/partials');

//SETUP HANDLEBARS
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Felipe Cabeza'        
        })
    });
     
        
/*     app.get('/index', (req, res) => {
    res.render('index', {
    title: 'Weather App',
    name: 'Felipe Cabeza'        
    })
    });
 */

app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About',
    name: 'Felipe Cabeza'        
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
    title: 'Help page',
    name: 'Felipe Cabeza'        
    })
});

app.get('/weather', (req, res) => {
    
        
    if (!req.query.address){
        return res.send('address required');
    }                             
            geocode (req.query.address, (error, {latitude, longitude, location} = {} ) => {

                //debugger;
                if (error){
                    return res.send(error);
                }
            
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error){
                    return res.send(error);    
                    }

                    res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,    
                    })
                  })
            });
});

app.get('/*', (req, res) => {
    res.send('Not founded, 404');

});


app.listen(port, () => {
 console.log('server running on ' + port);
});
