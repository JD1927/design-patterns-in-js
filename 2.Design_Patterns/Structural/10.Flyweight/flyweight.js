/* # Motivation
- Avoid redundancy when storing data
- MMORPG - Video-games:
    - Plenty of users with identical first/last names
    - No sense in storing same first/last name over and over again
    - Store a list of names and references to them
- Bold or Italic text formatting
    - Don't want each character to have a formatting character
    - Operate on ranges (line number, start/end positions)
-
*/

/*
  Flyweight: Space optimization technique

  A space optimization technique that lets us use less memory by storing externally the data associated with similar objects

  Summary:
  - Store common data externally
  - Specify an index or a reference into the external data store
  - Define the idea of 'ranges' on homogeneous collections and store data related to those ranges
 */

// ==================Code==========================
class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).map(() => false);
  }

  capitalize(start, end) {
    for (let i = start; i < end; i++) {
      this.caps[i] = true;
    }
  }

  toString() {
    let buffer = [];
    for (const i in this.plainText) {
      const char = this.plainText[i];
      buffer.push(this.caps[i] ? char.toUpperCase() : char);
    }
    return buffer.join('');
  }
}

class TextRange {// flyweight class
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.capitalize = false;
  }

  covers(position) {
    return position >= this.start && position <= this.end;
  }
}

class BetterFormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    this.formatting = [];
  }

  getRange(start, end) {
    const range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    const buffer = [];

    for (const i in this.plainText) {
      let char = this.plainText[i];

      for (const range of this.formatting) {
        if (range.covers(i) && range.capitalize) {
          char = char.toUpperCase();
          break;
        }
      }

      buffer.push(char);
    }
    return buffer.join('');
  }
}

const text = `This is a brave new world`;
const ft = new FormattedText(text);
ft.capitalize(10, 15);
console.log("🚀 ~ ft.toString():", ft.toString());

const bft = new BetterFormattedText(text);
const tr = bft.getRange(16, 19);
tr.capitalize = true;
console.log("🚀 ~ bft.toString():", bft.toString());
