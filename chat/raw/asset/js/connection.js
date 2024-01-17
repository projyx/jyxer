window.connection = new RTCMultiConnection();

connection.socketURL = 0 < 1 ? "https://wss.jyxer.com:443/" : 'https://muazkhan.com:9001/';

connection.socketMessageEvent = 'video-conference-demo';

connection.session = {
    audio: true,
    video: true,
    data: true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

// STAR_FIX_VIDEO_AUTO_PAUSE_ISSUES
// via: https://github.com/muaz-khan/RTCMultiConnection/issues/778#issuecomment-524853468
var bitrates = 512;
var resolutions = 'Ultra-HD';
var videoConstraints = {};

if (resolutions == 'HD') {
    videoConstraints = {
        width: {
            ideal: 1280
        },
        height: {
            ideal: 720
        },
        frameRate: 30
    };
}

if (resolutions == 'Ultra-HD') {
    videoConstraints = {
        width: {
            ideal: 1920
        },
        height: {
            ideal: 1080
        },
        frameRate: 30
    };
}

connection.mediaConstraints = {
    video: videoConstraints,
    audio: true
};

var CodecsHandler = connection.CodecsHandler;

connection.processSdp = function(sdp) {
    var codecs = 'vp8';

    if (codecs.length) {
        sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
    }

    if (resolutions == 'HD') {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
            audio: 128,
            video: bitrates,
            screen: bitrates
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
            min: bitrates * 8 * 1024,
            max: bitrates * 8 * 1024,
        });
    }

    if (resolutions == 'Ultra-HD') {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
            audio: 128,
            video: bitrates,
            screen: bitrates
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
            min: bitrates * 8 * 1024,
            max: bitrates * 8 * 1024,
        });
    }

    return sdp;
}
;
// END_FIX_VIDEO_AUTO_PAUSE_ISSUES

// https://www.rtcmulticonnection.org/docs/iceServers/
// use your own TURN-server here!
connection.iceServers = [];
connection.iceServers.push({
    urls: 'stun:muazkhan.com:3478',
    credential: 'muazkh',
    username: 'hkzaum'
});
connection.iceServers.push({
    urls: 'turns:muazkhan.com:5349',
    credential: 'muazkh',
    username: 'hkzaum'
});
connection.iceServers.push({
    urls: 'turn:muazkhan.com:3478',
    credential: 'muazkh',
    username: 'hkzaum'
});

connection.onstream = function(event) {
    var existing = document.getElementById(event.streamid);
    if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
    }

    event.mediaElement.removeAttribute('src');
    event.mediaElement.removeAttribute('srcObject');
    event.mediaElement.muted = true;
    event.mediaElement.volume = 0;

    //CAM
    const cams = connection.videosContainer;
    const template = cams.nextElementSibling.content.firstElementChild;
    var el = template.cloneNode(true);
    el.id = event.streamid;

    var video = 0 > 1 ? el.querySelector("video") : document.createElement('video');
    video.setAttribute('autoplay', true);
    video.setAttribute('playsinline', true);
    video.srcObject = event.stream;
    if (event.type === 'local') {
        video.volume = 0;
        video.setAttribute('muted', true);
    }
    if (0 > 1) {
        video.className = "cam-video";
        //el.querySelector("video").parentNode.appendChild(video)
    } else {
        video.srcObject = event.stream;
        var mediaElement = getHTMLMediaElement(video);
    }
    cams.insertAdjacentHTML('beforeend', el.outerHTML);
    document.getElementById(event.streamid).querySelector('video').replaceWith(mediaElement);

    if (event.type === 'local') {
        connection.socket.on('disconnect', function() {
            if (!connection.getAllParticipants().length) {
                location.reload();
            }
        });
    }
}

connection.onstreamended = function(event) {
    var mediaElement = document.getElementById(event.streamid);
    if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
    }
}

connection.onMediaError = function(e) {
    if (e.message === 'Concurrent mic process limit.') {
        if (DetectRTC.audioInputDevices.length <= 1) {
            alert('Please select external microphone. Check github issue number 483.');
            return;
        }

        var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
        connection.mediaConstraints.audio = {
            deviceId: secondaryMic
        };

        connection.join(connection.sessionid);
    }
}


connection.onmessage = function(event) {
    console.log(181, {event});
    if (event.data.message) {
        var chat = document.querySelector(".chat-box").firstElementChild;
        var template = chat.nextElementSibling.content.firstElementChild;
        var el = template.cloneNode(true);
        el.querySelector('font face:last-child').textContent = event.data.message;
        chat.insertAdjacentHTML("beforeend", el.outerHTML);
        return;
    }
}

connection.presence = (room)=>{
    connection.checkPresence(room, function(isRoomExist) {
        if (isRoomExist) {
            connection.join(room);
            return;
        }
        setTimeout(connection.presence, 5000);
    })
}

// detect 2G
if (navigator.connection && navigator.connection.type === 'cellular' && navigator.connection.downlinkMax <= 0.115) {
    alert('2G is not supported. Please use a better internet service.');
}
