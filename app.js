var express = require('express'),
    routes = require(__dirname + '/routes.js'),
    app = express(),
    port = (process.env.PORT || 3000),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    QuestionnaireCtrl = require('./server/controllers/questionnaire.server.controller.js')

mongoose.connect('mongodb://localhost/starwars');

// Application settings
app.engine('html', require(__dirname + '/lib/template-engine.js').__express);
app.set('view engine', 'html');
app.set('vendorViews', __dirname + '/govuk_modules/views');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/public'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// routes (found in routes.js)
routes.bind(app, '/public/');

app.post('/api/questionnaire', function (req, res) {
    QuestionnaireCtrl.create(req,res);
});

// start the app

app.listen(port);
console.log('');
console.log('Listening on port ' + port);
console.log('');