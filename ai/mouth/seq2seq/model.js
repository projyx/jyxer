// Define the model architecture
function createModel() {
    const model = tf.sequential();

    // Encoder
    model.add(tf.layers.lstm({
        units: 128,
        inputShape: [null, 1],
        returnSequences: false
    }));

    // Repeat vector to match decoder input shape
    model.add(tf.layers.repeatVector({
        n: 10
    }));

    // Decoder
    model.add(tf.layers.lstm({
        units: 128,
        returnSequences: true
    }));

    model.add(tf.layers.timeDistributed({
        layer: tf.layers.dense({
            units: 1
        })
    }));

    return model;
}

// Prepare the data for training
function prepareData() {
    const data = [{
        input: "Hello",
        output: "Hi"
    }, {
        input: "What's your name?",
        output: "I am a chatbot"
    }, // Add more training examples here
    ];

    const inputSeqs = data.map(entry => entry.input.split("").map(char => [char.charCodeAt(0)]));
    const outputSeqs = data.map(entry => entry.output.split("").map(char => [char.charCodeAt(0)]));

    //const inputSeqs = [[[72], [101], [108], [108], [111]], [[87], [104], [97], [116], [39], [115], [32], [121], [111], [117], [114], [32], [110], [97], [109], [101], [63]], ];
    //const outputSeqs = [[[72], [105]], [[73], [32], [97], [109], [32], [97], [32], [99], [104], [97], [116], [98], [111], [116]], ];

    const maxInputLength = Math.max(...inputSeqs.map(seq=>seq.length));
    const maxOutputLength = Math.max(...outputSeqs.map(seq=>seq.length));

    console.log(inputSeqs, [inputSeqs.length, inputSeqs[0].length, 1], outputSeqs, [outputSeqs.length, maxOutputLength, 1])
    const inputTensor = tf.tensor3d(inputSeqs, [inputSeqs.length, inputSeqs[0].length, 1]);
    const outputTensor = tf.tensor3d(outputSeqs, [outputSeqs.length, outputSeqs[0].length, 1]);

    return {
        inputTensor,
        outputTensor
    };
}

//console.log(inputSeqs, [inputSeqs.length, maxInputLength, 1], outputSeqs, [outputSeqs.length, maxOutputLength, 1])

// Train the model
async function trainModel(model, inputTensor, outputTensor) {
    const learningRate = 0.01;
    const optimizer = tf.train.adam(learningRate);
    model.compile({
        optimizer,
        loss: 'meanSquaredError'
    });

    const batchSize = 2;
    const epochs = 100;

    console.log('Model fitting...');
    const history = await model.fit(inputTensor, outputTensor, {
        batchSize,
        epochs,
        shuffle: true,
        validationSplit: 0.2,
        //callbacks: tf.node.tensorBoard('./logs')
    });
    console.log('Model fitted...');
}

// Save the model
async function saveModel(model) {
    await model.save('model');
    console.log('Model saved.');
}

// Create and train the model
async function main() {
    console.log('Create model...');
    const model = createModel();
    const {inputTensor, outputTensor} = prepareData();
    console.log('Train model...', {
        inputTensor,
        outputTensor
    });
    await trainModel(model, inputTensor, outputTensor);
    console.log('Training complete...', {
        inputTensor,
        outputTensor
    });
    await saveModel(model);
}

main().catch(console.error);
