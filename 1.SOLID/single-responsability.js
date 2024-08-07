import fs from 'fs';

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let count = ++Journal.count;
    let entry = `${count}: ${text}`;
    this.entries[count] = entry;
    return count;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  // This now is getting out the scope of what the class should do
  // saveToFile(filename) {
  //   Save to a file location
  // }
}

class PersistenceManager {

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString())
  }
}

Journal.count = 0;

const journal = new Journal();
journal.addEntry('I cried today');
journal.addEntry('I ate a bug today');
console.log(journal.toString());

const pm = new PersistenceManager();
const filename = '/home/jd_1927/repos/design-patterns-in-js/1.SOLID/journal.txt';

pm.saveToFile(journal, filename);