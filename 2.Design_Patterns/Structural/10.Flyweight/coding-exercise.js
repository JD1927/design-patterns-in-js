// Flyweight Coding Exercise
// You are given a class called Sentence , which takes a string such as 'hello world'. You need to provide a method at(index) such that the method returns a flyweight that can be used to capitalize a particular word in the sentence.

// Typical use would be something like:

// let s = new Sentence('alpha beta gamma');
// s.at(1).capitalize = true;
// console.log(s.toString()); 
// alpha BETA gamma

class Sentence {
  constructor(plainText) {
    // todo
    this.capitalize = false;
    this.plainText = plainText.split(' ');
    this.formatting = [];
  }

  at(index) {
    // todo
    this.formatting.push(index);
    return this;
  }

  toString() {
    // todo
    const result = [];
    for (let textIdx = 0; textIdx < this.plainText.length; textIdx++) {
      let text = this.plainText[textIdx];

      for (const formatIdx of this.formatting) {
        if (textIdx === formatIdx && this.capitalize) {
          text = text.toUpperCase();
          break;
        }
      }
      result.push(text);
    }
    return result.join(' ');
  }
}

let s = new Sentence('alpha beta gamma');
s.at(1).capitalize = true;
console.log(s.toString()); // alpha BETA gamma