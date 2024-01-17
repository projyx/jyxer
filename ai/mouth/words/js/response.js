async function generateResponse(model, message, tokenizer, maxTokens = 100) {
  const tokens = tokenizer.encode(message);
  const inputTensor = tf.tensor2d([tokens]);

  let outputTokens = [];
  let endToken = tokenizer.encode('<END>'); // Define a special end token
  let numTokensGenerated = 0;

  while (!outputTokens.includes(endToken) && numTokensGenerated < maxTokens) {
    const outputTensor = model.predict(inputTensor);
    const outputArray = Array.from(outputTensor.dataSync());
    const responseTokens = outputArray.map(Math.round);
    outputTokens = responseTokens.slice(); // Copy the tokens array

    // Replace any generated end token with padding (zeros)
    outputTokens = outputTokens.map(token => (token === endToken ? 0 : token));

    // Append the generated tokens to the input for the next iteration
    inputTensor.dispose(); // Dispose the previous tensor to avoid memory leak
    inputTensor = tf.tensor2d([tokens.concat(outputTokens)]);

    numTokensGenerated += responseTokens.length;
  }

  // Remove the special end token from the output sequence
  outputTokens = outputTokens.filter(token => token !== endToken);

  const response = tokenizer.decode(outputTokens);
  return response;
}
