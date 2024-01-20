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
            uri,
            user: window.user
        });
        var e = {};
        var status = 200;

        if (window.user) {
            //var usr = await github.oauth.user(localStorage.user);
            var avis = document.body.querySelectorAll(".avatar-image");
            Array.from(avis).forEach(function(avi) {
                var img = document.createElement("img");
                //img.setAttribute('href', '/:user');
                img.src = window.user.photoURL;
                avi.innerHTML = img.outerHTML;
            });
        }

        Array.from(document.querySelectorAll('dropdown [drop="down"] + *')).forEach(el=>{
            el.classList.remove('active');
        }
        )

        if (sub) {
            console.log(34.1, {
                sub
            });
        } else {
            console.log(34.2, {
                uri,
                options
            });
        }
    }
}
