const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Load the pre-trained model
async function loadModel() {
    const model = await tf.loadLayersModel('/soul/lstm/my-model.json');
    return model;
}

async function generatedResponse(model, message) {
    const data = [message.split("").map(char=>[char.charCodeAt(0)])];
    console.log({
        message,
        data
    });
    const inputTensor = tf.tensor3d(data);
    // No need to specify shape, as data is already in the correct format
    const outputTensor = result = model.predict(inputTensor);
    console.log({
        outputTensor
    });
    const outputArray = Array.from(outputTensor.dataSync());
    console.log({
        outputArray
    });
    const response = outputArray.map(code=>String.fromCharCode(code)).join('');
    console.log({
        response,
        html: decodeURIComponent(response)
    });
    return response;
}

async function generateResponse(model, message) {
    const data = [message.split("").map(char=>[char.charCodeAt(0)])];
    const inputTensor = tf.tensor3d(data);
    const outputTensor = model.predict(inputTensor);
    console.log({
        outputTensor
    });
    const outputArray = Array.from(outputTensor.dataSync());
    console.log({
        outputArray
    });
    //const response = outputArray.map(code=>String.fromCharCode(Math.round(code))).join('');
    const response = outputArray.map(code=>Math.round(code));
    console.log({
        response,
        html: decodeURIComponent(response)
    });
    return response;
}

// Add message to the chat log
function addMessageToChatLog(message, isUser) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    if (isUser) {
        messageContainer.classList.add('user');
    } else {
        messageContainer.classList.add('bot');
    }
    messageContainer.textContent = message;
    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Handle user input and generate response
async function handleUserInput() {
    const userMessage = userInput.value;
    userInput.value = '';

    addMessageToChatLog(userMessage, true);

    const response = await generateResponse(model, userMessage);
    addMessageToChatLog(response, false);
}

// Load the model and set up event listeners
let model;
0 < 1 ? loadModel().then(async(loadedModel)=>{
    model = loadedModel;
    console.log('Model loaded...', {
        model
    })
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keydown', (event)=>{
        if (event.key === 'Enter') {
            handleUserInput();
        }
    }
    );
}
) : null;
