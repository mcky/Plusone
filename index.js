var express = require("express");
var app = express();
var port = Number(process.env.PORT || 3700);
var hbs = require('hbs');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views/partials');
app.use( express.bodyParser());
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
    id         : String,
    name    : String,
    description    : String,
    date    : Date,
    capacity    : Number,
    addedBy : String,
    listTypes: [

            {
                    id : String,
                    name: String
            }
                ],
    guests : [
        {
            id : String,
            name : String,
            checkedIn : Boolean,
            checkInTime : Date,
            list : String,
            vip : Boolean,
            addedBy : String,
            createdAt : Date,
            updatedAt : Date,
            listType : String,
            plusOnes : [
                {
                    id : String
                }
            ]
        }
    ],

    createdAt : Date,
    updatedAt : Date


    //owner
    //access levels
});

mongoose.model( 'eventSchema', eventSchema );
// mongoose.model( 'eventSchema', eventSchema );

mongoose.connect( 'mongodb://localhost/plusone' );
// mongoose.connect( 'mongodb://10.100.93.235:27017/test' );


// var routes  = require( './routes' );
var mongoose = require( 'mongoose' );
var eventSchema     = mongoose.model( 'eventSchema' );



exports.index = function ( req, res ){
  eventSchema.find( function ( err, events, count ){
    // res.render( 'index', {
    //   title : 'Express Todo Example',
    //   events : events
    // });
    res.send({events : events});
  });
};

exports.create = function ( req, res ){
  new eventSchema({
    name    : req.body.name,
    description    : req.body.description,
    capacity    : req.body.capacity,
    date    : req.body.date,
    addedBy    : req.body.addedBy,
    createdAt : Date.now(),
    updatedAt : Date.now()
  }).save( function( err, todo, count ){
    res.redirect( '/' );
  });
};

exports.destroy = function ( req, res ){
  eventSchema.findById( req.params.id, function ( err, todo ){
    todo.remove( function ( err, todo ){
      res.redirect( '/' );
    });
  });
};

exports.edit = function ( req, res ){
  eventSchema.find( function ( err, events ){
    res.render( 'edit', {
        title   : 'Express Todo Example',
        events   : events,
        current : req.params.id
    });
  });
};

exports.update = function ( req, res ){
  eventSchema.findById( req.params.id, function ( err, todo ){
    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      res.redirect( '/' );
    });
  });
};


app.get( '/api/', function(req, res) {
    eventSchema.find( function ( err, events, count ){
        res.send({events : events});
    });
});

app.get( '/api/:id', function(req, res) {
    eventSchema.findById(req.params.id, function (err, events) {
        res.send({events : events});
    });
});
// app.post( '/api/create', routes.create );
// app.get( '/api/destroy/:id', routes.destroy );
// app.get( '/api/edit/:id', routes.edit );
// app.post( '/api/update/:id', routes.update );

var io = require('socket.io').listen(app.listen(port));
io.enable('browser client minification');  // send minified client
io.enable('browser client gzip');          // gzip the file

var userdata = require('./public/data.json');



app.get('/dashboard', function(req, res) {
    eventSchema.find( function ( err, events, count ){
        // res.send({events : events});
        res.render('dashboard', {
                            title: "Landing page",
                            events : events,
                            scripts: [
                                {script : 'modernizr'},
                                {script : 'jquery'},
                                {script : 'foundation.min'},
                                {script : 'foundation.offcanvas'},
                                {script : 'dashboard'}
                                ]
                            });
        });
});

// app.get('/dashboard', function(req, res) {
//     res.render('dashboard', {
//                         title: "Dashboard",
//                         userdata: userdata,
//                         scripts: [
//                             {script : 'modernizr'},
//                             {script : 'jquery'},
//                             {script : 'foundation.min'},
//                             {script : 'foundation.offcanvas'},
//                             {script : 'dashboard'}
//                             ]
//                         });
// });

// app.get('/guestlist', function(req, res) {
//     res.render('guestlist', {
//                         title: "Guestlist",
//                         guests: userdata[0].events[1].guests.slice(0,10),
//                         scripts: [
//                             {script : 'modernizr'},
//                             {script : 'jquery'},
//                             {script : 'foundation.min'},
//                             {script : 'foundation.offcanvas'},
//                             {script : 'guestlist'}
//                             ]
//                         });
// });




io.sockets.on('connection', function (socket) {

    socket.on('db', function (data) {
        new eventSchema(data.dbAdd)
            .save( function( err, todo, count ){
        });
        // Emit to all lists?
        // socket.broadcast.emit('attendeeId', data);
    });

    socket.on('db2', function (data) {
        // eventSchema.find({ id: /^5340c21a37292be7fd78d5a7/ }, callback)
        // eventSchema.find({ id: /^5/ }, function ( err, events, count ){
        eventSchema.findById('5340c21a37292be7fd78d5a7', function (err, events) {
            socket.emit('dbSearchResult', events);
        });
    });

    socket.on('db3', function (data) {
        var dataId = data.dbUpdate.id;
        console.log(data.dbUpdate);
        eventSchema.findById( dataId, function ( err, events ){
            events.guests = data.dbUpdate.guests;
            events.save( function ( err, events, count ){
            });
        });
    });
    socket.on('guestlist', function (data) {
        socket.broadcast.emit('attendeeId', data);
    });

    socket.on('guestlistSearch', function (data) {
        // var guestlistQueryResult = searchFor(data.guestlistSearchQuery);
        var guestlistQueryResult = userdata[0].events[1].guests.slice(0,data.guestlistSearchQuery);
        socket.emit('guestlistQueryResult', guestlistQueryResult);
    });

});


console.log("Listening on port " + port);


