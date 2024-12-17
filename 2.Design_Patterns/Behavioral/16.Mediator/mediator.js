/* # Motivation
- Components may go in and out of a system at any time
    - Chat room participants
    - Players in an MMORPG
- It makes no sense for them to have direct references to one another
    - Those references may go dead
- Solution: have them all refer to some central component that facilitates communications
*/

/*
  Mediator: A component that facilitates communication between other components without them necessarily being aware of each other or having direct (reference) access to each other

  Summary:
  - Create the mediator and have each object in the system refer to it
  - Mediator engages in bidirectional communication with its connected components
  - Mediator has functions the components can call
  - Components have functions the mediator can call
 */

// ==================Code==========================
class Person {
  constructor(name) {
    this.name = name;
    this.chatLog = [];
  }

  receive(source, message) {
    const log = `${source}: '${message}'`;
    this.chatLog.push(log);
    console.log(`🚀 [${this.name}'s chat session] ${log}`);
  }


  sayToEveryone(message) {
    this.room.broadcast(this.name, message);
  }

  privateMessage(who, message) {
    this.room.message(this.name, who, message);
  }
}

class ChatRoom {
  constructor(props) {
    this.people = [];
  }

  join(person) {
    const joinMessage = `${person.name} joined the chat`;
    this.broadcast('room', joinMessage);
    person.room = this;
    this.people.push(person);
  }

  broadcast(source, message) {
    for (const person of this.people) {
      if (person.name !== source) {
        person.receive(source, message);
      }
    }
  }

  message(source, destination, message) {
    for (const person of this.people) {
      if (person.name === destination) {
        person.receive(source, message);
      }
    }
  }
}

const room = new ChatRoom();

const john = new Person('John');
const jane = new Person('Jane');
const juan = new Person('Juan');

room.join(john);
room.join(jane);

john.sayToEveryone('Hi Room');
jane.sayToEveryone('Hello John');

room.join(juan);
juan.sayToEveryone('Hi Everyone!');

jane.privateMessage(juan.name, 'Glad to see you in the chat');


// ==================================================================================

class CustomEvent {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(this.count++, handler);
  }

  unsubscribe(index) {
    this.handlers.delete(index);
  }

  fire(sender, args) {
    this.handlers.forEach((value, key) => {
      value(sender, args);
    });
  }
}

class Game {
  constructor() {
    this.events = new CustomEvent();
  }
}

class PlayerScoredEventArgs {
  constructor(playerName, goalsScoredSoFar) {
    this.playerName = playerName;
    this.goalsScoredSoFar = goalsScoredSoFar;
  }

  print() {
    console.log(`${this.playerName} has scored the ${this.goalsScoredSoFar} goal.`);
  }
}

class Player {
  constructor(name, game) {
    this.name = name;
    this.game = game;
    this.goalsScored = 0;
  }

  score() {
    this.goalsScored++;
    const args = new PlayerScoredEventArgs(this.name, this.goalsScored);
    this.game.events.fire(this, args);
  }
}

class Coach {
  constructor(game) {
    game.events.subscribe((sender, args) => {
      if (args instanceof PlayerScoredEventArgs && args.goalsScoredSoFar < 3) {
        args.print();
        console.log(`Coach: Well done, ${args.playerName}`);
      }
    });
  }
}

const game = new Game();

const player = new Player('Juan', game);
const coach = new Coach(game);

player.score();
player.score();