var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', function(req, res) {
   res.render('events', {
      events: [1, 2, 3 ,4]
   });
});

app.listen(8000);
