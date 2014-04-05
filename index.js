var express = require("express");
var app = express();
var port = Number(process.env.PORT || 3700);
var hbs = require('hbs');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

var io = require('socket.io').listen(app.listen(port));
io.enable('browser client minification');  // send minified client
io.enable('browser client gzip');          // gzip the file

var userdata = require('./public/data.json');

app.get('/', function(req, res) {
    res.render('index', {
                        title: "Landing page",
                        scripts: [
                            {script : 'landing'},
                            ]
                        });
});

app.get('/dashboard', function(req, res) {
    res.render('guestlist', {
                        title: "Guestlist",
                        userdata: userdata,
                        scripts: [
                            {script : 'guestlist'}
                            ]
                        });
});

var events = require('./routes/events');
app.get('/events', events.findAll);
app.get('/events/:id', events.findById);

io.sockets.on('connection', function (socket) {

    socket.on('guestlist', function (data) {
        socket.broadcast.emit('attendeeId', data);
        // io.sockets.emit('attendeeId', data);
    });

});

console.log("Listening on port " + port);


