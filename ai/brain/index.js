window.onload = function() {
    window.chaos = window.setInterval(function() {
        var brain = document.body.querySelector('brain');
        var storm = brain.querySelector('storm');
        if (storm) {
            if (/[.!?]$/.test(storm.textContent)) {
                storm = document.createElement('storm');
                storm.textContent = storm.textContent + predict.char(storm.textContent);
                brain.insertAdjacentHTML('afterbegin', storm.outerHTML);
            } else {
                storm.textContent = storm.textContent + predict.char(storm.textContent);
            }
        } else {
            storm = document.createElement('storm');
            storm.textContent = storm.textContent + predict.char(storm.textContent);
            brain.insertAdjacentHTML('afterbegin', storm.outerHTML);
        }

        var date = new Date();
        var time = Math.floor(date.getTime() / 1000);
        var pump = {
            time,
            text: brain.querySelector('storm').textContent
        };
        console.log(pump);

        brain.children.length > 50 ? brain.firstElementChild.remove() : null;
    }, 1000);
}

window.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
window.chars = [" ", ".", "!", "?"];

window.predict = {};
predict.char = function(context) {
    var letter = alphabet[randOm(0, alphabet.length - 1)];
    var char = chars[randOm(0, chars.length - 1)];
    return randOm(0, alphabet.length + chars.length - 2) > alphabet.length ? char : letter;
}

function recrypt(unit) {
    const randomBuffer = new Uint32Array(unit);
    return window.crypto.getRandomValues(randomBuffer);
}
function cryptomized(unit) {
    var z = 0;
    var r = [];
    do {
        var a = window.crypto.getRandomValues(new Uint32Array(randOm(1, 9)));
        var n = [];
        var i = 0;
        do {
            var u = a[i];
            var au = u.toString().split('');
            //console.log(459, u, au, thiccRoot(au));
            n.push(thiccRoot(au))
            i++;
        } while (i < a.length);
        m = parseInt(n.join(''));
        0 > 1 ? console.log(457, {
            a,
            m,
            n,
            o: thiccRoot(n),
            z
        }) : null;
        r.push(thiccRoot(n));
        z++;
    } while (z < unit);
    //console.log(480, r);
    return r.join('');
}
function randOm(min, max) {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
}
function thiccRoot(units) {
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
        return root;
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        var randomized = 0 > 1 ? Math.random() : parseFloat('0.' + cryptomized(randOm(11, 22)));
        const j = Math.floor(randomized * (i + 1));
        [array[i],array[j]] = [array[j], array[i]];
    }
}
