window.onload = function() {
    var socket = io.connect(window.location.origin);

    socket.on('numGuests', function (data) {
        console.log(data)
    });

    socket.on('attendeeId', function (data) {
		var attendeeId = document.getElementById(data.attendeeId);
        console.log(data);

        if (data.checkedIn === true) {
            attendeeId.checked = true;
        } else if (data.checkedIn === false) {
            attendeeId.checked = false;
        };
    });

};
