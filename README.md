# x-machina

x-machina is a library to create immutable state machines in JavaScript.

## Summary
- [Public API](##public-api)
- [Examples](##examples)
- [Demos](##demos)

## Public API

### `createMachine(descriptor)`
The `createMachine` function is that allows to create a state machine giving it a state machine descriptor.

The `descriptor` is a JavaScript object with the following format:
```javascript
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

### `machine.state`
The object returned by the `createMachine` function has a property `state` which returns the current state of the state machine.

### `machine.finished`
The object returned by the `createMachine` function has a property `finished` which returns `boolean` whether the state machine is in a final state or not.

### `machine.transit()`
The object returned by the `createMachine` function has a function `transit` which returns a copy of the state machine, in the next state, if there's one.

## Examples
One example of a real-life state machine is a traffic light which goes from green to yellow, to red and to green again. The traffic-light state machine in x-machina is described as follows:

```javascript
createMachine({
  initialState: "GREEN",
  GREEN: transition("YELLOW"),
  YELLOW: transition("RED"),
  RED: transition("GREEN"),
});
```
## Demos
TBD