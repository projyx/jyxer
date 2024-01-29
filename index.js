window.eternity = {};
window.eternity.core = {};
window.eternity.core.state = [];
window.eternity.loop = {};
window.eternity.loop.input = function() {
    return new Promise(function(resolve, reject) {
        resolve([0]);
    }
    )
}
window.eternity.loop.update = function() {
    return new Promise(function(resolve, reject) {
        resolve([1]);
    }
    )
}
window.eternity.loop.render = function() {
    return new Promise(function(resolve, reject) {
        //resolve(Math.random() >= 0.5 ? [0, 1] : [1, 0]);
        resolve([Crypto.uid.create(1)]);
    }
    )
}

window.onload = async(event)=>{
    window.manifest = await request("site.webmanifest");
    console.log(2, "window.onload", {
        browse: window.browse,
        manifest: window.manifest,
        request: window.request
    });
    rout.er(window.location.pathname);
}

window.PHO = {}
window.PHO.ton = {}
window.PHO.ton.icE = ()=>{
    var body = event.target.closest('body');
    body.classList.remove('heads');
    body.classList.remove('tails');
    if (flipResult <= 0.5) {
        body.classList.add('heads');
        body.classList.remove('tails');
        console.log('it is head');
    } else {
        coin.classList.remove('heads');
        coin.classList.add('tails');
        console.log('it is tails');
    }
    var coin = event.target.closest('#coin');
    coin.classList.remove('heads');
    coin.classList.remove('tails');
    if (flipResult <= 0.5) {
        coin.classList.add('heads');
        coin.classList.remove('tails');
        console.log('it is head');
    } else {
        coin.classList.remove('heads');
        coin.classList.add('tails');
        console.log('it is tails');
    }
}
