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

        if (sub) {
            if (sub === "my") {
                console.log(sub);
            }
        } else {
            console.log("Home Page");
        }

        resolve(obj)
    }
}
