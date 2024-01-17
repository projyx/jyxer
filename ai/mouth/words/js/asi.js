window.ai = {};

window.ai.model = (maxInputLength,maxOutputLength)=>{
    const embeddingSize = 64;
    const lstmUnits = 128;
    const vocabularySize = window.vocabulary.length;
    console.log({
        maxInputLength,
        maxOutputLength
    }, {
        embeddingSize,
        lstmUnits,
        vocabularySize
    })
    const model = tf.sequential();

    var type = "lstm-gpt";
    if (type === "lstm-gpt0") {
        model.add(tf.layers.embedding({
            inputDim: 16,
            outputDim: 16,
            inputLength: 8,
            // Assuming maximum input length is 8 words (padded with zeros)
        }));

        // LSTM layer
        model.add(tf.layers.lstm({
            units: 32,
            returnSequences: false,
        }));

        // Dense layer for the output vocabulary prediction
        model.add(tf.layers.dense({
            units: 16 + 1,
            activation: 'softmax',
        }));
        alert(true);
    }
    if (type === "lstm-gpt") {
        model.add(tf.layers.embedding({
            inputDim: vocabularySize,
            outputDim: embeddingSize,
            inputLength: 1,
            // Each word index is treated as a single timestep
        }));

        // LSTM layer
        model.add(tf.layers.lstm({
            units: lstmUnits,
            returnSequences: true,
        }));

        // Dense layer for the output vocabulary prediction
        model.add(tf.layers.dense({
            units: vocabularySize,
            activation: 'softmax',
        }));
    }
    if (type === "lstm-e") {

        //LSTM1
        0 < 1 ? model.add(tf.layers.lstm({
            units: lstmUnits,
            inputShape: [null, 1],
            returnSequences: false
        })) : null;

        // Repeat vector to match decoder input shape
        0 < 1 ? model.add(tf.layers.repeatVector({
            n: Math.max(maxInputLength, maxOutputLength)
        })) : null;

        //LSTM2
        0 < 1 ? model.add(tf.layers.lstm({
            units: lstmUnits,
            returnSequences: true
        })) : null;

        //DENSE
        0 < 1 ? model.add(tf.layers.dense({
            units: vocabularySize,
            activation: 'softmax'
        })) : null;

        //TIME
        0 < 1 ? model.add(tf.layers.timeDistributed({
            layer: tf.layers.dense({
                units: 1
            })
        })) : null;
    }
    if (type === "lstm") {
        //LSTM1
        0 < 1 ? model.add(tf.layers.lstm({
            units: lstmUnits,
            inputShape: [null, 1],
            returnSequences: false
        })) : null;

        // Repeat vector to match decoder input shape
        0 < 1 ? model.add(tf.layers.repeatVector({
            n: Math.max(maxInputLength, maxOutputLength)
        })) : null;

        //LSTM2
        0 < 1 ? model.add(tf.layers.lstm({
            units: lstmUnits,
            returnSequences: true
        })) : null;

        //DENSE
        0 < 1 ? model.add(tf.layers.dense({
            units: vocabularySize,
            activation: 'softmax'
        })) : null;

        //TIME
        0 < 1 ? model.add(tf.layers.timeDistributed({
            layer: tf.layers.dense({
                units: 1
            })
        })) : null;
    }

    return model;
}

window.ai.input = async(vocabulary)=>{
    var data = [];
    var inputSeqs = [];
    var outputSeqs = [];

    if (0 > 1) {
        var response = await fetch('/assets/txt/' + window.vox + '.txt');
        var dataset = await response.text();
        let lines = dataset.split("\n").filter(x=>!!x);
        for (let i = 0; i < lines.length - 1; i++) {
            data.push({
                input: lines[i].split('\t')[0],
                output: lines[i].split('\t')[1]
            })
            //inputSeqs.push(lines[i].split('\t')[0]);
            //outputSeqs.push(lines[i].split('\t')[1]);
        }
    } else {
        data = window.dataset = 0 < 1 ? [{
            input: "Hello",
            output: "Hi"
        }, {
            input: "How are you?",
            output: "Good"
        }] : data;
    }
    console.log(76, 'dataset', {
        data
    });

    var vocab = [];
    data.map((entry,index)=>{
        const input = entry.input.toLowerCase().replace(/[^\w\s]/g, '');
        const output = entry.output.toLowerCase().replace(/[^\w\s]/g, '');
        const i = input.split(/\s+/);
        const o = output.split(/\s+/);
        const io = i.concat(o);
        vocab = vocab.length > 0 ? vocab.concat(io) : vocab = io;
        //console.log(68, index, vocab.length);
    }
    )
    vocab = [...new Set(vocab)];
    console.log(76, 'vocabulary', {
        vocab
    });

    //inputSeqs = data.map(entry=>entry.input.split("").map(char=>[char.charCodeAt(0)]));
    //outputSeqs = data.map(entry=>entry.output.split("").map(char=>[char.charCodeAt(0)]));
    var d = 3;
    inputSeqs = data.map(entry=>{
        //console.log(75, entry, entry.input);
        var sequence = ai.tokenizer.encode(entry.input);
        //console.log(79, sequence);
        return sequence;
    }
    );
    outputSeqs = data.map(entry=>{
        //console.log(79, entry, entry.output);
        var sequence = ai.tokenizer.encode(entry.output);
        //console.log(86, sequence);
        return sequence;
    }
    );
    console.log(56, 'dataset', {
        data,
        vocab,
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
            seq.push(d === 2 ? 0 : [0]);
        }
    }
    );
    outputSeqs.forEach(seq=>{
        while (seq.length < maxInputLength) {
            seq.push(d === 2 ? 0 : [0]);
            // Use maxInputLength here instead of maxOutputLength
        }
    }
    );

    const inputs = [];
    const outputs = [];
    data.forEach(({input, output})=>{
        const inputArray = ai.tokenizer.encode(input, d);
        const outputArray = ai.tokenizer.encode(output, d);

        inputs.push([...inputArray, ...Array(maxInputLength - inputArray.length).fill([0])]);
        outputs.push(outputArray);
    }
    );
    console.log(177, {
        inputSeqs,
        outputSeqs
    }, {
        inputs,
        outputs
    });

    //const inputTensor = tf.tensor2d(inputs, [inputs.length, maxInputLength]);
    //const outputTensor = tf.tensor2d(outputs, [inputs.length, maxInputLength]);

    //const inputTensor = tf[d === 2 ? "tensor2d" : "tensor3d"](d == 2 ? [inputSeqs[0]] : inputSeqs, d == 2 ? [1, inputSeqs[0].length] : [data.length, maxInputLength, 1]);
    //const outputTensor = tf[d === 2 ? "tensor2d" : "tensor3d"](d == 2 ? [outputSeqs[0]] : outputSeqs, d == 2 ? [1, outputSeqs[0].length] : [data.length, maxInputLength, 1]);

    //const inputTensor = tf.tensor3d(inputSeqs, [data.length, maxInputLength, 1]);
    //const outputTensor = tf.tensor3d(outputSeqs, [data.length, maxInputLength, 1]);

    const inputSequence = [0, 1, 2];
    const outputSequence = [2, 1, 0];
    const inputTensor = tf.tensor2d([inputSequence], [1, inputSequence.length]);
    const outputTensor = tf.tensor2d([outputSequence], [1, outputSequence.length]);

    const obj = {
        inputTensor,
        outputTensor,
        maxInputLength,
        maxOutputLength
    };
    console.log(125, obj);
    return obj;
}

window.ai.learn = async(model,inputTensor,outputTensor)=>{
    const learningRate = 0.01;
    const optimizer = tf.train.adam(learningRate);
    0 < 1 ? model.compile({
        optimizer: 0 < 1 ? optimizer : 'adam',
        loss: 'meanSquaredError'
    }) : null

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
    if (0 < 1) {
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
}

window.ai.load = async(name)=>{
    const model = await tf.loadLayersModel('/soul/' + name + '/model.json');
    console.log('ai.load', {
        model
    });
    return model;
}

window.ai.tokenizer = {};
window.ai.tokenizer.decode = (array)=>{
    const tokens = array.map(word=>[window.vocabulary[word]]);
    //console.log('tokenizer.decode', {tokens});
    return tokens;
}
window.ai.tokenizer.encode = (text,d)=>{
    const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');
    const words = cleanedText.split(/\s+/);
    const tokens = words.map(word=>d === 2 ? window.vocabulary.indexOf(word) : [window.vocabulary.indexOf(word)]);
    //console.log('tokenizer.encode', {words, tokens});
    return tokens;
}

window.ai.train = async()=>{
    console.log('Loading tokens...', {
        tokens: window.vocabulary
    });

    console.log('Create dataset...');
    const {inputTensor, outputTensor, maxInputLength, maxOutputLength} = await ai.input(window.vocabulary);

    console.log('Create model...', {
        maxInputLength,
        maxOutputLength
    });
    const model = ai.model(maxInputLength, maxOutputLength);
    0 > 1 ? model.compile({
        optimizer: 0 > 1 ? optimizer : 'adam',
        loss: 'sparseCategoricalCrossentropy'
    }) : null;

    if (0 < 1) {
        //await ai.learn(model, inputTensor, outputTensor);
        await ai.learn(model, inputTensor, outputTensor);

        console.log('Training complete...', {
            inputTensor,
            outputTensor
        });
        await model.save('downloads://model');
        return 'Training complete';
    }
}

/*ARCHITECTURE*/

// Create and train the model
window.ai.trainer = ()=>{
    return new Promise((resolve,reject)=>{

        // Vocabulary JSON object
        const vocabulary = {
            'apple': 1,
            'banana': 2,
            'orange': 3,
            'grape': 4,
            'pineapple': 5,
            'watermelon': 6,
            'peach': 7,
            'pear': 8,
            'mango': 9,
            'kiwi': 10,
            'cherry': 11,
            'plum': 12,
            'apricot': 13,
            'blueberry': 14,
            'strawberry': 15,
        };

        const embeddingSize = 16;
        const lstmUnits = 32;

        // Create the model
        const model = tf.sequential();

        // Embedding layer to convert word indices to dense vectors
        model.add(tf.layers.embedding({
            inputDim: Object.keys(vocabulary).length + 1,
            outputDim: embeddingSize,
            inputLength: 8,
            // Assuming maximum input length is 8 words (padded with zeros)
        }));

        // LSTM layer
        model.add(tf.layers.lstm({
            units: lstmUnits,
            returnSequences: false,
        }));

        // Dense layer for the output vocabulary prediction
        model.add(tf.layers.dense({
            units: Object.keys(vocabulary).length + 1,
            activation: 'softmax',
        }));

        // Compile the model
        model.compile({
            optimizer: 'adam',
            loss: 'sparseCategoricalCrossentropy'
        });

        // Prepare data
        const inputs = tf.tensor2d([[1, 0, 0, 0, 0, 0, 0, 0], [2, 3, 4, 5, 6, 7, 8, 9], ]);

        const outputs = tf.tensor2d([[10, 7, 11, 9, 0, 0, 0, 0], [12, 13, 14, 15, 0, 0, 0, 0], ]);

        // Train the model
        model.fit(inputs, outputs, {
            epochs: 10
        }).then(()=>{
            console.log('Model trained!');
        }
        );

    }
    )
}
async function mains() {
    console.log('Viewing tokens...', {
        tokens: vocabulary
    });

    console.log('Create model...');
    const {inputTensor, outputTensor, maxInputLength, maxOutputLength} = await prepareData(window.vocabulary);

    const model = createModel(maxInputLength, maxOutputLength);
    console.log('Train model...', {
        inputTensor,
        outputTensor
    });
    if (0 < 1) {
        await ai.train(model, inputTensor, outputTensor);

        console.log('Training complete...', {
            inputTensor,
            outputTensor
        });
        await model.save('downloads://model');
        return 'Training complete';
    }
}
