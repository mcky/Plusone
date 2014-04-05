window.onload = function() {


    var socket = io.connect(window.location.origin);

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
