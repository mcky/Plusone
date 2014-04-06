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
