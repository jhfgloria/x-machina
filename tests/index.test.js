const createMachine = require("../src/index");
const { transition, final } = require("../src/transitions");

describe("Machine", () => {
  it.each`
    machine                                                         | expected
    ${createMachine({ initialState: "GREEN", GREEN: final() })}     | ${"GREEN"}
    ${createMachine({ initialState: "RED", RED: final() })}         | ${"RED"}
    ${createMachine({ initialState: "YELLOW", YELLOW: final() })}   | ${"YELLOW"}
  `("returns initial state when state is called after creation", ({ machine, expected }) => {
    expect(machine.state).toBe(expected);
  });

  it.each`
    machine                                                                                     | expected
    ${createMachine({ initialState: "GREEN", GREEN: transition("YELLOW"), YELLOW: final() })}   | ${"YELLOW"}
    ${createMachine({ initialState: "RED", RED: transition("GREEN"), GREEN: final() })}         | ${"GREEN"}
    ${createMachine({ initialState: "YELLOW", YELLOW: transition("RED"), RED: final() })}       | ${"RED"}
    ${createMachine({ initialState: "YELLOW", YELLOW: transition("YELLOW") })}                  | ${"YELLOW"}
  `("returns the next state after transit", ({ machine, expected }) => {
    expect(machine.transit().state).toBe(expected);
  });

  it.each`
    machine                                                                                                               | iterations
    ${createMachine({ initialState: "RED", RED: transition("GREEN"), GREEN: final() })}                                    | ${1}         
    ${createMachine({ initialState: "GREEN", GREEN: final() })}                                                                | ${0}         
    ${createMachine({ initialState: "YELLOW", YELLOW: transition("RED"), RED: transition("GREEN"), GREEN: final() })}  | ${2}         
  `("returns true when finished is called if final state is reached", ({ machine, iterations }) => {
    const finalMachine = Array(iterations).fill(null).reduce((next, _) => next.transit(), machine);
    expect(finalMachine.finished).toBe(true);
  });

  it.each`
    machine                                                                                                               | iterations
    ${createMachine({ initialState: "RED", RED: transition("GREEN"), GREEN: final() })}                                    | ${0}                  
    ${createMachine({ initialState: "YELLOW", YELLOW: transition("RED"), RED: transition("GREEN"), GREEN: final() })}  | ${1}         
  `("returns false when finished is called if final state is not reached", ({ machine, iterations }) => {
    const finalMachine = Array(iterations).fill(null).reduce((next, _) => next.transit(), machine);
    expect(finalMachine.finished).toBe(false);
  });

  it("throws if initial state is not given", () => {
    expect(() => createMachine()).toThrowError("Initial state should not be null or undefined");
  });

  it("throws if machine reachs terminal state", () => {
    const machine = createMachine({ initialState: "GREEN", GREEN: final() });
    expect(() => machine.transit()).toThrowError("Invalid state transition");
  });

  it("throws if there are invalid transitions", () => {
    expect(() => createMachine({ initialState: "GREEN", GREEN: transition("RED") }))
      .toThrowError("Invalid transition declared: RED");
  });

  it("throws if initial state is invalid", () => {
    expect(() => createMachine({ initialState: "GREEN", RED: transition("GREEN") }))
      .toThrowError("Invalid initial state");
  });
});
