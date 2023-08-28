window.onload = async(event)=>{
    console.log(2, "window.onload", {
        manifest: window.manifest
    });

    browse.route(window.location.pathname);
}