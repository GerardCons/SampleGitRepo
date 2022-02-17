const express = require('express');
const app = express();
const weather = require('weather-js');
const abbr = require( '@stdlib/datasets-us-states-abbr' );

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    weather.find({search: 'Davao, PH', degreeType: 'C'}, function(err, result) {
        if(err){
            console.log(err)
        } 
        else{                      
            var states = abbr()        
            var country =  result[0].location.name.split(", ")
            country = country[country.length - 1]                        
            if(states.filter(state => state == country).length != 0){
                country = "The United States of America"
            }                  
            let data = {                
                'name': result[0].location.name,
                'country': "https://countryflagsapi.com/png/" + country,
                'latitude': parseFloat(result[0].location.lat),
                'longitude': parseFloat(result[0].location.long),
                'current': {
                    'temperature': result[0].current.temperature,
                    'skytext': result[0].current.skytext,
                    'date': result[0].current.date,                    
                    'day': result[0].current.day,                    
                },
                'forecast': result[0].forecast,            
            }                                   
            res.render('index', data);
        }        
      });
  });

app.get('/other', (req, res) => {
    res.render('other');
  });
  

app.listen(8000);