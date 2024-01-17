window.rout = {};

window.rout.e = [];
window.rout.ed = (href)=>{
    return href.split('/').filter(o=>o.length > 0);
}
window.rout.er = (href,params)=>{
    if (window.rout.es.length === 0) {
        function compare(a, b) {
            var routed = (c)=>{
                return c.getAttribute('route') ? c.getAttribute('route') : c.getAttribute('routes');
            }
            var aa = routed(a);
            var bb = routed(b);
            var x = rout.ed(aa);
            var y = rout.ed(bb);
            0 < 1 ? console.log(15, aa, bb, x.length, y.length) : null;
            var routes = (z)=>{
                return x.length < y.length ? x : y;
            }
            var alpha = routed(b).localeCompare(routed(a));
            var length = routes(b).length - routes(a).length;
            var paths = rout.ed(aa).length - rout.ed(bb).length;
            return alpha
        }
        Array.from(document.querySelectorAll('[route], [routes]')).sort(compare).reverse().forEach(function(component) {
            var url = component.getAttribute('routes') || component.getAttribute('route');
            var name = url.split("/").filter(o=>o.length > 0).join('.');
            var route = {
                file: name + (name.length > 0 ? "" : "index") + ".html",
                url: url,
            };
            console.log(28, url, component, route);
            window.rout.es.push(route);
        });
        0 < 1 ? window.rout.es.sort(function(a, b) {
            return rout.ed(a.url).length - rout.ed(b.url).length
        }).reverse() : null;
        0 > 1 ? console.log(2, "window.onload", {
            routes: window.routes
        }) : null;
    }

    return new Promise((resolve,reject)=>browser(resolve, reject));
    async function browser(resolve, reject) {
        //URL VARIABLES
        var url = new URL(href,location.origin);
        var pathname = url.pathname;
        var search = url.search ? url.search : null;
        var paths = pathname.split("/").splice(1).filter(n=>n.length > 0);

        //TRANSFORM URL
        var link = pathname;
        if (paths.length > 0) {
            var r = [];
            paths.forEach(async function(path, index) {
                var p = path;
                if (p.startsWith(":")) {
                    var x = p.split(":")[1];
                    if (x === "get") {
                        var pindex = window.location.pathname.split("/").splice(1).filter(n=>n.length > 0);
                        var p = pindex[index];
                        console.log(26, {
                            p,
                            index,
                            pindex
                        });
                    }
                    if (x === "user") {
                        var p = document.body.getAttribute('uid');
                        var p = localStorage.getItem('user');
                        console.log(35, p);
                    }
                } else if (p.startsWith("*")) {
                    p = window.location.pathname.split('/').splice(1)[i];
                }
                r.push(p);
                //return p;
                console.log(43, link, r, p);
            });
            link = "/" + r.join('/');
            console.log(38, link, r);
        }
        pathname = link;
        paths = pathname.split("/").splice(1).filter(n=>n.length > 0);

        //DYNAMIC URL
        var loop = null;
        var pool = null;
        var bool = null;
        var loob = null;
        var shtap = null;
        var dynamic = pathname;
        var matched = pathname;
        if (paths.length > 0) {
            var route = window.rout.es.every(function(route, index) {
                //console.log('manifest.route', {dynamic, url: route.url});
                var path = route.url.split('/').filter(o=>o.length > 0);
                //console.log(41, route.url, path, paths);
                shtap = [];
                bool = [];
                loob = [];
                loop = [];
                pool = [];
                paths.forEach((a,z)=>findComponent(a, z))
                async function findComponent(a, z) {
                    if (paths.length >= path.length) {
                        var p = paths[z];
                        var q = path[z] ? path[z] : null;
                        var d = p;
                        var e = null;
                        if (z < path.length) {
                            0 > 1 ? console.log(62, {
                                z,
                                p,
                                q,
                                path
                            }, route.url) : null;
                            if (q.startsWith(':')) {
                                var b = p.split(':')[1];
                                var c = '*';
                                alert(b);
                                if (b === "user") {
                                    d = localStorage.user;
                                    alert(d);
                                }
                                bool.push(true);
                                //console.log(69, paths[z], q, bool[bool.length - 1]);
                            } else if (a.startsWith('*')) {
                                var c = '*';
                                bool.push(true);
                                //console.log(73, paths[z], q, bool[bool.length - 1]);
                            } else {
                                c = a;
                                bool.push((paths[z] === q) || (q === "*"));
                                //console.log(77, paths[z], q, bool[bool.length - 1]);
                            }
                            e = q === "*" ? q : d;
                            loob.push(c);
                            loop.push(d);
                            shtap.push(c);
                            var h = '/' + pool.join('/') + (z > 0 ? '/' : '') + e;
                            var ifit = window.rout.es.some(e=>e.url.startsWith(h))
                            if (q === "*") {
                                0 > 1 ? console.log(82, {
                                    z,
                                    h,
                                    q,
                                    p,
                                    bool,
                                    path,
                                    paths,
                                    a,
                                    e,
                                    pool,
                                    ifit
                                }) : null;

                                ifit ? pool.push(q) : null
                            } else {
                                0 > 1 ? console.log(98, {
                                    z,
                                    h,
                                    q,
                                    p,
                                    bool,
                                    path,
                                    paths,
                                    a,
                                    e,
                                    pool,
                                    ifit
                                }) : null;
                                if (p === q) {
                                    pool.push(e)
                                }
                            }
                        } else {

                            e = q ? q : d;
                            loop.push(d);
                            shtap.push(d);
                            path[z] ? pool.push(p) : null;
                            bool.push((paths[z] === a && q !== "*"));

                            0 > 1 ? console.log(125, {
                                route,
                                z,
                                h,
                                q,
                                p,
                                bool,
                                path,
                                paths,
                                a,
                                e,
                                pool,
                                ifit
                            }) : null;

                        }
                        0 > 1 ? console.log(66, route.url, {
                            paths,
                            shtap,
                            a,
                            p,
                            q,
                            z,
                            c,
                            d,
                            e,
                            bool,
                            loob,
                            loop,
                            pool
                        }) : null;
                    }
                }
                var booled = bool.length > 0 && bool.every(Boolean);
                var rooted = booled && ('/' + loop.join('/').startsWith(route.url));
                0 > 1 ? console.log(68, {
                    bool,
                    booled,
                    rooted,
                    url: route.url
                }, {
                    loob,
                    loop,
                    pool
                }, {
                    loob: '/' + loob.join('/'),
                    loop: '/' + loop.join('/'),
                    pool: '/' + pool.join('/')
                }) : null;
                if (booled) {
                    dynamic = '/' + shtap.join('/');
                    matched = '/' + pool.join('/');
                    0 > 1 ? console.log(72, {
                        matched,
                        pool
                    }) : null;
                    return false
                } else {
                    return true
                }
            })
            link = '/' + shtap.join('/');
            0 > 1 ? console.log({
                shtap
            }) : null;
        }

        //PAGE ROUTE
        var uri = link + (search ? "?" + search : "");
        var route = window.rout.es.filter(o=>o.url === matched)[0];
        var sr = matched.replaceAll('*', '_').split('/').filter(o=>o.length > 0);
        var name = sr.length > 0 ? sr.join('.') : '';
        var component = document.querySelector('[route="' + route.url + '"], [routes="' + route.url + '"]');
        //console.log(145, route, matched, pool);
        0 > 1 ? console.log(216, {
            route,
            file: route.file,
            path: route.file.split('.html')[0]
        }) : null;
        var options = {
            loop,
            pool,
            component,
            link,
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
        var file = component && component.getAttribute('component') ? (component.getAttribute('component')) : (name.length === 0 ? "_" : name);
        0 < 1 ? console.log(4, "browse.route", {
            file,
            name,
            component,
            huh: '[route="' + route.url + '"]',
            uri,
            sr,
            options,
            params,
            route
        }) : null;
        document.querySelectorAll('component').forEach(c=>c.classList.remove('active'));
        var html = await request('/raw/pages/' + file + '.html');
        console.log(html);
        if (component) {
            component.innerHTML.length === 0 ? component.innerHTML = html : null;
            try {
                uri = window.routes ? await window.routes(uri, options) : "";
                component.classList.add('active');
            } catch (e) {
                console.log(route, route.file, e);
                alert(e.message);
            }
        } else {}

        //VIEW PAGE
        const pop = params && params.pop;
        const mod = matched !== pathname

        const state = {
            url: uri
        }
        if (!["blob:"].includes(window.location.protocol)) {
            if (!(pop)) {
                //console.log(121, obj);
                history.pushState(state, null, uri)
            } else {
                history.replaceState(state, null, uri);
            }
        }
        window.rout.e = {
            paths: uri.split("/").filter(o=>o.length > 1),
            uri
        };
        resolve(route);
    }
}
window.rout.es = [];
