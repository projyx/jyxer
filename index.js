window.onload = async(event)=>{
    window.manifest = await request("/site.webmanifest");
    console.log(2, "window.onload", {
        browse: window.browse,
        manifest: window.manifest,
        request: window.request
    });
    browse.route(window.location.pathname);
}