//APP
window.app = {};
window.app.init = async function() {
    console.log('App initialized...');

    window.soul = 'dummy';
    window.vocabulary ? null : window.vocabulary = await fetch('/soul/' + window.soul + '/vocab.json').then(response=>{
        return response.json()
    }
    );

    window.chatLog = document.getElementById('conversation');
    window.userInput = document.getElementById('question');
    window.sendBtn = document.getElementById('submit');

    //Train or load a model
    var train = 0 > 1;
    train ? ai[0 > 1 ? 'train' : 'trainer']().catch(console.error) : window.model = await ai.load(window.soul);
}

async function newResponse(model, message, tokenizer, maxTokens=100) {
    const tokens = tokenizer.encode(message);
    console.log(22, {
        tokens
    });
    var inputTensor = tf.tensor2d(tokens);

    let outputTokens = [];
    let endToken = tokenizer.encode('<END>');
    // Define a special end token
    let numTokensGenerated = 0;

    while (!outputTokens.includes(endToken) && numTokensGenerated < maxTokens) {
        const outputTensor = model.predict(inputTensor);
        const outputArray = Array.from(outputTensor.dataSync());
        const responseTokens = outputArray.map(Math.round);
        outputTokens = responseTokens.slice();
        // Copy the tokens array

        // Replace any generated end token with padding (zeros)
        outputTokens = outputTokens.map(token=>(token === endToken ? [0] : [token]));

        // Append the generated tokens to the input for the next iteration
        inputTensor.dispose();
        // Dispose the previous tensor to avoid memory leak
        var tkn = tokens.concat(outputTokens);
        console.log(47, {tkn});
        inputTensor = tf.tensor2d(tkn);

        numTokensGenerated += responseTokens.length;
    }

    // Remove the special end token from the output sequence
    outputTokens = outputTokens.filter(token=>token !== endToken);

    const response = tokenizer.decode(outputTokens);
    return response;
}

async function generateResponse(model, message) {
    //const data = [message.split("").map(char=>[char.charCodeAt(0)])];
    console.log(64, message);
    var data = ai.tokenizer.encode(message);
    data = data.map((sequence)=>[...sequence, ...Array(19 - sequence.length).fill(0)]);
    console.log(40, {
        message,
        data
    });
    const inputTensor = 0 > 1 ? tf.tensor3d([data]) : tf.tensor2d(data);
    console.log(44, {
        inputTensor
    });
    // No need to specify shape, as data is already in the correct format
    const outputTensor = result = model.predict(inputTensor);
    console.log(46, {
        outputTensor
    });
    const outputArray = Array.from(outputTensor.dataSync());
    console.log({
        outputArray
    });
    //const response = outputArray.map(code=>String.fromCharCode(code)).join('');
    const response = outputArray.map(Math.round);
    console.log('generateResponse', {
        response
    });
    const reply = ai.tokenizer.decode(response);
    console.log('reply', {
        reply
    });
    return reply.join(' ');
}

/*HANDLE*/
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

    let question = document.getElementById("question").value;
    document.getElementById("question").value = "";
    var message = document.createElement('question');
    message.textContent = question;
    document.body.querySelector('main > section').insertAdjacentHTML('beforeend', message.outerHTML);

    document.body.scrollTop = document.body.scrollHeight + document.body.querySelector('main').clientHeight;

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

    var text = await generateResponse(window.model, question);
    //var text = await newResponse(window.model, question, ai.tokenizer, 100);
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
