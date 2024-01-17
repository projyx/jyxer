window.api = {};

window.api.auth = {};

window.api.rooms = {};
window.api.rooms.random = function() {
    request('/raw/asset/json/rooms.json').then(room);
    function room(rooms) {
        console.log(9, rooms);
        var n = Math.floor(Math.random() * (rooms.length - 0 + 1) + 0);
        console.log(10, 'api.rooms.random', rooms.length, n);
        var room = rooms[n].name;
        rout.er('/chat/' + room);
    }
}
window.api.rooms.join = function() {
    disableInputButtons();
    connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExist, roomid, error) {
        if(error) {
          disableInputButtons(true);
          alert(error);
        }
        else if (connection.isInitiator === true) {
            // if room doesn't exist, it means that current user will create the room
            showRoomURL(roomid);
        }
    });
}
window.api.rooms.message = function(event) {
    event.preventDefault();    
    const form = event.target;
    const text = form.querySelector('input[type="text"]');
    const id = connection.userid + connection.token();
    const message = text.value;
    connection.send({
        id,
        message
    })
    text.value = "";
}
