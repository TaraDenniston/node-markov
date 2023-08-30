/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const process = require("process");

// Read file, process through Markov Machine, and print the contents
function makeTextFromFile(path ) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    let mm = new MarkovMachine(data);
    console.log(mm.makeText());
  });
}

// Read URL, process through Markov Machine, and print the contents
async function makeTextFromUrl(url) {
  try {
    let response = await axios.get(url);
    let mm = new MarkovMachine(response.data);
    console.log(mm.makeText());
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

let type = process.argv[2];
let source = process.argv[3];

if (type === 'file') {
  makeTextFromFile(source);
} else if (type === 'url') {
  makeTextFromUrl(source);
} else {
  console.log(`ERROR: ${type} is not a valid source type. Try "file" or "url".`);
  process.exit(1);
}

