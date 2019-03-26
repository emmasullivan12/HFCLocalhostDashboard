var express = require('express');
var path = require('path');
var router = require('./routes/routes.js')

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);

module.exports=app;
