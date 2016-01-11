var express = require('express');
var path = require('path');

var port = process.PORT || 3000;
var app = express();

app.set('views', './pages');
app.set('view engine', 'jade');

require('./routes')(app);
app.use(express.static(path.join(__dirname, './')));

app.listen(port);

console.log('developer started on port ' + port);