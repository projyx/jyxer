window.onload = async(event)=>{
    window.manifest = await request("/site.webmanifest");
    console.log(2, "window.onload", {
        manifest: window.manifest
    });
    browse.route(window.location.pathname);
}