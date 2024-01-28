window.onload = function() {
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var obj = iiicoin();
    const input = JSON.stringify(obj, null, 2);
    var qrcode = new QRCode(document.getElementById("qrcode"),{
        text: "https://github.com/iiicoin/iiicoin",
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });    
    document.body.onclick = window.events.onclick.document;
    rout.er(window.location.pathname);
}

firebase.initializeApp({
    apiKey: "AIzaSyA2K41RYhtZm4nx2F1liIJ8ly4ejy6gqc8",
    authDomain: "pro-jyx.firebaseapp.com",
    projectId: "pro-jyx",
    appId: "1:492439614306:web:58cffeca539613b875b23b"
});
firebase.auth().onAuthStateChanged(async(user)=>{
    var pathname = window.location.href.split(document.head.querySelector("base").href)[1];
    console.log(41, {
        pathname
    });
    if (user) {
        window.user = user;
        0 < 1 ? console.log(42, 'index.user', {
            user
        }) : null;
        try {
            var uid = user.uid;
            var user = await github.user.self();
            var avatar_url = user.avatar_url;
            console.log(37, user);

            var img = document.createElement('img');
            img.src = avatar_url;
            var pic = document.getElementById("avatar").querySelector('picture:last-child');
            pic.innerHTML = img.outerHTML;
            pic.src = avatar_url;
            document.body.setAttribute('uid', uid)
            localStorage.setItem("user", user.login);

            rout.er(pathname);
        } catch (e) {
            console.log(56, 'onAuthStateChanged', {
                e
            });

            rout.er(pathname);
        }
    } else {
        window.user = null;
        localStorage.removeItem('githubAccessToken');
        Array.from(document.body.querySelectorAll(".avatar-image")).forEach(function(avatar) {
            avatar.innerHTML = "";
        });
        rout.er(pathname);
    }
    //dom.body.dataset.load = "ed";
}
);

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
    console.log(92, uid, root);
    do {
        var num = u > 0 ? uid[u] : 0;
        console.log(95, u, num);
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

window.Crypto = crypt = cx = {
    uid: {
        create: x=>{
            if (window.crypto || window.msCrypto) {
                var array = new Uint32Array(x);
                window.crypto.getRandomValues(array);
                array.length === 1 ? array = array[0] : null;
                return array;
            } else {
                throw new Error("Your browser can't generate secure random numbers");
            }
        }
    }
};
