/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord;

      if ((i + 1) < this.words.length) {
        nextWord = this.words[i + 1];
      } else {
        nextWord = null;
      }

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord])
      }
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text = '';

    // start with random word
    let rand1 = Math.floor(Math.random() * this.words.length)
    let currentWord = this.words[rand1];
    text += currentWord;

    let i = 0;
    while (i < (numWords - 1)) {
      // find all words that can come after that word
      let possibilities = this.chains.get(currentWord);      

      // pick one of those next-words randomly
      currentWord = possibilities[Math.floor(Math.random() * possibilities.length)]

      // if we picked null, we’ve reached the end of the chain, so stop
      if (!currentWord) break;

      // otherwise, restart at step 1
      text += ' ' + currentWord;
      i++;
    }  
    
    return text;
  }
}


module.exports = {
  MarkovMachine
};