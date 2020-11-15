const assert = require("assert");

const assertIsTransitionValid = states => {
  Object.values(states).forEach(t => {
    if (t.transition) {
      assert(Object.keys(states).indexOf(t.transition) > -1, `Invalid transition declared: ${t.transition}`);
    }
  });
};

const createMachine = ({ initialState, ...states } = {}) => {
  assert(initialState, "Initial state should not be null or undefined");
  assert(Object.keys(states).indexOf(initialState) > -1, "Invalid initial state");
  assertIsTransitionValid(states);
  
  const transit = () => {
    const currentStateTransition = states[initialState];

    assert(currentStateTransition, "Invalid state transition");
    assert(currentStateTransition.transition, "Invalid state transition");

    return createMachine({ initialState: currentStateTransition.transition, ...states});
  }

  return {
    state: initialState,
    finished: !states[initialState].transition,
    transit,
  };
};

module.exports = createMachine;