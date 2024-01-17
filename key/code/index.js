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
}

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
