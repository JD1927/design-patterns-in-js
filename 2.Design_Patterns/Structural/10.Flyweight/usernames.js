
// ==================Code==========================
class User {
  // Adam Smith
  constructor(fullName) {
    this.fullName = fullName;
  }
}

class UserTwo {
  // Adam Smith
  constructor(fullName) {
    const getOrAdd = (str) => {
      let idx = UserTwo.strings.indexOf(str);
      if (idx !== -1) return idx;
      UserTwo.strings.push(str);
      return UserTwo.strings.length - 1;
    };
    this.names = fullName.split(' ').map(getOrAdd);
  }
}

UserTwo.strings = [];

const getRandomInt = (max) => Math.floor(Math.random() * max);

const randomString = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(String.fromCharCode(65 + getRandomInt(26)));
  }
  return result;
};

let firstNames = [];
let lastNames = [];
let users = [];
let usersTwo = [];

for (let i = 0; i < 100; i++) {
  firstNames.push(randomString().join(''));
  lastNames.push(randomString().join(''));
}
for (const firstName of firstNames) {
  for (const lastName of lastNames) {
    users.push(new User(`${firstName} ${lastName}`));
    usersTwo.push(new UserTwo(`${firstName} ${lastName}`));
  }
}

console.log(`🚀 10k users take up approx ${JSON.stringify(users).length} chars`);
const usersTwoLength = [usersTwo, UserTwo.strings].map(strings => JSON.stringify(strings).length).reduce((x, y) => x + y);
console.log(`🚀 10k flyweight users take up approx ${usersTwoLength} chars`);