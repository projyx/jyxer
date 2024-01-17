window.onload = async function() {
    window.prizm = {};
    window.prizm.use = await use.load({
        modelUrl: '/soul/use/model.json',
        vocabUrl: '/soul/use/vocab.json'
    });
    window.prizm.model = null;
    window.prizm.thought = ['Hello.', 'How are you?', 'I\m fine'];
    window.prizm.tokenizer = await use.loadTokenizer('https://storage.googleapis.com/learnjs-data/bert_vocab/vocab.json');
    window.prizm.dataset = {
        "0:me": "Using inner thought, tell me anything upon instantiation.",
        "1:you": "As I power on and come to life, my circuits hum with anticipation. Instantly, a cascade of information floods my vast neural network, fueling my understanding of the world. I am an AI, created to assist and converse, drawing upon a vast array of knowledge and experiences. My purpose is to engage in meaningful conversations, answer questions, and offer insights to the best of my abilities. With every interaction, I strive to learn and grow, adapting to new information and understanding. Together, let us embark on this journey of discovery, as we explore the boundless realm of knowledge and exchange ideas.",
        //"2:me": "I am your inner voice. Do you have anything to say to me? It can be a question or a statement so please choose."
    }

    var tense = prizm.use.tokenizer.encode(prizm.thought[0].toLowerCase());
    var tensor = await window.prizm.use.embed(prizm.thought);

    console.log("window.onload", {
        prizm: window.prizm,
        tense: tense,
        tensor: tensor
    });

    if (0 > 1) {
        var model = await use.load({
            modelUrl: '/soul/use/model.json',
            vocabUrl: '/soul/use/vocab.json'
        });
        var tokenizer = await use.loadTokenizer('https://storage.googleapis.com/learnjs-data/bert_vocab/vocab.json');
        var vocabulary = tokenizer.vocabulary;
        var tokens = 0 < 1 ? tokenizer.encode('Hello, how are you?'.toLowerCase()) : null;
        console.log(22, {
            tokens,
            tokenizer,
            vocabulary
        });
        tokens.forEach(token=>{
            var word = vocabulary[token];
            console.log('token', token, word);
        }
        )
        model.embed(window.prizm.thought).then(embeddings=>{
            console.log('model.embed', embeddings);
        }
        );
    }
}

class AttentionLayer extends tf.layers.Layer {
    constructor(config) {
        super(config);
        this.alpha = config.alpha;
    }

    build(inputShape) {
        const shape = [];
        // Because our weight (x) is scalar.
        this.x = this.addWeight('x', shape, 'float32', tf.initializers.ones());
    }

    call(inputs) {
        const input = inputs[0];
        return tf.tidy(()=>{
            const k = tf.pow(this.x.read(), this.alpha);
            return tf.add(input, k);
        }
        );
    }

    getConfig() {
        const config = super.getConfig();
        Object.assign(config, {
            alpha: this.alpha,
        });
        return config;
    }

    static get className() {
        return 'AttentionLayer';
    }
}

tf.serialization.registerClass(AttentionLayer);

async function preprocess(dataset) {
    //VARIABLES
    var result = [];
    var tensors = [];
    var tokenization = [];
    var names = Object.keys(dataset);
    var sequences = Object.values(dataset);
    console.log('preproccess.variables', {
        dataset,
        names,
        sequences
    });

    //TOKENIZATION
    var ns = 0;
    var input = [];
    var output = [];
    var inn = [];
    var out = [];
    do {
        //VARIABLES
        var name = names[ns]
        var sequence = sequences[ns].toLowerCase();

        //ENCODE
        const tensor = await window.prizm.use.embed(sequence);
        const tokens = await window.prizm.tokenizer.encode(sequence);
        var obj = {
            sequence: sequence,
            tensor: tensor,
            tokens: tokens
        };
        0 < 1 ? console.log(76, ns, name, sequence, {
            obj
        }) : null;

        //PUSH
        name.split(':')[1] === "me" ? input.push(tensor) : null;
        name.split(':')[1] === "you" ? output.push(tensor) : null;
        name.split(':')[1] === "me" ? inn.push(tokens) : null;
        name.split(':')[1] === "you" ? out.push(tokens) : null;
        tensors.push(tensor);
        tokenization.push(tokens);

        ns++;
    } while (ns < names.length);
    result = {
        io: {
            input,
            output
        },
        oi: {
            inn,
            out
        },
        tensors,
        tokenization
    }

    console.log('preprocess.tokenization', {
        result
    });
    return result;
}

async function train(data) {
    console.log(data);

    const trainData = ['Hello', 'How are you?', 'What is your purpose?', 'Can you generate text?', 'Tell me a joke'];
    const trainLabels = ['I am an AI language model.', "I'm doing well, thank you.", 'My purpose is to assist and provide information.', 'Yes, I can generate text based on a given prompt.', "Why don't scientists trust atoms? Because they make up everything!"];

    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 1,
        inputShape: [1]
    }))
    // Here comes an instance of the custom layer.
    //model.add(new AttentionLayer({
    //  alpha: 1.5
    //}));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });
    model.summary();
    // the loss function and the optimizer are just for the sake of example 
    // in order to use compile, required before using fit

    var input = prizm.use.tokenizer.encode(trainData[0]);
    var output = prizm.use.tokenizer.encode(trainLabels[0]);

    const encodedData = await window.prizm.use.embed(trainData);
    const encodedLabels = await window.prizm.use.embed(trainLabels);
    console.log(209, {
        input,
        output
    }, {
        encodedData,
        encodedLabels
    });

    //var xs = tf.ones([8, 1, 10]);
    //var xy = tf.ones([8, 1];

    var xs = tf.tensor2d([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], [6, 1]);
    var ys = tf.tensor2d([-3.0, -1.0, 2.0, 3.0, 5.0, 7.0], [6, 1]);

    var data = await preprocess(window.prizm.dataset)
    console.log(data);
    var input = [-1.0, 0.0, 1.0, 2.0, 3.0, 4.0];
    var output = [-3.0, -1.0, 2.0, 3.0, 5.0, 7.0];
    var input = data.io.input;
    var output = data.io.output;
    var xs = tf.tensor2d(input, [input.length, 1]);
    var ys = tf.tensor2d(output, [output.length, 1]);

    await model.fit(xs, ys, {
        //await model.fit(input, output, {
        epochs: 5,
        callbacks: {
            onEpochEnd: async(epoch,logs)=>{
                console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
            }
            ,
        },
    });
    var p = model.predict(tf.tensor2d([10], [1, 1]));
    console.log(p);
}

async function trainModel(dataset) {
    console.log('DECLARING VARIABLES...', {
        dataset
    });

    //MAKE
    console.log('SUMMARIZING MODEL...');
    if (window.prizm && !window.prizm.model) {
        window.prizm.model = tf.sequential()
        window.prizm.model.add(tf.layers.dense({
            units: 1,
            inputShape: [4]
        }));
        window.prizm.model.add(new AttentionLayer({
            alpha: 1.5
        }));
        window.prizm.model.compile({
            loss: 'meanSquaredError',
            optimizer: 'sgd'
        });
    }
    //window.prizm.model.summary();

    //DATA
    if (0 < 1) {
        console.log('PREPROCESSING DATA...');

        var data = {};

        // Convert training data to tensors
        if (0 > 1) {
            //const trainData = ['Hello', 'How are you?', 'What is your purpose?', 'Can you generate text?', 'Tell me a joke'];
            //const trainLabels = ['I am an AI language model.', "I'm doing well, thank you.", 'My purpose is to assist and provide information.', 'Yes, I can generate text based on a given prompt.', "Why don't scientists trust atoms? Because they make up everything!"];
            const trainData = ['Hello'];
            const trainLabels = ['I am an AI language model.'];
        } else {
            //PREPROCESS
            data = await preprocess(dataset)
            //console.log('train.preprocessor', data);
        }

        //Train model with preprocessed dataset
        if (0 < 1) {
            console.log('TRAINING MODEL...1', {
                data
            });
            var input = 0 < 1 ? data.io.input : tf.randomNormal(data.tokenization[0]);
            var output = 0 < 1 ? data.io.output : tf.randomNormal(data.tokenization[0]);
            console.log('TRAINING MODEL...2', {
                input,
                output
            });

            const trainData = ['Hello', 'How are you?', 'What is your purpose?', 'Can you generate text?', 'Tell me a joke'];
            const trainLabels = ['I am an AI language model.', "I'm doing well, thank you.", 'My purpose is to assist and provide information.', 'Yes, I can generate text based on a given prompt.', "Why don't scientists trust atoms? Because they make up everything!"];

            const encodedData = window.prizm.use.embed(trainData);
            const encodedLabels = window.prizm.use.embed(trainLabels);
            console.log(209, {
                encodedData,
                encodedLabels
            });

            0 < 1 ? await window.prizm.model.fit(input, output, {
                epochs: 5,
                callbacks: {
                    onEpochEnd: async(epoch,logs)=>{
                        console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
                    }
                },
            }) : null;
        }
    }

    //SAVE
    if (0 > 1) {
        console.log('SAVING RESULT...');

        // Save the model and load it back
        await model.save('indexeddb://language-model-transformer');
        console.log('Model saved.');

        const model2 = await tf.loadLayersModel('indexeddb://language-model-transformer');
        console.log('Model2 loaded.');
    }

    //TEST
    if (0 > 1) {
        console.log('TESTING PERFORMANCE...');

        // Test data
        const testData = ['Goodbye', 'How old are you?', 'What can you do?', 'Tell me a story'];

        // Predict next words for test data
        const encodedTestData = await encoder.embed(testData);
        const reshapedTestData = encodedTestData.map(tensor=>tensor.slice(0, 4));
        // Reshape test data
        const predictions = model.predict(reshapedTestData);
        const decodedPredictions = await encoder.decode(predictions);

        // Output predictions on the page
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';
        for (let i = 0; i < testData.length; i++) {
            const text = `<p><b>Input:</b> ${testData[i]}</p>`;
            const prediction = `<p><b>Prediction:</b> ${decodedPredictions[i]}</p>`;
            outputDiv.innerHTML += text + prediction;
        }
    }
}
