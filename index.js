window.onload = async(event)=>{
    window.manifest = await request("/site.webmanifest");
    console.log(2, "window.onload", {
        browse: window.browse,
        manifest: window.manifest,
        request: window.request
    });
    browse.route(window.location.pathname);
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
