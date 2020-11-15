# x-machina

x-machina is a library to create state machines in JavaScript.

## Summary
- [Public API](##public-api)
  - createMachine(descriptor)
  - transition(state)
  - final()
- [Demos](##demos)

## Public API

### `createMachine(descriptor)`
The `createMachine` function is that allows to create a state machine giving it a state machine descriptor.

The `descriptor` is a JavaScript object with the following format:
```
{
  initialState: string,
  state_1: { transition: string },
  state_2: { transition: string },
  ...
}
```

The `initialState` denotes the first state assumed by the state machine upon creation. It must be one of the states included in the `descriptor`.

The `states` denote all the state machine's available states, and it's representation is a `transition` object to which this state is able to transit to.

### `transition(state)`
Instead of using a transition object one can instead use the `transition()` function to generate that same object. As with the object, the `state` passed to the function must be one of the states in the `descriptor`.

### `final()`
One possible transition is no transition at all, which means the state is final and should not transit anywhere.

## Demos
TBD