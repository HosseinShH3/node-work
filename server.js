const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('year',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n");
    next();
});

app.get('/',(req, res) => {
    res.render('home.hbs',{
        pageTitle : "Home Page",
        someText : 'This is page home'
    });  
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pageTitle : "About Page"
    }); 
});

app.listen(4000, () => {
    console.log('Server Is up in 4000 port');
});