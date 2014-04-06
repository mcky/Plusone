window.onload = function() {
    var socket = io.connect(window.location.origin);

    var plusOnes = new Array();
    plusOnes.push({'name':'Joe'});
    console.log(plusOnes);

    var sendBtn = document.getElementById('send-button');
    sendBtn.onclick = function() {
            datax = {
                name: 'Another event2',
                description: 'event description',
                date: Date.now(),
                capacity: 200,
                addedBy: 'Ross',
                listTypes : [
                    {
                        name: 'Promoter'
                    }
                ],
                guests : [
                    {
                        name: 'JoeBloggs',
                        checkedIn: false,
                        checkInTime: Date.now(),
                        vip: false,
                        listType: 'Promoter'
                    }
                ]
            }
            console.log(datax)
            socket.emit('db', { dbAdd: datax});
    };

    var getBtn = document.getElementById('get-button');
    getBtn.onclick = function() {
            datax = {
                name: 'Another event',
                description: 'event description',
                date: Date.now(),
                capacity: 200,
                addedBy: 'Ross',
                listTypes : [
                    {
                        name: 'Promoter'
                    }
                ],
                guests : [
                    {
                        name: 'JoeBloggs',
                        checkedIn: false,
                        checkInTime: Date.now(),
                        vip: false,
                        listType: 'Promoter'
                    }
                ]
            }
            socket.emit('db2', { dbSearch: 'query'});
    };

    socket.on('dbSearchResult', function (data) {
        console.log(data);
    });

    var checkBtn = document.getElementById('check-button');
    checkBtn.onclick = function() {
            datax = {
                id: '5340c7ae80c6a30000db6872',
                guests : [
                    {
                        _id: '5340c7ae80c6a30000db6873',
                        checkedIn: false
                    }
                ]
            }
            console.log(datax, datax.id);
            socket.emit('db3', { dbUpdate: datax, dbUpdateId: datax.id});
    };


    var attendee = document.querySelectorAll(".event__attendee__checkbox");
    for (var i=0,  tot=attendee.length; i < tot; i++) {
        attendee[i].onclick = function() {
        	var attendeeId = this.getAttribute('id');
        	socket.emit('guestlist', { attendeeId: attendeeId});
        };
    };

    socket.on('attendeeId', function (data) {
		var attendeeId = document.getElementById(data.attendeeId);
		if (attendeeId.checked === true) {
			attendeeId.checked = false;
		} else if (attendeeId.checked === false) {
			attendeeId.checked = true;
		}
    });
};
