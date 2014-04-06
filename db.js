var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
	id         : String,
	name    : String,
	description    : String,
	date    : Date,
	capacity    : Number,
	addedBy : String,
    guests : [
    	{
    		id : String,
    		name : String,
    		checkedIn : Boolean,
    		checkInTime : Date,
    		list : String,
    		vip : Boolean,
    		addedBy : String,
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

mongoose.connect( 'mongodb://localhost/plusone' );
