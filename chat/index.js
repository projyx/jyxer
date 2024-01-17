window.onload = async(event)=>{
    function compare(a, b) {
        var routed = (c)=>{
            return c.getAttribute('route') ? c.getAttribute('route') : c.getAttribute('routes');
        }
        var aa = routed(a);
        var bb = routed(b);
        var x = rout.ed(aa);
        var y = rout.ed(bb);
        0 > 1 ? console.log(15, aa, bb, x.length, y.length) : null;
        var routes = (z)=>{
            return x.length < y.length ? x : y;
        }
        var alpha = routed(b).localeCompare(routed(a));
        var length = routes(b).length - routes(a).length;
        var paths = rout.ed(aa).length - rout.ed(bb).length;
        return alpha
    }
    Array.from(document.querySelectorAll('[route], [routes]')).sort(compare).forEach(function(component) {
        var route = {
            file: component.getAttribute('component') + ".html",
            url: component.getAttribute('route') || component.getAttribute('routes'),
        };
        window.rout.es.push(route);
    });
    0 < 1 ? window.rout.es.sort(function(a, b) {
        return rout.ed(a.url).length - rout.ed(b.url).length
    }).reverse() : null;
    0 > 1 ? console.log(2, "window.onload", {
        routes: window.routes
    }) : null;

    console.log(window.location.pathname);
    var boot = document.querySelector('boot');
    rout.er(boot && boot.getAttribute('route') ? boot.getAttribute('route') : window.location.pathname);

    document.body.onclick = window.events.onclick.document;
}

window.onpopstate = (event)=>{
    var state = event.state;
    console.log(event, state);
    if (state && state.url) {
        console.log(state);
        state.url.length > 0 ? rout.er(state.url, {
            pop: true
        }) : null;
    }
}
