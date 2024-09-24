// ==================Code==========================
import * as fs from 'fs';
import * as path from 'path';

// Low-Level Module
class MyDatabase {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;

    console.log(`Initializing database`);
    this.capitals = {};
    const __dirname = path.resolve();
    const lines = fs.readFileSync(
      path.join(__dirname, 'capitals.txt')
    ).toString().split('\r\n');

    for (let i = 0; i < lines.length / 2; i++) {
      this.capitals[lines[2 * i]] = parseInt(lines[2 * i + 1]);
    }
  }
  getPopulation(city) {
    return this.capitals[city];
  }
}

// high-Level Module
class SingletonRecordFinder {

  // Violates the principle of dependency inversion
  totalPopulation(cities) {
    return cities
      .map(city => new MyDatabase().getPopulation(city))// Problem with a direct dependency
      .reduce((prev, current) => prev + current);
  }
}

class RecordFinderConfig {

  constructor(database = new MyDatabase()) {
    this.database = database;
  }

  totalPopulation(cities) {
    return cities
      .map(city => this.database.getPopulation(city))
      .reduce((prev, current) => prev + current);
  }
}

class DummyDatabase {
  constructor() {
    this.capitals = {
      'Sao Paulo': 1,
      'Medellin': 4,
    };
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

describe('Singleton database', () => {
  it('should be a singleton', () => {
    const db1 = new MyDatabase();
    const db2 = new MyDatabase();

    expect(db1).toEqual(db2);
  });
  it('should calculate total population [WRONG]', () => {
    const recordFinder = new SingletonRecordFinder();// Direct dependency
    const cities = ['Sao Paulo', 'Osaka'];

    const totalPopulation = recordFinder.totalPopulation(cities);

    expect(totalPopulation).toEqual(34125000);
  });
  it('should calculate total population [BETTER]', () => {
    const db = new DummyDatabase();
    const recordFinder = new RecordFinderConfig(db);
    const cities = ['Sao Paulo', 'Medellin'];

    const totalPopulation = recordFinder.totalPopulation(cities);

    expect(totalPopulation).toEqual(5);
  });
});
