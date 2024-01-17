window.onload = async function() {
    var mouth = document.body.querySelector('mouth');
    var words = document.createElement('words');
    words.textContent = 0 < 1 ? "I am an AI language model capable of generating responses and insights. What can I learn and explore today?" : null;
    mouth.insertAdjacentHTML('beforeend', words.outerHTML);

    // Train the model
    const trainData = ['Hello', 'How are you?', 'What is your purpose?', 'Can you generate text?', 'Tell me a joke'];
    const trainLabels = ['I am an AI language prizm.', "I'm doing well, thank you.", 'My purpose is to assist and provide information.', 'Yes, I can generate text based on a given prompt.', "Why don't scientists trust atoms? Because they make up everything!"];

    window.model = await use.load();

    window.spark = {};
    window.spark.tokenizer = await use.loadTokenizer('/assets/json/vocab.json');
    window.spark.thought = 'Hello, how are you?';
    window.spark.convo = await tf.loadLayersModel('/soul/iris/index.json')

    var te = spark.tokenizer.encode(spark.thought);
    console.log(te);

    // Function to generate text using an autoregressive model
    async function generateText(prompt, maxLength) {
        // Load the Universal Sentence Encoder model

        let generatedText = prompt;
        console.log(18, {
            generatedText
        });

        // Generate text iteratively
        var ml = 0 > 1 ? generatedText : trainData;
        for (let i = 0; i < (0 > 1 ? maxLength : ml.length); i++) {
            // Encode the generated text using the Universal Sentence Encoder
            var data = [ml[i]];
            const tensor = await model.embed(data);
            var obj = {
                data: data,
                embeddings: spark.tokenizer.encode(trainData[i]),
                prompt: prompt,
                tensor: tensor,
                text: generatedText
            };

            0 > 1 ? console.log({
                encodedText
            }) : console.log('generate_text: ' + prompt, obj);

            // Decode the generated text back to human-readable format
            generatedText = await decodeText(obj);
        }

        return generatedText;
    }

    // Function to decode the encoded text
    async function decodeText(obj) {
        var tensor = obj.tensor;
        decodedText = 0 > 1 ? model.print(true) : tensor;
        const tensorArray = tensor.arraySync();
        const readableString = tensorArray.map(row => row.join(' ')).join('\n');

        var nextWord = window.model.tokenizer.vocabulary[Math.floor(Math.random() * 800)][0]
        //const scores = tf.matMul(tensor).dataSync();

        try {
            //const inputTensor = tf.tensor2d(spark.tokenizer.encode(obj.prompt));
            //var predict = spark.convo.predict(inputTensor);
            //console.log(predict)
        } catch(e) {
            console.log(e)
        }

        0 > 1 ? console.log({
            decodedText
        }) : console.log('decoded_text', {
            obj,
            decodedText: decodedText,
            tensorArray: tensorArray,
            readableString: readableString,
            nextWord: nextWord
        });

        return decodedText;
    }

    // Example usage
    if (0 < 1) {
        try {
            var generatedText = 0 < 1 ? await generateText(spark.thought, 100) : null;
            console.log('Generated Text:', generatedText);
        } catch (e) {
            console.error('Error generating text:', error);
        }
    }

    // Model
    if (0 > 1) {

        // Define the input and output sizes
        const inputSize = trainData.length;
        const outputSize = trainLabels.length;

        // Convert input data to embeddings
        const trainDataEmbeddings = await model.embed(trainData);
        const trainDataArray = trainDataEmbeddings.arraySync();

        const trainDataTensor = tf.tensor2d(trainDataArray);

        // Reduce the dimensionality of trainDataTensor to match the desired input shape
        const reshapedTrainDataTensor = trainDataTensor.mean(1);

        const trainLabelsTensor = tf.tensor2d(trainLabels.map(label=>[...label]));

        // Define the model architecture
        const prizm = tf.sequential();
        prizm.add(tf.layers.dense({
            units: 32,
            activation: 'relu',
            inputShape: [inputSize]
        }));
        prizm.add(tf.layers.dense({
            units: 16,
            activation: 'relu'
        }));
        prizm.add(tf.layers.dense({
            units: outputSize,
            activation: 'softmax'
        }));

        // Compile the model
        prizm.compile({
            loss: 'categoricalCrossentropy',
            optimizer: 'adam',
            metrics: ['accuracy']
        });

        prizm.fit(trainDataTensor, trainLabelsTensor, {
            epochs: 10
        }).then(()=>{
            console.log('Model training completed.');

            // Generate text using the trained model
            const generatedText = generateText('Once upon a time', 100);
            const outputDiv = document.getElementById('output');
            outputDiv.innerText = generatedText;
        }
        );
    }

}

window.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
window.chars = [" ", ".", "!", "?"];

window.predict = {};
predict.char = function(context) {
    var letter = alphabet[randOm(0, alphabet.length - 1)];
    var char = chars[randOm(0, chars.length - 1)];
    return randOm(0, alphabet.length + chars.length - 2) > alphabet.length ? char : letter;
}
predict.word = function() {
    console.log(25);
}
predict.getText = function() {
    predict.word();
}
predict.setText = function(e) {
    n.forEach(function(e) {
        e.disabled = !0
    });
    var t = w.foundation_.getValue();
    w.foundation_.setValue(t += e = " " + e),
    u.selectionStart = u.selectionEnd = u.value.length,
    u.scrollLeft = u.scrollWidth,
    w.foundation_.activateFocus(),
    window.getText(),
    n.forEach(function(e) {
        e.disabled = !1
    })
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
