import { createInterface } from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Defines the states
const State = Object.freeze({
  offHook: 'off hook',
  connecting: 'connecting',
  connected: 'connected',
  onHold: 'on hold',
  onHook: 'on hook'
});

// Defines the triggers
const Trigger = Object.freeze({
  callDialed: 'dial a number',
  hungUp: 'hang up',
  callConnected: 'call is connected',
  placedOnHold: 'placed on hold',
  takenOffHold: 'taken off hold',
  leftMessage: 'leave a message'
});


// Relationships between states and triggers
const rules = {};
rules[State.offHook] = [
  {
    trigger: Trigger.callDialed,
    state: State.connecting
  }
];
rules[State.connecting] = [
  {
    trigger: Trigger.hungUp,
    state: State.onHook
  },
  {
    trigger: Trigger.callConnected,
    state: State.connected
  }
];
rules[State.connected] = [
  {
    trigger: Trigger.leftMessage,
    state: State.onHook
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook
  },
  {
    trigger: Trigger.placedOnHold,
    state: State.onHold
  }
];
rules[State.onHold] = [
  {
    trigger: Trigger.takenOffHold,
    state: State.connected
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook
  }
];

// Global states!
let state = State.offHook;
let exitState = State.onHook;

function getInput() {
  const prompt = [
    `The phone is currently in ${state}.`,
    `What's next:`
  ];

  for (let i = 0; i < rules[state].length; ++i) {
    const trigger = rules[state][i].trigger;
    prompt.push(`${i}. ${trigger}`);
  }
  // force an extra line break
  prompt.push('');

  readline.question(prompt.join('\n'), (answer) => {
    let input = parseInt(answer);
    state = rules[state][input].state;

    if (state !== exitState) {
      getInput();
    } else {
      console.log('We are done using the phone.');
      readline.close();
    }
  });
}

getInput();