/* # Motivation
- Consider an ordinary telephone
- What you do with it depends on the state of the phone/line
    - If it's ringing or you want to make a call, you can pick it up
    - Phone must be oof the hook to talk/make a call
    - If you try calling someone, and it's busy, you put the handset down
- Changes in state can be explicit or in response to event (Observer pattern)
*/

/*
  State: A pattern in which the object's behavior is determined by its state. An object transitions from one state to another (something need to trigger a transition)

  A formalized construct which manages state and transitions is called a state machine (Check Alan Turing)

  Summary:
  - Given sufficient complexity, it pays to formally define possible states and event/triggers
  - Can define
      - State entry/exit behaviors
      - Action when a particular event causes a transition
      - Guard conditions enabling/disabling a transition
      - Default action when no transitions are found for an event
 */

// ==================Code==========================
// classic state
class Switch {
  constructor() {
    this.state = new OffState();
  }

  on() {
    this.state.on(this);
  }

  off() {
    this.state.off(this);
  }
}

//abstract
class State {
  constructor() {
    if (this.constructor === State) throw new Error('This is an abstract class!');
  }

  on(switchObj) {
    console.log(`Light is already on.`);
  }

  off(switchObj) {
    console.log(`Light is already off.`);
  }
}

class OnState extends State {
  constructor() {
    super();
    console.log(`Light turned on.`);
  }

  off(switchObj) {
    console.log(`Turning light off.`);
    switchObj.state = new OffState();
  }
}

class OffState extends State {
  constructor() {
    super();
    console.log(`Light turned off.`);
  }

  on(switchObj) {
    console.log(`Turning light on.`);
    switchObj.state = new OnState();
  }
}

const switchObj = new Switch();
switchObj.on();
switchObj.off();
switchObj.off();