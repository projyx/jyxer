window.routes = function(uri, options) {
    return new Promise((resolve,reject)=>viewer(resolve, reject));
    async function viewer(resolve, reject) {
        var component = options.component;
        var obj = {};
        var paths = uri.split('/').splice(1);
        var sub = paths[0]
        console.log(5, 'routes.js', {
            options,
            paths,
            uri
        });
        var e = {};
        var status = 200;

        if (sub) {
            if (sub === "chat") {
                if (paths.length > 1) {
                    //UI
                    var room = paths[1];
                    console.log(component);
                    component.querySelector('.room-header [value="name"]').textContent = room;

                    //JOIN
                    connection.videosContainer = component.querySelector(".cams-users > section");
                    if (0 < 1) {
                        connection.openOrJoin(room, function(isRoomExist, roomid, error) {
                            if (error) {
                                alert(error);
                            } else if (connection.isInitiator === true) {
                                console.log(26, {
                                    roomid
                                });
                            }
                        })
                    }

                    //CAMS
                    const cams = component.querySelector('.cams-users').firstElementChild;
                    const template = cams.nextElementSibling.content.firstElementChild;
                    var i = 0;
                    do {
                        var el = template.cloneNode(true);
                        //cams.insertAdjacentHTML('beforeend', el.outerHTML);
                        i++;
                    } while (i < 7)
                } else {
                    console.log('Chat Page');
                }
            }
        } else {
            /*USERS*/
            const users = component.querySelector('#people-user');
            const user = users.content.firstElementChild.cloneNode(true);

            users.previousElementSibling.innerHTML = "";
            var i = 0;
            do {
                users.previousElementSibling.insertAdjacentHTML('beforeend', user.outerHTML);
                i++;
            } while (i < 12);

            /*ROOMS*/
            const rooms = component.querySelector('#trendy-room');
            const room = rooms.content.firstElementChild.cloneNode(true);

            rooms.previousElementSibling.innerHTML = "";
            var i = 0;
            do {
                rooms.previousElementSibling.insertAdjacentHTML('beforeend', room.outerHTML);
                i++;
            } while (i < 24);
        }

        console.log(135, uri);
        status === 200 ? resolve(uri) : reject(e);
    }
}
