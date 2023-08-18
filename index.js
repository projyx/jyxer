window.onload = async(event)=>{
    window.manifest = await get("/site.webmanifest");
    console.log(2, "window.onload", {
        manifest: window.manifest
    });

    browse.route(window.location.pathname);
}