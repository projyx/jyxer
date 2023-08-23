window.browse = {};

browse.route = (href,params)=>{
    return new Promise((resolve,reject)=>browser(resolve, reject));
    async function browser(resolve, reject) {
        //URL VARIABLES
        var url = new URL(href,location.origin);
        var pathname = url.pathname;
        var search = url.search ? url.search : null;
        var paths = pathname.split("/").splice(1).filter(n=>n);

        //TRANSFORM URL
        var link = pathname;
        if (paths.length > 0) {
            var r = [];
            paths.forEach((path,index)=>schema(path, index));
            function schema(path, index) {
                var p = path;
                if (p.startsWith(":")) {
                    var x = p.split(":")[1];
                    if (x === "room") {
                        p = window.location.pathname.split('/').splice(1)[i];
                    }
                } else if (p.startsWith("*")) {
                    p = window.location.pathname.split('/').splice(1)[i];
                }
                r.push(p);
            }
            link = "/" + r.join('/');
        }

        //DYNAMIC URL
        var loop = null;
        var dynamic = pathname;
        var matched = pathname;
        if (paths.length > 0) {
            var route = window.manifest.routes.every(function(route, index) {
                if (route.url !== "/") {
                    var path = route.url.split('/').filter(o=>o.length > 0);
                    var bool = [];
                    var loob = [];
                    loop = [];
                    path.forEach((a,z)=>findComponent(a, z))
                    async function findComponent(a, z) {
                        if (paths.length === path.length) {
                            var p = paths[z];
                            var d = p;
                            if (p.startsWith(':')) {
                                var b = p.split(':')[1];
                                var c = '*';
                                if (b === "user") {
                                    d = window.auth.user().localId;
                                }
                                bool.push(true);
                            } else if (a.startsWith('*')) {
                                var c = '*';
                                bool.push(true);
                            } else {
                                c = a;
                                bool.push(paths[z] === c);
                            }
                            loob.push(c)
                            loop.push(d)
                        }
                    }
                    if (bool.length > 0 && bool.every(Boolean)) {
                        dynamic = '/' + loob.join('/');
                        matched = '/' + loop.join('/');
                        console.log(68, matched);
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            })
            link = '/' + loop.join('/');
        }

        //PAGE ROUTE
        var uri = link + (search ? "?" + search : "");
        var component = document.querySelector('[route="' + dynamic + '"]');
        var route = window.manifest.routes.filter(o=>o.url === dynamic)[0];
        var options = {
            loop,
            component,
            match: {
                dynamic,
                matched,
                pathname
            },
            route,
            url: {
                search
            }
        };
        console.log(4, "browse.route", {
            uri,
            options,
            params
        });
        document.querySelectorAll('.component').forEach(c=>c.classList.remove('active'));
        var html = await get('/assets/html/' + route.file);
        component.innerHTML.length === 0 ? component.innerHTML = html : null;
        var obj = await window.routes(uri, options);

        //VIEW PAGE
        component.classList.add('active');
        const pop = params && params.pop;
        const mod = matched !== pathname

        const state = {
            url: uri
        }
        if (!(pop)) {
            console.log(121, obj);
            history.pushState(state, null, uri)
        } else {
            history.replaceState(state, null, uri);
        }
        resolve(obj);
    }
}
