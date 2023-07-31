auth.config = {
    apiKey: "AIzaSyCSjuuLaxf0lJ-vqQtJ7d212PN-dVaBxq4",
    authDomain: "codepencil-demo.firebaseapp.com",
    projectId: "codepencil-demo",
    messagingSenderId: "410760136051",
    appId: "1:410760136051:web:a3929b3a4a541cbffeb106"
};

window.api = {
    endpoint: "https://api.uios.computer"
};

window.onload = ()=>{

    //document.body.dataset.theme = "system";

    //eruda.init();

    window.cm = {};

    window.dom = {

        body: document.body,
        boot: byId('boot'),

        "style": document.getElementById("css"),

        "code": document.getElementById("code"),

        "html": document.getElementById('html-editor'),

        "css": document.getElementById('css-editor'),

        "js": document.getElementById('js-editor'),

        "resize": {

            "code": document.getElementById("resizer"),

            "html": document.getElementById('html-resizer'),

            "css": document.getElementById('css-resizer'),

            "js": document.getElementById('js-resizer')

        },

        "iframe": {

            "code": {

                "elem": document.getElementById("preview-code")

            }

        }

    };

    pvw();

    cm.html = CodeMirror(dom.html, {

        lineNumbers: true,

        lineWrapping: true,

        htmlMode: true,

        mode: 'xml',

        styleActiveLine: true,

        theme: 'abcdef',

        matchBrackets: true

    });

    cm.html.on("change", (change)=>{

        upd();

    }
    );

    cm.css = CodeMirror(dom.css, {

        lineNumbers: true,

        lineWrapping: true,

        mode: 'css',

        styleActiveLine: true,

        theme: 'abcdef',

        matchBrackets: true

    });

    cm.css.on("change", (change)=>{

        upd();

    }
    );

    cm.js = CodeMirror(dom.js, {

        lineNumbers: true,

        lineWrapping: true,

        mode: 'javascript',

        styleActiveLine: true,

        theme: 'abcdef',

        matchBrackets: true

    });

    cm.js.on("change", (change)=>{

        upd();

    }
    );

    /*RESIZER*/

    let m_pos;

    function resize(e) {

        const dx = (m_pos - e.x) * -1;

        m_pos = e.x;

        dom.code.style.width = (parseInt(getComputedStyle(dom.code, '').width) + dx) + "px";

        //console.log({m_pos,x:e.x},dx);

    }

    dom.resize.code.addEventListener("mousedown", function(e) {

        //console.log(e.offsetX);

        if (e.offsetX < dom.resize.code.clientWidth) {

            m_pos = e.x;

            body.classList.add('dragging');

            document.addEventListener("mousemove", resize, false);

        }

    }, false);

    document.addEventListener("mouseup", function() {

        body.classList.remove('dragging');

        document.removeEventListener("mousemove", resize, false);

    }, false);

    /*RESIZER*/

    init();

}
;

function init() {

    window.rout.ing = (href,GOT,n,m=GOT[n],root=GOT[0])=>{
        return m.includes("#") || (n > -1);
    }
    ;

    firebase.initializeApp(auth.config);

    dom.body.onclick = (event)=>on.touch.tap(event, "tap");

    (dom.boot.dataset.path ? dom.boot.dataset.path : window.location.pathname).router().then(e=>{
        firebase.auth().onAuthStateChanged(user=>{
            auth.change(user).then(user=>{
                //console.log({user});
                if (user) {} else {
                    localStorage.removeItem('githubAccessToken');
                }
                dom.body.dataset.load = "ed";
            }
            )
        }
        );
    }
    );

}

window.mvc ? null : (window.mvc = {});

window.mvc.v ? null : (window.mvc.v = view = function(route) {
    return new Promise(async function(resolve, reject) {
        var path = route.path;
        var get = route ? route.GOT : rout.ed.dir(dom.body.dataset.path);
        var root = get[0];
        GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);

        if (root) {

            if (root) {
                if (get.length > 1) {

                    const owner = root;
                    const repo = GET[1];
                    const got = get;
                    got.splice(0, 2);
                    const path = rout.ed.url(got);
                    console.log(227, {path});

                    const endpoint = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents' + path;
                    const settings = {};
                    const accessToken = localStorage.githubAccessToken;
                    accessToken ? settings.headers = {
                        Accept: "application/vnd.github+json",
                        Authorization: "token " + accessToken
                    } : null;
                    ajax(endpoint, settings).then((d)=>{
                        const data = JSON.parse(d);
                        //console.log('folder found', endpoint,{data});
                        if (data.length > 0) {
                            var x = 0;
                            do {
                                var row = data[x];
                                var type = row.type;
                                if (type === "file") {
                                    var name = row.name;
                                    if (["index.html", "index.css", "index.js"].includes(name)) {
                                        0 > 1 ? console.log('content found', {
                                            name
                                        }) : null;

                                        const endpoint = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents' + path + name;
                                        const settings = {};
                                        const accessToken = localStorage.githubAccessToken;
                                        accessToken ? settings.headers = {
                                            Accept: "application/vnd.github+json",
                                            Authorization: "token " + accessToken
                                        } : null;
                                        ajax(endpoint, settings).then((d)=>{
                                            const data = JSON.parse(d);
                                            const content = data.content;
                                            var name = data.name;
                                            var parts = name.split('.');
                                            var ext = parts[parts.length - 1];
                                            const code = atob(content);

                                            cm[ext].setValue(code);
                                            0 > 1 ? console.log(endpoint, {
                                                ext,
                                                code,
                                                name
                                            }) : null;
                                        }
                                        );
                                    }
                                }
                                x++;
                            } while (x < data.length);
                        }
                    }
                    );

                }
            }
            resolve(route);

        } else {
            resolve(route);
        }
    }
    );
}
);

window.mvc.c ? null : (window.mvc.c = controller = {
    users: {
        logout: target=>{
            auth.account.close().then(modal.exit(target));
        }
        ,
        profile: async()=>{
            if (localStorage.githubAccessToken) {
                var href = (auth.user() ? '/users/' + auth.user().uid + "/" : '/my/');
                var nav = byId('template-editor-nav').content.firstElementChild;
                var popup = await modal.popup(nav.outerHTML);
                popup.className = "absolute-full bg-black-1-2 fixed";
                popup.dataset.tap = "event.target.tagName === 'ASIDE' ? modal.exit(event.target) : null";
                popup.dataset.zIndex = 7;
                console.log({
                    nav
                });
            } else {
                var provider = new firebase.auth.GithubAuthProvider();
                provider.addScope('repo');
                provider.setCustomParameters({
                    'redirect_uri': 'https://codepen.io/anoniiimous/pen/WNMvNoY'
                });

                firebase.auth().signInWithPopup(provider).then((result)=>{
                    var credential = result.credential;
                    var token = credential.accessToken;
                    var user = result.user;
                    console.log({
                        result
                    });
                    localStorage.setItem('githubAccessToken', token);
                }
                ).catch((error)=>{
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    console.log({
                        error
                    });
                }
                );
            }
        }
    }
});

function getBlobURL(code, type) {

    const blob = new Blob([code],{
        type
    });

    return URL.createObjectURL(blob);

}

function getPageURL(html, css, js) {

    const cssURL = getBlobURL(css, 'text/css');

    const jsURL = getBlobURL(js, 'text/javascript');

    const source = `

    <html>

      <head>

        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}

        ${js && `<script src="${jsURL}">${atob('PC9zY3JpcHQ+')}`}

      </head>

      <body>

        ${html || ''}

      </body>

    </html>

  `;

    return getBlobURL(source, 'text/html');

}

function pvw() {

    dom.iframe.code.doc = document.getElementById("preview-code").contentDocument;

    dom.iframe.code.head = document.getElementById("preview-code").contentDocument.querySelector('head');

    dom.iframe.code.head.innerHTML = '<style id="style"></style>';

    dom.iframe.code.style = dom.iframe.code.head.querySelector('style');

    dom.iframe.code.body = document.getElementById("preview-code").contentDocument.querySelector('body');

}

function upd() {

    pvw();

    var html = cm.html.getValue();

    var css = cm.css.getValue();

    var js = cm.js.getValue();

    var page = getPageURL(html, css, js);

    dom.iframe.code.style.textContent = css;

    dom.iframe.code.elem.src = page;

}
