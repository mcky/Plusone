window.onload = function() {
    var socket = io.connect(window.location.origin);



    var searchField = document.getElementById('attendee__search__input');
    searchField.oninput = function(){
        if (this.value != '' && this.value > 0) {
            socket.emit('guestlistSearch', { guestlistSearchQuery: this.value});
        };
        // console.log(searchFor(this.value));
    }

    socket.on('guestlistQueryResult', function (data) {

        var attendeeList = document.getElementById('event__attendee__list');
        var html = ''
        for (var i=0,  tot=data.length; i < tot; i++) {
            // html += data[i].username;
            html += '<li class="event__attendee">';
            html += '<div class="checkbox-wrap">';
            html += '<input id="event__attendee__checkbox--'+ data[i].id +'" class="event__attendee__checkbox event__attendee__checkbox--'+ data[i].id +'" name="event__attendee__checkbox--'+ data[i].id +'" type="checkbox" data-attendeeId="event__attendee__checkbox--'+ data[i].id +'"/>';
            html += '</div>';
            html += '<label class="event__attendee__label" for="event__attendee__checkbox--'+ data[i].id +'">';
            html += data[i].username;
            html += '</label>';
            // var html =+ data[0].username;
        };
        attendeeList.innerHTML = html;
        resetToggle();
    });

    resetToggle();

    function resetToggle() {
            var attendee = document.querySelectorAll('.event__attendee__checkbox');
            for (var i=0,  tot=attendee.length; i < tot; i++) {
                emitToggle(attendee[i]);
            };


        function emitToggle(attendeeX) {
            attendee[i].onclick = function() {
                var attendeeId = attendeeX.getAttribute('id');
                console.log(attendeeId);
                if (attendeeX.checked === true) {
                    var checkedIn = true;
                } else if (attendeeX.checked === false) {
                    var checkedIn = false;
                }
                console.log(checkedIn);
                socket.emit('guestlist', { attendeeId: attendeeId, checkedIn: checkedIn, checkInTime: Date.now()});
            };
        };
    };

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
