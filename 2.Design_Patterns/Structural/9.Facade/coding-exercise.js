
// Facade Coding Exercise
// A magic square is a square matrix of numbers where the sum in each row, each column, and each of the diagonals is the same.

// You are given a system of 3 classes that can be used to make a magic square. The classes are:

// Generator: this class generates a 1-dimensional list of random digits in range 1 to 6.

// Splitter: this class takes a 2D list and splits it into all possible arrangements of 1D lists. It gives you the columns, the rows and the two diagonals.

// Verifier: this class takes a 2D list and verifies that the sum of elements in every sublist is the same.

// Please implement a Facade class called MagicSquareGenerator  which simply generates the magic square of a given size.

class Generator {
  generate(count) {
    let result = [];
    for (let i = 0; i < count; ++i)
      result.push(Math.floor((Math.random() * 6) + 1));
    return result;
  }
}

class Splitter {
  split(array) {
    const rows = array;
    const cols = this.getColumns(array);
    const diagonals = this.getDiagonals(array);

    return [...rows, ...cols, ...diagonals];
  }

  getColumns(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  }

  getDiagonals(array) {
    const size = array.length;
    const diag1 = [];
    const diag2 = [];

    for (let i = 0; i < size; i++) {
      diag1.push(array[i][i]);
      diag2.push(array[i][size - i - 1]);
    }

    return [diag1, diag2];
  }
}

class Verifier {
  verify(array) {
    if (array.length < 1) return false;

    const expectedSum = this.sum(array[0]);
    return array.every(subarray => this.sum(subarray) === expectedSum);
  }

  sum(subarray) {
    return subarray.reduce((acc, val) => acc + val, 0);
  }
}

class MagicSquareGenerator {
  generate(size) {
    // todo
    const generator = new Generator();
    const splitter = new Splitter();
    const verifier = new Verifier();

    let square = [];
    let isMagicSquare = false;
    // Teacher way
    // do {
    //   square = [];
    //   for (let i = 0; i < size; i++) {
    //     square.push(generator.generate(size));
    //   }
    // } while (!verifier.verify(splitter.split(square)));

    // My way
    while (!isMagicSquare) {
      square = this.createSquare(generator, size);
      isMagicSquare = verifier.verify(splitter.split(square));
    }
    return square;
  }

  createSquare(generator, size) {
    return Array.from({ length: size }, () => generator.generate(size));
  }
}

// Testing
const gen = new MagicSquareGenerator();
const square = gen.generate(3);

console.log("Generated Magic Square:", square);
const firstRowSum = square[0].reduce((acc, val) => acc + val, 0);
console.log("First row sum:", firstRowSum);

square.forEach(row => {
  console.log(`Q/Same magic sum?: R/${row.reduce((acc, val) => acc + val, 0) === firstRowSum}`);
});