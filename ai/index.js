//APP
window.app = {};
app.init = async function() {
    document.body.classList.add('ing');

    window.emotions = await fetch("/assets/json/emotions.json").then(r=>r.json());

    window.movie_lines = await fetch("https://prizmus.endk.it/movie_lines.txt").then(r=>r.text());

    let lines = {};
    movie_lines.split("\n").forEach(l=>{
        let parts = l.split(" +++$+++ ");
        lines[parts[0]] = parts[4];
    }
    );

    window.questions = [];
    window.responses = [];
    let movie_conversations = await fetch("assets/txt/movie_conversations.txt").then(r=>r.text());
    movie_conversations.split("\n").forEach(c=>{
        let parts = c.split(" +++$+++ ");
        if (parts[3]) {
            let phrases = parts[3].replace(/[^L0-9 ]/gi, "").split(" ").filter(x=>!!x);
            // Split & remove empty lines
            for (let i = 0; i < phrases.length - 1; i++) {
                questions.push(lines[phrases[i]]);
                responses.push(lines[phrases[i + 1]]);
            }
        }
    }
    );

    app.render();
}
app.render = function() {
    0 > 1 ? console.log(123, {
        model: window.model
    }) : null;

    document.body.classList.remove("load", "ing");
    document.body.onclick = function(event) {
        var target = event.target
        var submit = target.closest('[submit]');
        if (submit) {
            submit.querySelector('[type="submit"]').click();
        }
    }

    //get.json("https://efx-dev.stitchcredit.com/api/users/efx-latest-scores").then((e) => {
    //console,log(52, e) 
    //})

}

//API
window.api = {};
api.config = {
    endpoint: "https://api.prizm.workers.dev"
}

//GET
window.get = {};
get.html = async function(resource, options) {
    try {
        var data = await fetch(resource, options).then(async(response)=>{
            if (!response.ok) {
                return response.text().then(text=>{
                    var text = JSON.stringify({
                        code: response.status,
                        message: text
                    });
                    throw new Error(text);
                }
                )
            }
            return response.text();
        }
        ).then(html=>{
            if (html) {
                return html;
            } else {
                throw new Error(html);
            }
        }
        ).catch(error=>{
            console.log("get.html 404 ERROR", error);
            return error;
        }
        );
    } catch (error) {
        console.log(error);
    }
}
get.json = function(resource, options) {
    return new Promise(async function(resolve, reject) {
        await fetch(resource, options).then(async(response)=>{
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
            if (JSON.parse(response)) {
                resolve(JSON.parse(response));
            } else {
                throw new Error(response);
            }
        }
        ).catch(error=>{
            console.log("get.json 404 ERROR", error);
            reject(error);
        }
        )
    }
    );
}

//HANDLE
var handle = {};

handle.onkeydown = {};
handle.onkeydown.question = async function(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
        event.preventDefault();
        return false;
    }
}

handle.onkeyup = {};
handle.onkeyup.question = async function(event) {
    var keyCode = event.keyCode;
    var target = event.target;
    //console.log(keyCode, target, target.value, target.value.length);
    if (keyCode === 13) {
        event.preventDefault();
        if (target.value.length > 0) {
            target.closest('form').querySelector('input[type="submit"]').click();
        }
    }

    textarea = event.target;
    textarea.style.height = 0;
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.style.height = textarea.scrollHeight + 'px';
}

handle.submit = {};
handle.submit.question = async function(event) {
    event.preventDefault();

    //window.encoder ? null : window.encoder = await use.load();
    window.model && 0 > 1 ? null : window.model = 0 > 1 ? await use.loadQnA() : await use.loadQnA({
        modelUrl: '/soul/mobilebert/index.json'
    })

    let question = document.getElementById("question").value;
    document.getElementById("question").value = "";
    var message = document.createElement('question');
    message.textContent = question;
    document.body.querySelector('main > section').insertAdjacentHTML('beforeend', message.outerHTML);

    document.body.scrollTop = document.body.scrollHeight + document.body.querySelector('main').clientHeight;

    let emotion = emotions[randOm(0, window.emotions.length)];

    var textGeneration = null;
    if (0 < 1) {
        textGeneration = await ai.generateText(question);
        console.log(167, {
            textGeneration
        });
    }

    if (0 > 1) {
        var title = "Stack Overflow";
        var json = await get.json("https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=" + title);
        var query = json.query;
        var pages = query.pages;
        var page = pages["21721040"];
        var context = page.extract;
        console.log({
            json,
            query,
            pages,
            page,
            context
        });
        console.log('Answers: ', {
            //answers,
            context
        });
    }

    if (0 > 1) {
        //var answers = await window.model.findAnswers(question, context);

        if (reswer) {
            var answer = {
                text: reswer
            }
        } else {
            var answer = {
                text: "I don't know."
            }
        }
    }

    var text = textGeneration.sentence;
    var message = document.createElement('answer');
    message.textContent = text;
    document.body.querySelector('main > section').insertAdjacentHTML('beforeend', message.outerHTML);

    console.log('handle.submit.question', {
        context,
        question,
        answer: text
    });

    document.body.scrollTop = document.body.scrollHeight + document.body.querySelector('main').clientHeight;
}

//AI
window.ai = {
    generateText: async(interaction)=>{

        //window.lmodel = null;

        // Load GoEmotions data (https://github.com/google-research/google-research/tree/master/goemotions)
        let data = await fetch("/assets/txt/emotions.tsv").then(r=>r.text());
        let lines = data.split("\n").filter(x=>!!x);
        // Split & remove empty lines

        // Randomize the lines
        shuffleArray(lines);

        // Process 200 lines to generate a "bag of words"
        const numSamples = lines.length;
        let bagOfWords = {};
        let allWords = [];
        let wordReference = {};
        let sentences = lines.slice(0, numSamples).map(line=>{
            let sentence = line.split("\t")[0];
            return sentence;
        }
        );

        sentences.forEach(s=>{
            let words = s.replace(/[^a-z ]/gi, "").toLowerCase().split(" ").filter(x=>!!x);
            words.forEach(w=>{
                if (!bagOfWords[w]) {
                    bagOfWords[w] = 0;
                }
                bagOfWords[w]++;
                // Counting occurrence just for word frequency fun
            }
            );
        }
        );

        allWords = Object.keys(bagOfWords);
        allWords.forEach((w,i)=>{
            wordReference[w] = i;
        }
        );

        // Generate vectors for sentences
        let vectors = sentences.map(s=>{
            let vector = new Array(allWords.length).fill(0);
            let words = s.replace(/[^a-z ]/gi, "").toLowerCase().split(" ").filter(x=>!!x);
            words.forEach(w=>{
                if (w in wordReference) {
                    vector[wordReference[w]] = 1;
                }
            }
            );
            return vector;
        }
        );

        let outputs = lines.slice(0, numSamples).map(line=>{
            let categories = line.split("\t")[1].split(",").map(x=>parseInt(x));
            let output = [];
            for (let i = 0; i < emotions.length; i++) {
                output.push(categories.includes(i) ? 1 : 0);
            }
            return output;
        }
        );

        //CREATE MODEL
        window.emodel ? null : window.emodel = null;
        if (0 > 1 && !window.emodel) {
            window.emodel = tf.sequential();
            window.emodel.add(tf.layers.dense({
                units: 100,
                activation: "relu",
                inputShape: [allWords.length]
            }));
            window.emodel.add(tf.layers.dense({
                units: 50,
                activation: "relu"
            }));
            window.emodel.add(tf.layers.dense({
                units: 25,
                activation: "relu"
            }));
            window.emodel.add(tf.layers.dense({
                units: emotions.length,
                activation: "softmax"
            }));

            window.emodel.compile({
                optimizer: tf.train.adam(),
                loss: "categoricalCrossentropy",
                metrics: ["accuracy"]
            });

            const xs = tf.stack(vectors.map(x=>tf.tensor1d(x)));
            const ys = tf.stack(outputs.map(x=>tf.tensor1d(x)));
            await window.emodel.fit(xs, ys, {
                epochs: 50,
                shuffle: true,
                callbacks: {
                    onEpochEnd: (epoch,logs)=>{
                        //setText( `Training... Epoch #${epoch} (${logs.acc})` );
                        console.log("Epoch #", epoch, logs);
                    }
                }
            });
        } else {
            window.emodel = await tf.loadLayersModel('/soul/iris/index.json');
        }

        //GENERATE TEXT
        var emotion = await emoteIon(interaction);
        var context = await sayThat(emotion);
        var keywords = await wordUp(context);
        var sentence = await lineThem(keywords);
        var obj = {
            interaction,
            emotion,
            context,
            keywords,
            sentence
        };
        console.log(368, obj);
        return obj;

        var reswer = null;
        async function emoteIon(q) {

            let line = lines[Math.floor(parseFloat("0." + cryptomized(randOm(11, 22))) * lines.length)];
            let sentence = line.split("\t")[0];
            let categories = line.split("\t")[1].split(",").map(x=>parseInt(x));
            console.log(376, sentence);

            // Generate vectors for sentences
            let vector = new Array(allWords.length).fill(0);
            let words = (0 < 1 ? interaction : sentence).replace(/[^a-z ]/gi, "").toLowerCase().split(" ").filter(x=>!!x);
            words.forEach(w=>{
                if (w in wordReference) {
                    vector[wordReference[w]] = 1;
                }
            }
            );

            try {
                var prediction = await window.emodel.predict(tf.stack([tf.tensor1d(vector)])).data();
                // Get the index of the highest value in the prediction
                let id = prediction.indexOf(Math.max(...prediction));
                let eid = emotions[id];
                var cat = emotions[categories[0]];
                //setText(`Result: ${eid}, Expected: ${cat}`);

                0 < 1 ? console.log(391, {
                    prediction,
                    id
                }, {
                    eid,
                    cat
                }) : null;
            } catch(e) {
                console.log(e);
            }

            reswer = sentence;

            var emotion = cat ? cat : null;
            return emotion;
        }
        async function sayThat(e) {
            console.log('sayThat', e);
            var context = '';
            return context;
        }
        async function wordUp(c) {
            console.log('wordUp', c);
            var keywords = [];
            return keywords;
        }
        async function lineThem(k) {
            console.log('lineThem', k);

            if (0 > 1) {
                // Run the calculation things
                const numSamples = questions.length;
                var rand = 0 > 1 ? Math.random() : parseFloat("0." + cryptomized(randOm(11, 22)));
                let randomOffset = Math.floor(rand * questions.length);
                const input = {
                    queries: [question],
                    responses: questions.slice(randomOffset, numSamples)
                };
                let embeddings = await model.embed(input);
                tf.tidy(()=>{
                    const embed_query = embeddings["queryEmbedding"].arraySync();
                    const embed_responses = embeddings["responseEmbedding"].arraySync();
                    let scores = [];
                    embed_responses.forEach(response=>{
                        scores.push(math.dotProduct(embed_query[0], response));
                    }
                    );
                    let id = scores.indexOf(Math.max(...scores));
                    console.log({
                        responses
                    }, responses[randomOffset + id]);
                    reswer = responses[randomOffset + id];
                }
                );
                embeddings.queryEmbedding.dispose();
                embeddings.responseEmbedding.dispose();
            }

            var sentence = reswer;
            return sentence;
        }
    }
}

//MATH
var math = {};
math.dotProduct = (xs,ys)=>{
    const sum = xs=>xs ? xs.reduce((a,b)=>a + b, 0) : undefined;
    return xs.length === ys.length ? sum(math.zipWith((a,b)=>a * b, xs, ys)) : undefined;
}
math.zipWith = (f,xs,ys)=>{
    const ny = ys.length;
    return (xs.length <= ny ? xs : xs.slice(0, ny)).map((x,i)=>f(x, ys[i]));
}

//CRYPT
Crypto = crypt = cx = {
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

//FUNCTIONS
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
    } while (z < unit - 1);
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
