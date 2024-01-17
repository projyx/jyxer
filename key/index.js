window.onload = function() {
    console.log(2, "window.onload");
    
    firebase.initializeApp({
        apiKey: "AIzaSyA2K41RYhtZm4nx2F1liIJ8ly4ejy6gqc8",
        authDomain: "pro-jyx.firebaseapp.com",
        projectId: "pro-jyx",
        appId: "1:492439614306:web:58cffeca539613b875b23b"
    });
    firebase.auth().onAuthStateChanged(async(user)=>{
        if (user) {
            window.user = user;
            0 < 1 ? console.log(42, 'index.user', {
                user
            }) : null;
            try {
                var uid = user.uid;
                var user = await github.user.self();
                //console.log(user);
                var avatar_url = user.avatar_url;

                document.body.setAttribute('uid', uid)
                localStorage.setItem('githubAccessToken', token);

                localStorage.setItem("user", user.login);

                //rout.er(window.location.pathname);
            } catch (e) {
                console.log(56, 'onAuthStateChanged', {
                    e
                });

                //rout.er(window.location.pathname);
            }
        } else {
            window.user = null;
            localStorage.removeItem('githubAccessToken');
            Array.from(document.body.querySelectorAll(".avatar-image")).forEach(function(avatar) {
                //avatar.innerHTML = "";
            });
            rout.er(window.location.pathname);
        }
        //dom.body.dataset.load = "ed";
    }
    );
}

window.Crypto = crypt = cx = {
    uid: {
        create: x=>{
            if (crypto) {
                var array = new Uint32Array(x);
                crypto.getRandomValues(array);
                //array.length === 1 ? array = array[0] : null;
                return array;
            } else {
                throw new Error("Your browser can't generate secure random numbers");
            }
        }
    }
};

function iiicoin() {
    var d = new Date();
    var date = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    var units = date.split('/');
    if (units.length > 0) {
        var add = [];
        var u = 0;
        do {
            var unit = units[u];
            var sum = unit % 9 || 9;
            add.push(sum);
            u++;
        } while (u < units.length);
        var root = add.reduce((b,a)=>b + a, 0);
        if (root.toString().split('').length > 0) {
            do {
                root = root % 9 || 9;
            } while (root.toString().split('').length > 1)
        }
    }

    var uid = Crypto.uid.create(root);
    var u = 0;
    var arr = [];
    //console.log(uid, root);
    do {
        var num = uid[u];
        //console.log(u, num);
        var str = num.toString();
        var sum = num % 9 || 9;
        arr.push(sum)
        u++;
    } while (u < uid.length);
    const code = parseInt(arr.join(""));

    var obj = {
        code,
        date,
        root
    };
    //console.log(39, obj, arr);
    return obj;
}

function request(resource, options) {
    return new Promise(async function(resolve, reject) {
        await fetch(resource, options).then(async(response)=>{
            //console.log(4, response, options);
            if (!response.ok) {
                return response.text().then(text=>{
                    var text = JSON.stringify({
                        code: response.status,
                        message: JSON.parse(text)
                    });
                    throw new Error(text);
                }
                )
            }
            return response.text();
        }
        ).then(response=>{
            try {
                response = JSON.parse(response);
                resolve(response);
            } catch (err) {
                resolve(response);
            }
        }
        ).catch(error=>{
            console.log("function_get 404 ERROR", {
                error,
                resource,
                options
            });
            reject(error);
        }
        )
    }
    );
}