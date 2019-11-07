const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(morgan('dev'));

const cacheMovieData = {};

app.get('/', function(req, res){
    if (!cacheMovieData[req.url]){
        axios.get('http://www.omdbapi.com' + req.url + '&apikey=8730e0e')
        .then(response =>  {
            cacheMovieData[req.url] = response.data;
            res.send(response.data);
            console.log(JSON.stringify(cacheMovieData))
        })
        .catch(error => res.send(error.message)); 
    }
    else {
        res.send(cacheMovieData[req.url]);
    }
})

app.get('*', function(req, res){
    res.status(404).send('Page Not Found');
})

module.exports = app;
