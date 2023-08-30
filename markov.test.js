const { MarkovMachine } = require('./markov');

describe('markov machine', () => {
  test('makes accurate word list', () => {
    let mm = new MarkovMachine('one one two two three three four four');
    expect(mm.words.length).toEqual(8);
    expect(mm.words).toContain('three');
  })

  test('makes chains', () => {
    let mm = new MarkovMachine('one two three one two one two');

    expect(mm.chains).toEqual(new Map([
      ['one', ['two', 'two', 'two']],
      ['two', ['three', 'one', null]],
      ['three', ['one']]
    ]));
  });

  test('text is limited by length param', () => {
    let mm = new MarkovMachine('one one two two three three four four');
    let output = mm.makeText(5).split(/[ \r\n]+/);
    expect(output.length).toBeLessThanOrEqual(5);
  });

  test('generates valid text', () => {
    let wordPairs = ['one two', 'two three', 'three one', 'three'];
    let mm = new MarkovMachine('one two three one two three');
    let text = mm.makeText();
    expect(text.endsWith('three')).toBe(true);

    let output = mm.makeText().split(/[ \r\n]+/);

    for (let i = 0; i < output.length - 1; i++) {
      expect(wordPairs).toContain(output[i] + " " + output[i + 1]);
    }
  });
});