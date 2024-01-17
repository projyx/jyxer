data = window.dataset = 0 < 1 ? [{
    input: "Hello",
    output: "Hi"
}, {
    input: "How are you?",
    output: "Good"
}] : data;

window.training = data

var vocab = [];
training.map((entry,index)=>{
    const input = entry.input.toLowerCase().replace(/[^\w\s]/g, '');
    const output = entry.output.toLowerCase().replace(/[^\w\s]/g, '');
    const i = input.split(/\s+/);
    const o = output.split(/\s+/);
    const io = i.concat(o);
    vocab = vocab.length > 0 ? vocab.concat(io) : vocab = io;
    //console.log(68, index, vocab.length);
}
)
window.vocab = [...new Set(vocab)];
console.log(76, 'vocabulary', {
    vocab
});
