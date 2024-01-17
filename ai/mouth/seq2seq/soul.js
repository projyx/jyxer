// Define the model architecture
function createModel(maxInputLength, maxOutputLength) {
    console.log({
        maxInputLength,
        maxOutputLength
    })
    const model = tf.sequential();

    // Encoder
    model.add(tf.layers.lstm({
        units: 128,
        inputShape: [null, 1],
        returnSequences: false
    }));

    // Repeat vector to match decoder input shape
    model.add(tf.layers.repeatVector({
        n: Math.max(maxInputLength, maxOutputLength)
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
async function prepareData() {
    var data = [{
        input: "Hello",
        output: "Hi"
    }, {
        input: "What's your name?",
        output: "I am a chatbot"
    }, // Add more training examples here
    ];

    var inputSeqs = [];
    var outputSeqs = [];

    var dataset = await fetch('/assets/txt/dialogs.txt').then(response=>{
        return response.text()
    }
    );
    let lines = dataset.split("\n").filter(x=>!!x);
    var data = [];
    for (let i = 0; i < lines.length - 1; i++) {
        data.push({
            input: lines[i].split('\t')[0],
            output: lines[i].split('\t')[1]
        })
        //inputSeqs.push(lines[i].split('\t')[0]);
        //outputSeqs.push(lines[i].split('\t')[1]);
    }
    inputSeqs = data.map(entry=>entry.input.split("").map(char=>[char.charCodeAt(0)]));
    outputSeqs = data.map(entry=>entry.output.split("").map(char=>[char.charCodeAt(0)]));
    console.log(56, 'dataset', {
        data,
        lines,
        inputSeqs,
        outputSeqs
    });

    const maxInputLength = Math.max(...inputSeqs.map(seq=>seq.length));
    const maxOutputLength = Math.max(...outputSeqs.map(seq=>seq.length));

    // Pad sequences with zeros to have the same length
    inputSeqs.forEach(seq=>{
        0 > 1 ? console.log(70, {
            seq
        }) : null;
        while (seq.length < maxInputLength) {
            seq.push([0]);
        }
    }
    );

    outputSeqs.forEach(seq=>{
        while (seq.length < maxInputLength) {
            seq.push([0]);
            // Use maxInputLength here instead of maxOutputLength
        }
    }
    );

    // Convert to 3D tensors
    const inputTensor = tf.tensor3d(inputSeqs, [data.length, maxInputLength, 1]);
    const outputTensor = tf.tensor3d(outputSeqs, [data.length, maxInputLength, 1]);

    return {
        inputTensor,
        outputTensor,
        maxInputLength,
        maxOutputLength
    };
}

//console.log(inputSeqs, [inputSeqs.length, maxInputLength, 1], outputSeqs, [outputSeqs.length, maxOutputLength, 1])

// Train the model
let train = false;
async function trainModel(model, inputTensor, outputTensor) {
    const learningRate = 0.01;
    const optimizer = tf.train.adam(learningRate);
    model.compile({
        optimizer,
        loss: 'meanSquaredError'
    });

    const batchSize = 100;
    const epochs = 1;

    var minmax = {
        min: {
            batchSize: 128,
            epochs: 10
        },
        max: {
            batchSize: 32,
            epochs: 20
        }
    };
    var mode = 'min';

    console.log('Model fitting...', {
        inputTensor,
        outputTensor
    })
    const history = await model.fit(inputTensor, outputTensor, {
        batchSize: minmax[mode].batchSize,
        epochs: minmax[mode].epochs,
        shuffle: true,
        validationSplit: 0.2,
        callbacks: {
            onTrainBegin: async(e)=>{
                console.log("onTrainBegin")
            }
            ,
            onTrainEnd: async(epoch,logs)=>{
                console.log("onTrainEnd", {
                    epoch,
                    logs: JSON.stringify(logs)
                })
            }
            ,
            onEpochBegin: async(epoch,logs)=>{
                console.log("onEpochBegin", {
                    epoch,
                    logs: JSON.stringify(logs)
                })
            }
            ,
            onEpochEnd: async(epoch,logs)=>{
                console.log("onEpochEnd", {
                    epoch,
                    logs: JSON.stringify(logs)
                })
            }
            ,
            onBatchBegin: async(epoch,logs)=>{
                console.log("onBatchBegin", {
                    epoch,
                    logs: JSON.stringify(logs)
                })
            }
            ,
            onBatchEnd: async(epoch,logs)=>{
                console.log("onBatchEnd", {
                    epoch,
                    logs: JSON.stringify(logs)
                })
            }
        }
    });
    console.log('Model fitted...');
}

// Save the model
async function saveModel(model) {
    await model.save('downloads://my-model');
    console.log('Model saved.');
}

// Create and train the model
async function main() {
    console.log('Create model...');
    const {inputTensor, outputTensor, maxInputLength, maxOutputLength} = await prepareData();
    const model = createModel(maxInputLength, maxOutputLength);
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

train ? main().catch(console.error) : null;
