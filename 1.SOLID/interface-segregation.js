class Document {
  constructor(parameters) {

  }
}

class Machine {
  constructor() {
    if (this.constructor.name === 'Machine') {
      throw new Error('Machine is abstract!');
    }
  }

  print(doc) { }
  fax(doc) { }
  scan(doc) { }
}

class MultiFunctionPrinter extends Machine {
  constructor() {
    super();
  }

  print(doc) {
    //
  }

  fax(doc) {
    //
  }

  scan(doc) {
    //
  }
}

class Printer {
  constructor() {
    if (this.constructor.name === 'Printer') {
      throw new Error('Printer is abstract!');
    }
  }

  print() { }
}
class Scanner {
  constructor() {
    if (this.constructor.name === 'Scanner') {
      throw new Error('Scanner is abstract!');
    }
  }

  scan() { }
}

class OldFashionedPrinter extends Printer {
  print(doc) {
    // ok
  }

  fax(doc) {
    // do nothing -> it violates the principle of least surprise - You don't want users to get surprises, just predictable results
    throw new Error('Not implemented!');
  }

  scan(doc) {
    // do nothing -> it violates the principle of least surprise - You don't want users to get surprises, just predictable results
    throw new NotImplementedError('OldFashionedPrinter.scan');
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    const message = `'${name}' is not implemented!`;
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedError);
    }
  }
}

const printer = new OldFashionedPrinter();
// printer.scan();

new Machine();